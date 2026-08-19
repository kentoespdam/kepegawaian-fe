import PendukungLayoutClient from "./pendukung-layout-client";

export default function PendukungLayout({ children }: { children: React.ReactNode }) {
	return <PendukungLayoutClient>{children}</PendukungLayoutClient>;
}
