import { CheckCircle2, KeyRound, Mail, ShieldCheck, User } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getAccountSession, verifySession } from "@/lib/auth";
import { ChangePasswordForm } from "./change-password-form";

export default async function ProfilPage() {
	const [user, { roles }] = await Promise.all([verifySession(), getAccountSession()]);
	const initial = user.name?.charAt(0).toUpperCase() ?? "P";

	return (
		<div className="mx-auto max-w-2xl space-y-6">
			{/* Profile Header Card */}
			<Card className="overflow-hidden">
				<div className="h-24 bg-linear-to-r from-primary-dark via-primary to-primary/80" />
				<CardContent className="relative pt-0 pb-6">
					<div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between -mt-12 mb-4">
						<div className="flex items-end gap-4">
							<div className="flex size-20 shrink-0 items-center justify-center rounded-2xl border-4 border-card bg-primary text-2xl font-bold text-primary-foreground shadow-md">
								{initial}
							</div>
							<div className="space-y-1">
								<div className="flex items-center gap-2">
									<h1 className="text-xl font-semibold text-foreground">{user.name}</h1>
									<span className="inline-flex items-center gap-1 rounded-full bg-success/15 px-2 py-0.5 text-[0.7rem] font-medium text-success">
										<CheckCircle2 className="size-3" />
										Aktif
									</span>
								</div>
								<p className="text-xs text-muted-foreground">{user.email}</p>
							</div>
						</div>
					</div>

					<div className="mt-6 grid grid-cols-1 gap-4 border-t border-border pt-5 sm:grid-cols-2">
						<div className="flex items-start gap-3 rounded-lg border border-border/60 bg-muted/30 p-3">
							<User className="size-5 text-primary shrink-0 mt-0.5" />
							<div>
								<span className="text-xs font-medium text-muted-foreground uppercase tracking-wider block">
									Nama Lengkap
								</span>
								<span className="text-sm font-medium text-foreground">{user.name}</span>
							</div>
						</div>

						<div className="flex items-start gap-3 rounded-lg border border-border/60 bg-muted/30 p-3">
							<Mail className="size-5 text-primary shrink-0 mt-0.5" />
							<div>
								<span className="text-xs font-medium text-muted-foreground uppercase tracking-wider block">
									Email Akun
								</span>
								<span className="text-sm font-medium text-foreground">{user.email}</span>
							</div>
						</div>

						{roles.length > 0 && (
							<div className="flex items-start gap-3 rounded-lg border border-border/60 bg-muted/30 p-3 sm:col-span-2">
								<ShieldCheck className="size-5 text-primary shrink-0 mt-0.5" />
								<div className="space-y-1">
									<span className="text-xs font-medium text-muted-foreground uppercase tracking-wider block">
										Hak Akses / Peran
									</span>
									<div className="flex flex-wrap gap-1.5">
										{roles.map((role) => (
											<span
												key={role}
												className="inline-flex items-center rounded-md border border-primary/20 bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary"
											>
												{role}
											</span>
										))}
									</div>
								</div>
							</div>
						)}
					</div>
				</CardContent>
			</Card>

			{/* Change Password Card */}
			<Card>
				<CardHeader>
					<div className="flex items-center gap-2">
						<KeyRound className="size-5 text-primary" />
						<CardTitle>Ganti Password</CardTitle>
					</div>
					<CardDescription>
						Perbarui kata sandi akun Anda secara berkala. Minimal 6 karakter, harus berbeda dari password lama.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<ChangePasswordForm />
				</CardContent>
			</Card>
		</div>
	);
}
