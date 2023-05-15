import React from "react";
import { Typography } from "@material-tailwind/react";

export const Callout = ({ children }: { children: React.ReactNode }) => {
	return (
		<Typography as="div" className="text-xl max-w-lg mx-auto">
			{children}
		</Typography>
	);
};

export const Keyterm = ({
	children,
	label,
}: { label: string; children: React.ReactNode }) => {
	return (
		<div className="border-2 px-4 py-2 rounded-md my-4">
			<div className="border-blue-400 border-b font-bold ">
				<Typography variant="h6">{label}</Typography>
			</div>
			<Typography as="div">{children}</Typography>
		</div>
	);
};

export const Info = ({
	title,
	children,
}: { title?: string; children: React.ReactNode }) => (
	<div className="border-l-4 border-blue-400 bg-blue-50 px-4 py-2">
		<div className="ml-3">
			{title && <Typography variant="h5">{title}</Typography>}
			{children}
		</div>
	</div>
);

export const Warning = ({ children }: { children: React.ReactNode }) => (
	<div className="border-l-4 border-orange-400 bg-orange-50 px-4 py-2">
		<div className="ml-3">{children}</div>
	</div>
);

export const Card = ({
	title,
	children,
}: { title: string; children: React.ReactNode }) => {
	return (
		<div className="mb-4 rounded-md max-w-2xl mx-auto px-4 py-2 border-l-2 border-yellow-700">
			<h5>{title}</h5>
			{children}
		</div>
	);
};
