import { Typography } from "@material-tailwind/react";

export const Caption = ({ children }: { children: React.ReactNode }) => {
	return (
		<Typography
			as="div"
			variant="small"
			className="max-w-2xl mx-auto text-center"
		>
			{children}
		</Typography>
	);
};
