import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import { Providers } from "@/components/providers";
import { preApplyScript, ThemePicker } from "@/components/theme-picker";
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
		<html lang="id" className={`${inter.variable} h-full antialiased`}>
			<head>
				{/* biome-ignore lint/security/noDangerouslySetInnerHtml: flash-prevention script — must inline before paint */}
				<script dangerouslySetInnerHTML={{ __html: preApplyScript }} />
			</head>
			<body className="min-h-full flex flex-col">
				<Providers>{children}</Providers>
				<ThemePicker />
				<Toaster position="bottom-right" richColors />
			</body>
		</html>
	);
}
