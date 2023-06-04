"use client";

import { cn } from "@itell/core";
import { CheckCircleIcon } from "lucide-react";
import { createContext, useContext } from "react";
import { Typography } from "./typography";
import { useImmer } from "use-immer";

type StepStatus = "complete" | "current" | "upcoming";
type VisitedSteps = number[];
type ActiveStep = number;
type StepperContextType = {
	visitedSteps: VisitedSteps;
	activeStep: ActiveStep;
	setActiveStep: (step: number) => void;
};

export interface StepperProps extends React.ComponentProps<"div"> {
	value: number;
	children: React.ReactNode;
	className?: string;
}

const StepperContext = createContext<StepperContextType>(
	{} as StepperContextType,
);

const StatusIcon: Record<StepStatus, JSX.Element> = {
	complete: (
		<span className="relative flex h-5 w-5 flex-shrink-0 items-center justify-center">
			<CheckCircleIcon
				className="h-full w-full text-indigo-200 dark:text-indigo-600 group-hover:text-accent-foreground"
				aria-hidden="true"
			/>
		</span>
	),
	current: (
		<span
			className="relative flex h-5 w-5 flex-shrink-0 items-center justify-center"
			aria-hidden="true"
		>
			<span className="absolute h-4 w-4 rounded-full bg-indigo-200" />
			<span className="relative block h-2 w-2 rounded-full bg-indigo-600" />
		</span>
	),
	upcoming: (
		<div
			className="relative flex h-5 w-5 flex-shrink-0 items-center justify-center"
			aria-hidden="true"
		>
			<div className="h-2 w-2 rounded-full bg-gray-300 group-hover:bg-gray-400" />
		</div>
	),
};

const getStepStatus = ({
	value,
	activeStep,
	visitedSteps,
}: {
	value: number;
	activeStep: ActiveStep;
	visitedSteps: VisitedSteps;
}): StepStatus => {
	if (value === activeStep) return "current";

	if (value && visitedSteps.includes(value)) return "complete";

	return "upcoming";
};

export const Step = ({
	value,
	children,
}: { value: number; children: React.ReactNode }) => {
	const { activeStep, visitedSteps, setActiveStep } =
		useContext(StepperContext);
	return (
		<li className="cursor-pointer p-0 m-0">
			<button
				className="group no-underline w-full h-full flex items-center"
				onClick={() => setActiveStep(value)}
			>
				<Typography variant="lead" className="flex items-center m-0">
					{StatusIcon[getStepStatus({ value, activeStep, visitedSteps })]}
					<span className="ml-3 text-sm font-medium  group-hover:text-accent-foreground">
						{children}
					</span>
				</Typography>
			</button>
		</li>
	);
};
export const StepperHeader = ({ children }: { children: React.ReactNode }) => {
	return (
		<nav aria-label="Progress">
			<ol role="list" className="list-none flex flex-col gap-4">
				{children}
			</ol>
		</nav>
	);
};

export const StepperPanel = ({
	value,
	children,
}: { value: number; children: React.ReactNode }) => {
	const { activeStep } = useContext(StepperContext);

	if (value !== activeStep) return null;

	return children;
};

export const StepperBody = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="flex-1 rounded-md px-4">
			<Typography as="div">{children}</Typography>
		</div>
	);
};

export const Stepper = ({
	value,
	children,
	className,
	...rest
}: StepperProps) => {
	const [state, setState] = useImmer<{
		activeStep: ActiveStep;
		visitedSteps: VisitedSteps;
	}>({
		activeStep: value,
		visitedSteps: [value],
	});

	const setActiveStep = (step: number) => {
		setState((draft) => {
			draft.activeStep = step;
			if (!draft.visitedSteps.includes(step)) {
				draft.visitedSteps.push(step);
			}
		});
	};

	return (
		<StepperContext.Provider
			value={{
				activeStep: state.activeStep,
				visitedSteps: state.visitedSteps,
				setActiveStep,
			}}
		>
			<div
				className={cn(
					"flex flex-row gap-8  border border-blue-100 rounded-md shadow-md",
					className,
				)}
				{...rest}
			>
				{children}
			</div>
		</StepperContext.Provider>
	);
};
