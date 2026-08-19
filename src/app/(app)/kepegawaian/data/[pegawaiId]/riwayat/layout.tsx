import RiwayatLayoutClient from "./riwayat-layout-client";

export default function RiwayatLayout({ children }: { children: React.ReactNode }) {
	return <RiwayatLayoutClient>{children}</RiwayatLayoutClient>;
}
