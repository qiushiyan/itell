"use client";

import * as React from "react";
import {
	NavigationMenu as BaseNavigationMenu,
	NavigationMenuContent as BaseNavigationMenuContent,
	NavigationMenuItem as BaseNavigationMenuItem,
	NavigationMenuLink as BaseNavigationMenuLink,
	NavigationMenuList as BaseNavigationMenuList,
	NavigationMenuTrigger as BaseNavigationMenuTrigger,
} from "./navigation-menu";

export function NavigationMenu({
	children,
	className,
	...rest
}: { children: React.ReactNode; className?: string } & React.ComponentProps<
	typeof BaseNavigationMenu
>) {
	return (
		<BaseNavigationMenu className={className} {...rest}>
			{children}
		</BaseNavigationMenu>
	);
}

export function NavigationMenuList({
	children,
	className,
	...rest
}: { children: React.ReactNode; className?: string } & React.ComponentProps<
	typeof BaseNavigationMenuList
>) {
	return (
		<BaseNavigationMenuList className={className} {...rest}>
			{children}
		</BaseNavigationMenuList>
	);
}

export function NavigationMenuTrigger({
	children,
	className,
	...rest
}: { children: React.ReactNode; className?: string } & React.ComponentProps<
	typeof BaseNavigationMenuTrigger
>) {
	return (
		<BaseNavigationMenuTrigger className={className} {...rest}>
			{children}
		</BaseNavigationMenuTrigger>
	);
}

export function NavigationMenuContent({
	children,
	className,
	...rest
}: { children: React.ReactNode; className?: string } & React.ComponentProps<
	typeof BaseNavigationMenuContent
>) {
	return (
		<BaseNavigationMenuContent className={className} {...rest}>
			{children}
		</BaseNavigationMenuContent>
	);
}

export function NavigationMenuItem({
	children,
	className,
	...rest
}: { children: React.ReactNode; className?: string } & React.ComponentProps<
	typeof BaseNavigationMenuItem
>) {
	return (
		<BaseNavigationMenuItem className={className} {...rest}>
			{children}
		</BaseNavigationMenuItem>
	);
}

export function NavigationMenuLink({
	children,
	className,
	...rest
}: { children: React.ReactNode; className?: string } & React.ComponentProps<
	typeof BaseNavigationMenuLink
>) {
	return (
		<BaseNavigationMenuLink className={className} {...rest}>
			{children}
		</BaseNavigationMenuLink>
	);
}
