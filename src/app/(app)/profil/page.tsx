import { CheckCircle2, KeyRound, Mail, ShieldCheck, User } from "lucide-react";
import { getAccountSession, verifySession } from "@/lib/auth";
import { ChangePasswordForm } from "./change-password-form";

export default async function ProfilPage() {
	const [user, { roles }] = await Promise.all([verifySession(), getAccountSession()]);
	const initial = user.name?.charAt(0).toUpperCase() ?? "P";

	return (
		<div className="mx-auto max-w-2xl space-y-6">
			{/* Profile Header Card */}
			<div className="rounded-2xl border border-border/60 bg-muted/20 p-1.5 shadow-xs">
				<div className="rounded-[0.75rem] border border-border/40 bg-card shadow-2xs overflow-hidden">
					<div className="h-24 bg-linear-to-r from-primary-dark via-primary to-primary/80" />
					<div className="relative p-6 pt-0">
						<div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between -mt-12 mb-4">
							<div className="flex items-end gap-4">
								<div className="flex size-20 shrink-0 items-center justify-center rounded-2xl border-4 border-card bg-primary text-2xl font-bold text-primary-foreground shadow-md ring-2 ring-primary/20">
									{initial}
								</div>
								<div className="space-y-1">
									<div className="flex items-center gap-2">
										<h1 className="text-xl font-bold text-foreground">{user.name}</h1>
										<span className="inline-flex items-center gap-1 rounded-full bg-success/15 px-2.5 py-0.5 text-[10px] uppercase font-semibold tracking-[0.18em] text-success border border-success/20">
											<CheckCircle2 className="size-3" />
											Aktif
										</span>
									</div>
									<p className="text-xs text-muted-foreground font-mono">{user.email}</p>
								</div>
							</div>
						</div>

						<div className="mt-6 grid grid-cols-1 gap-4 border-t border-border/60 pt-5 sm:grid-cols-2">
							<div className="flex items-start gap-3 rounded-xl border border-border/60 bg-muted/20 p-3.5">
								<User className="size-5 text-primary shrink-0 mt-0.5" />
								<div>
									<span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-[0.18em] block">
										Nama Lengkap
									</span>
									<span className="text-sm font-medium text-foreground">{user.name}</span>
								</div>
							</div>

							<div className="flex items-start gap-3 rounded-xl border border-border/60 bg-muted/20 p-3.5">
								<Mail className="size-5 text-primary shrink-0 mt-0.5" />
								<div>
									<span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-[0.18em] block">
										Email Akun
									</span>
									<span className="text-sm font-medium text-foreground font-mono">{user.email}</span>
								</div>
							</div>

							{roles.length > 0 && (
								<div className="flex items-start gap-3 rounded-xl border border-border/60 bg-muted/20 p-3.5 sm:col-span-2">
									<ShieldCheck className="size-5 text-primary shrink-0 mt-0.5" />
									<div className="space-y-1">
										<span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-[0.18em] block">
											Hak Akses / Peran
										</span>
										<div className="flex flex-wrap gap-1.5">
											{roles.map((role) => (
												<span
													key={role}
													className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-0.5 text-[10px] uppercase tracking-[0.18em] font-semibold text-primary"
												>
													{role}
												</span>
											))}
										</div>
									</div>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>

			{/* Change Password Card */}
			<div className="rounded-2xl border border-border/60 bg-muted/20 p-1.5 shadow-xs">
				<div className="rounded-[0.75rem] border border-border/40 bg-card p-6 shadow-2xs">
					<div className="space-y-1.5 mb-6">
						<div className="flex items-center gap-2">
							<KeyRound className="size-5 text-primary" />
							<h2 className="text-base font-bold text-foreground">Ganti Password</h2>
						</div>
						<p className="text-xs text-muted-foreground">
							Perbarui kata sandi akun Anda secara berkala. Minimal 6 karakter, harus berbeda dari password lama.
						</p>
					</div>
					<ChangePasswordForm />
				</div>
			</div>
		</div>
	);
}
