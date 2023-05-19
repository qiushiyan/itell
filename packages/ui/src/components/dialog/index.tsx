import { Fragment } from "react";
import {
	Dialog as BaseDialog,
	DialogContent as BaseDialogContent,
	DialogDescription as BaseDialogDescription,
	DialogFooter as BaseDialogFooter,
	DialogHeader as BaseDialogHeader,
	DialogTitle as BaseDialogTitle,
	DialogTrigger as BaseDialogTrigger,
} from "./dialog";

export const Dialog = ({
	children,
	...rest
}: { children: React.ReactNode } & React.ComponentProps<typeof BaseDialog>) => {
	return <BaseDialog {...rest}>{children}</BaseDialog>;
};

export const DialogTrigger = ({
	children,
	asChild = true,
	...rest
}: { children: React.ReactNode; asChild?: boolean } & React.ComponentProps<
	typeof BaseDialogTrigger
>) => {
	return (
		<BaseDialogTrigger asChild {...rest}>
			{children}
		</BaseDialogTrigger>
	);
};

export const DialogContent = ({
	children,
	className = "max-w-[425px]",
	...rest
}: { children: React.ReactNode; className?: string } & React.ComponentProps<
	typeof BaseDialogContent
>) => {
	return (
		<BaseDialogContent className={className} {...rest}>
			{children}
		</BaseDialogContent>
	);
};

export const DialogHeader = ({
	children,
	...rest
}: { children: React.ReactNode } & React.ComponentProps<
	typeof BaseDialogHeader
>) => {
	return <BaseDialogHeader {...rest}>{children}</BaseDialogHeader>;
};

export const DialogTitle = ({
	children,
	...rest
}: { children: React.ReactNode } & React.ComponentProps<
	typeof BaseDialogTitle
>) => {
	return <BaseDialogTitle {...rest}>{children}</BaseDialogTitle>;
};

export const DialogDescription = ({
	children,
	...rest
}: { children: React.ReactNode } & React.ComponentProps<
	typeof BaseDialogDescription
>) => {
	return <BaseDialogDescription {...rest}>{children}</BaseDialogDescription>;
};

export const DialogContentBody = ({
	children,
}: { children: React.ReactNode }) => {
	return <Fragment>{children}</Fragment>;
};

export const DialogFooter = ({
	children,
	...rest
}: { children: React.ReactNode } & React.ComponentProps<
	typeof BaseDialogFooter
>) => {
	return <BaseDialogFooter {...rest}>{children}</BaseDialogFooter>;
};
