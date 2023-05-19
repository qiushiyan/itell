import {
	DropdownMenu as BaseDropdownMenu,
	DropdownMenuContent as BaseDropdownMenuContent,
	DropdownMenuGroup as BaseDropdownMenuGroup,
	DropdownMenuItem as BaseDropdownMenuItem,
	DropdownMenuTrigger as BaseDropdownMenuTrigger,
} from "./dropdown";

export const DropdownMenu = ({
	children,
	...rest
}: { children: React.ReactNode } & React.ComponentProps<
	typeof BaseDropdownMenu
>) => {
	return <BaseDropdownMenu {...rest}>{children}</BaseDropdownMenu>;
};

export const DropdownMenuTrigger = ({
	children,
	className,
	...rest
}: { children: React.ReactNode } & React.ComponentProps<
	typeof BaseDropdownMenuTrigger
>) => {
	return (
		<BaseDropdownMenuTrigger {...rest}>{children}</BaseDropdownMenuTrigger>
	);
};

export const DropdownMenuContent = ({
	children,
	...rest
}: { children: React.ReactNode } & React.ComponentProps<
	typeof BaseDropdownMenuContent
>) => {
	return (
		<BaseDropdownMenuContent {...rest}>{children}</BaseDropdownMenuContent>
	);
};

export const DropdownMenuGroup = ({
	children,
	...rest
}: { children: React.ReactNode } & React.ComponentProps<
	typeof BaseDropdownMenuGroup
>) => {
	return <BaseDropdownMenuGroup {...rest}>{children}</BaseDropdownMenuGroup>;
};

export const DropdownMenuItem = ({
	children,
	...rest
}: { children: React.ReactNode } & React.ComponentProps<
	typeof BaseDropdownMenuItem
>) => {
	return <BaseDropdownMenuItem {...rest}>{children}</BaseDropdownMenuItem>;
};
