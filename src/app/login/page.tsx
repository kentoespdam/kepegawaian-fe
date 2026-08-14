import { CheckCircle2, Droplets, ShieldCheck, Users } from "lucide-react";
import Image from "next/image";
import { Suspense } from "react";
import { LoginForm } from "./login-form";

export default function LoginPage() {
	return (
		<div className="flex min-h-screen bg-background">
			{/* Left Brand Panel (Desktop) */}
			<div className="relative hidden w-[48%] flex-col justify-between overflow-hidden bg-linear-to-b from-primary-dark via-primary to-primary-dark p-12 text-primary-foreground lg:flex">
				{/* Water Ripple Background Pattern */}
				<div className="absolute inset-0 opacity-25">
					<div className="absolute inset-0 animate-water bg-[radial-gradient(ellipse_at_30%_50%,rgba(255,255,255,0.3)_0%,transparent_60%),radial-gradient(ellipse_at_70%_30%,rgba(255,255,255,0.2)_0%,transparent_50%),radial-gradient(ellipse_at_50%_70%,rgba(255,255,255,0.15)_0%,transparent_40%)] bg-size-[200%_200%]" />
				</div>

				{/* Brand Header */}
				<div className="relative z-10">
					<div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1 text-xs font-medium text-white backdrop-blur-xs">
						<Droplets className="size-3.5" />
						BUMD Air Minum Kab. Banyumas
					</div>
				</div>

				{/* Central Identity */}
				<div className="relative z-10 my-auto flex flex-col items-center text-center">
					<div className="mb-6 rounded-3xl bg-white p-6 shadow-2xl ring-4 ring-white/20">
						<Image
							src="/logo_pdam.svg"
							alt="Logo Perumdam Tirta Satria"
							width={160}
							height={114}
							priority
							className="h-auto w-36"
						/>
					</div>
					<h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">PERUMDAM TIRTA SATRIA</h1>
					<p className="mt-2 text-base font-medium text-white/90">Sistem Informasi Manajemen Kepegawaian</p>
					<p className="mt-1 text-xs italic text-white/70">&ldquo;Melayani dengan Sepenuh Hati&rdquo;</p>

					<div className="mt-8 grid grid-cols-1 gap-2.5 text-left text-xs text-white/90">
						<div className="flex items-center gap-2.5 rounded-lg bg-white/10 px-4 py-2 backdrop-blur-xs">
							<ShieldCheck className="size-4 shrink-0 text-white" />
							<span>Akses data aman &amp; terotentikasi resmi</span>
						</div>
						<div className="flex items-center gap-2.5 rounded-lg bg-white/10 px-4 py-2 backdrop-blur-xs">
							<Users className="size-4 shrink-0 text-white" />
							<span>Layanan mandiri &amp; manajemen karir pegawai</span>
						</div>
					</div>
				</div>

				{/* Footer */}
				<div className="relative z-10 text-center text-xs text-white/60">
					&copy; 2026 Perumdam Tirta Satria. Seluruh hak cipta dilindungi.
				</div>
			</div>

			{/* Right Login Form Container */}
			<div className="flex flex-1 items-center justify-center p-6 sm:p-12">
				<div className="w-full max-w-md">
					{/* Mobile Brand Header */}
					<div className="mb-8 text-center lg:hidden">
						<div className="mx-auto mb-4 w-fit rounded-2xl bg-white p-4 shadow-md ring-1 ring-border">
							<Image
								src="/logo_pdam.svg"
								alt="Logo Perumdam Tirta Satria"
								width={100}
								height={71}
								priority
								className="h-auto w-24"
							/>
						</div>
						<span className="inline-block rounded-full bg-primary/10 px-3 py-0.5 text-xs font-semibold text-primary mb-1">
							BUMD Kab. Banyumas
						</span>
						<h1 className="text-xl font-bold text-foreground">PERUMDAM TIRTA SATRIA</h1>
						<p className="text-xs text-muted-foreground">Sistem Manajemen Kepegawaian</p>
					</div>

					{/* Form Box */}
					<div className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
						<Suspense fallback={null}>
							<LoginForm />
						</Suspense>
					</div>

					<div className="mt-6 text-center text-xs text-muted-foreground">
						<span className="inline-flex items-center gap-1.5">
							<CheckCircle2 className="size-3.5 text-primary" />
							Portal Resmi Kepegawaian Perumdam Tirta Satria
						</span>
					</div>
				</div>
			</div>
		</div>
	);
}
