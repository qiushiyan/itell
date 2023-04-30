"use client";

import { CheckCircleIcon } from "@/components/icons";
import { cn } from "@/lib/utils";
import React, { useContext } from "react";
import { createContext, useState } from "react";
type StepStatus = "complete" | "current" | "upcoming";
type StepperContextType = {
	activeStep: number;
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
				className="h-full w-full text-blue-600 group-hover:text-blue-800"
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

const getStepStatus = (currentStep: number, activeStep: number): StepStatus => {
	if (currentStep === activeStep) return "current";

	if (currentStep < activeStep) return "complete";

	return "upcoming";
};

export const Step = ({
	value,
	children,
}: { value: number; children: React.ReactNode }) => {
	const { activeStep, setActiveStep } = useContext(StepperContext);
	return (
		<li className="cursor-pointer">
			<a className="group no-underline" onClick={() => setActiveStep(value)}>
				<span className="flex items-start">
					{StatusIcon[getStepStatus(value, activeStep)]}
					<span className="ml-3 text-sm font-medium text-gray-500 group-hover:text-gray-900">
						{children}
					</span>
				</span>
			</a>
		</li>
	);
};
export const StepperHeader = ({ children }: { children: React.ReactNode }) => {
	return (
		<nav className="basis-1/4" aria-label="Progress">
			<ol
				role="list"
				className="list-none flex flex-row md:flex-col items-start gap-2"
			>
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

	if (activeStep !== value) return null;

	return <>{children}</>;
};

export const StepperBody = ({ children }: { children: React.ReactNode }) => {
	return <div className="flex-1 rounded-md px-4">{children}</div>;
};

export const Stepper = ({
	value,
	children,
	className,
	...rest
}: StepperProps) => {
	const [activeStep, setActiveStep] = useState(value);

	return (
		<StepperContext.Provider value={{ activeStep, setActiveStep }}>
			<div className={cn("flex flex-row lg:flex-col", className)} {...rest}>
				{children}
			</div>
		</StepperContext.Provider>
	);
};
