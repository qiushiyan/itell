import Link, { LinkProps } from "next/link";

interface CustomLinkProps extends LinkProps {
	href: string;
	children: React.ReactNode;
}

export const CustomLink = ({ href, children, ...rest }: CustomLinkProps) => {
	if (href.startsWith("/")) {
		return (
			<Link href={href} {...rest}>
				{children}
			</Link>
		);
	}

	if (href.startsWith("#")) {
		return (
			<a href={href} {...rest}>
				{children}
			</a>
		);
	}

	return (
		<a target="_blank" rel="noopener noreferrer" {...rest}>
			{children}
		</a>
	);
};
