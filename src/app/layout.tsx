import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import { Providers } from "@/components/providers";
import "./globals.css";

const inter = Inter({
	variable: "--font-sans",
	subsets: ["latin"],
	weight: ["400", "500", "600"],
	display: "swap",
});

export const metadata: Metadata = {
	title: "Kepegawaian — Perumdam Tirta Satria",
	description: "Sistem Kepegawaian Perumdam Tirta Satria",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="id" className={`${inter.variable} h-full antialiased`} suppressHydrationWarning>
			<body className="min-h-full flex flex-col">
				<a
					href="#main-content"
					className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-primary-foreground focus:shadow-lg"
				>
					Langsung ke konten
				</a>
				<Providers>{children}</Providers>
				<Toaster position="bottom-right" richColors />
			</body>
		</html>
	);
}
