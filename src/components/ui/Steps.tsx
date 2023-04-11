"use client";

import { CheckCircleIcon } from "@/components/icons";
import { StepProp } from "@/types/components";
import { useState } from "react";
import { useImmer } from "use-immer";

type Props = {
	steps: StepProp[];
	children: React.ReactNode;
};

type StepStatus = "complete" | "current" | "upcoming";

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

interface StepItem extends StepProp {
	status: StepStatus;
}

export default function Steps({ steps }: Props) {
	const [currentStep, setCurrentStep] = useState(0);
	const [items, setItems] = useImmer<StepItem[]>(() => {
		return steps.map((step, index) => {
			const status = index === 0 ? "current" : "upcoming";
			return { ...step, status };
		});
	});

	const handleSwitch = (index: number) => {
		setItems((draft) => {
			draft[currentStep].status = "complete";
			draft[index].status = "current";
		});
		setCurrentStep(index);
	};

	return (
		<div className="flex flex-col md:flex-row items-baseline mt-4 gap-4">
			<nav aria-label="Progress">
				<ol
					role="list"
					className="list-none flex flex-row md:flex-col items-start gap-2"
				>
					{items.map((item, index) => (
						<li key={item.name} className="cursor-pointer">
							<a
								className="group no-underline"
								onClick={() => handleSwitch(index)}
							>
								<span className="flex items-start">
									{StatusIcon[item.status]}
									<span className="ml-3 text-sm font-medium text-gray-500 group-hover:text-gray-900">
										{item.name ? item.name : `Step ${index + 1}`}
									</span>
								</span>
							</a>
						</li>
					))}
				</ol>
			</nav>
			<div className="flex-1 rounded-md px-4">{items[currentStep].content}</div>
		</div>
	);
}
