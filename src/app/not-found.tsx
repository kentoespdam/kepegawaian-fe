import { FileX2 } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
	return (
		<div className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
			<FileX2 className="mb-6 size-16 text-muted-foreground/40" />
			<h1 className="text-2xl font-semibold text-foreground">Halaman tidak ditemukan</h1>
			<p className="mt-2 max-w-sm text-sm text-muted-foreground">
				Halaman yang Anda cari tidak tersedia atau telah dipindahkan.
			</p>
			<Link
				href="/"
				className="mt-6 inline-flex h-11 items-center rounded-lg bg-primary px-5 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
			>
				Kembali ke Beranda
			</Link>
		</div>
	);
}
