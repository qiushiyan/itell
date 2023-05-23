"use client";

import { useTheme } from "next-themes";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function LabIcon() {
	const { theme, systemTheme } = useTheme();
	const [src, setSrc] = useState("/images/learlab.svg");

	useEffect(() => {
		if (theme === "light") {
			setSrc("/images/learlab.svg");
		}

		if (theme === "dark") {
			setSrc("/images/learlab-dark.svg");
		}
	}, [theme]);

	return (
		<Image src={src} alt="learlab icon" width={600} height={400} priority />
	);
}
