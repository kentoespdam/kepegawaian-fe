"use client";
import { ThemeProvider as NextThemesProvider } from "next-themes";

const NextThemeProv = ({
	children,
	...props
}: React.ComponentProps<typeof NextThemesProvider>) => {
	return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
};

export default NextThemeProv;
