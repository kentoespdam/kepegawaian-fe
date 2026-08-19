"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader2, LogIn } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLogin } from "@/hooks/useLogin";

const schema = z.object({
	email: z.string().min(1, "Email wajib diisi"),
	password: z.string().min(1, "Password wajib diisi"),
});

type Data = z.infer<typeof schema>;

export function LoginForm({ defaultDomain }: { defaultDomain: string }) {
	const [showPassword, setShowPassword] = useState(false);
	const login = useLogin();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Data>({
		resolver: zodResolver(schema as never),
	});

	return (
		<div>
			<div className="mb-6 space-y-1">
				<h2 className="text-xl font-bold text-foreground">Masuk ke Akun</h2>
				<p className="text-xs text-muted-foreground">Masukkan email kedinasan dan password Anda untuk melanjutkan</p>
			</div>

			<form
				onSubmit={handleSubmit((data) => {
					const email = data.email.includes("@") ? data.email : `${data.email}@${defaultDomain}`;
					login.mutate({ email, password: data.password });
				})}
				className="space-y-5"
			>
				<div className="space-y-1.5">
					<Label htmlFor="email" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
						Username
					</Label>
					<Input
						id="email"
						type="text"
						placeholder="Masukkan email atau NIPAM"
						className="h-11 text-sm bg-background/50 focus-visible:bg-background"
						aria-invalid={!!errors.email}
						{...register("email")}
					/>
					{errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
				</div>

				<div className="space-y-1.5">
					<div className="flex items-center justify-between">
						<Label htmlFor="password" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
							Password
						</Label>
					</div>
					<div className="relative">
						<Input
							id="password"
							type={showPassword ? "text" : "password"}
							placeholder="Masukkan password"
							className="h-11 pr-10 text-sm bg-background/50 focus-visible:bg-background"
							aria-invalid={!!errors.password}
							{...register("password")}
						/>
						<button
							type="button"
							onClick={() => setShowPassword((prev) => !prev)}
							className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-1 transition-colors"
							aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
						>
							{showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
						</button>
					</div>
					{errors.password && <p className="text-xs text-destructive">{errors.password.message}</p>}
				</div>

				{login.error && (
					<div
						className="rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-xs text-destructive"
						role="alert"
					>
						{login.error.message}
					</div>
				)}

				<Button type="submit" className="w-full h-11 text-sm font-semibold shadow-sm" disabled={login.isPending}>
					{login.isPending ? (
						<>
							<Loader2 className="mr-2 size-4 animate-spin" />
							Memproses...
						</>
					) : (
						<>
							<LogIn className="mr-2 size-4" />
							Masuk
						</>
					)}
				</Button>

				<p className="text-center text-xs text-muted-foreground">
					Mengalami kendala login? Hubungi Administrator SIMPEG
				</p>
			</form>
		</div>
	);
}
