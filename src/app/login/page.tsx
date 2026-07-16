import Image from "next/image";
import { Suspense } from "react";
import { LoginForm } from "./login-form";

export default function LoginPage() {
	return (
		<div className="flex min-h-screen">
			<div className="relative hidden w-[45%] flex-col items-center justify-center gap-4 overflow-hidden bg-linear-to-b from-primary-dark to-primary p-8 text-center text-primary-foreground md:flex">
				<div className="absolute inset-0 opacity-30">
					<div className="absolute inset-0 animate-water bg-[radial-gradient(ellipse_at_30%_50%,rgba(255,255,255,0.3)_0%,transparent_60%),radial-gradient(ellipse_at_70%_30%,rgba(255,255,255,0.2)_0%,transparent_50%),radial-gradient(ellipse_at_50%_70%,rgba(255,255,255,0.15)_0%,transparent_40%)] bg-size-[200%_200%]" />
				</div>
				<div className="relative z-10 flex flex-col items-center">
					<div className="mb-6 rounded-2xl bg-white/95 p-5 shadow-lg ring-1 ring-white/40 backdrop-blur">
						<Image
							src="/logo_pdam.svg"
							alt="Logo Perumdam Tirta Satria"
							width={180}
							height={128}
							priority
							className="h-auto w-40"
						/>
					</div>
					<h1 className="text-2xl font-semibold tracking-wide">PERUMDAM TIRTA SATRIA</h1>
					<p className="mt-2 text-lg text-primary-foreground/80">Sistem Kepegawaian</p>
					<p className="mt-1 text-sm text-primary-foreground/60 italic">&ldquo;Melayani dengan Sepenuh Hati&rdquo;</p>
				</div>
			</div>

			<div className="flex flex-1 items-center justify-center p-6">
				<div className="w-full max-w-sm">
					<div className="mb-8 text-center md:hidden">
						<div className="mx-auto mb-3 w-fit rounded-xl bg-white p-3 shadow-sm ring-1 ring-border">
							<Image
								src="/logo_pdam.svg"
								alt="Logo Perumdam Tirta Satria"
								width={120}
								height={85}
								priority
								className="h-auto w-24"
							/>
						</div>
						<h1 className="text-lg font-semibold text-foreground">PERUMDAM TIRTA SATRIA</h1>
						<p className="text-sm text-muted-foreground">Sistem Kepegawaian</p>
					</div>

					<Suspense fallback={null}>
						<LoginForm />
					</Suspense>
				</div>
			</div>
		</div>
	);
}
