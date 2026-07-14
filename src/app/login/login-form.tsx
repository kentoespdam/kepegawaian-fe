"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLogin } from "@/hooks/useLogin";

const schema = z.object({
	email: z.string().min(1, "Email wajib diisi").email("Format email tidak valid"),
	password: z.string().min(1, "Password wajib diisi"),
});

type Data = z.infer<typeof schema>;

export function LoginForm() {
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
		<>
			<h2 className="mb-6 text-xl font-semibold text-foreground">Masuk</h2>
			<form onSubmit={handleSubmit((data) => login.mutate(data))} className="space-y-5">
				<div className="space-y-1.5">
					<Label htmlFor="email" className="text-sm font-medium">
						Email
					</Label>
					<Input
						id="email"
						type="email"
						placeholder="nama@perumdam.com"
						className="h-11"
						aria-invalid={!!errors.email}
						{...register("email")}
					/>
					{errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
				</div>

				<div className="space-y-1.5">
					<Label htmlFor="password" className="text-sm font-medium">
						Password
					</Label>
					<div className="relative">
						<Input
							id="password"
							type={showPassword ? "text" : "password"}
							placeholder="Password"
							className="h-11 pr-10"
							aria-invalid={!!errors.password}
							{...register("password")}
						/>
						<button
							type="button"
							onClick={() => setShowPassword((prev) => !prev)}
							className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
							aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
						>
							{showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
						</button>
					</div>
					{errors.password && <p className="text-xs text-destructive">{errors.password.message}</p>}
				</div>

				{login.error && (
					<p className="text-sm text-destructive" role="alert">
						{login.error.message}
					</p>
				)}

				<Button type="submit" className="w-full h-11" disabled={login.isPending}>
					{login.isPending && <Loader2 className="mr-2 size-4 animate-spin" />}
					{login.isPending ? "Memproses…" : "Masuk"}
				</Button>

				<p className="text-center text-xs text-muted-foreground">Butuh bantuan? Hubungi admin</p>
			</form>
		</>
	);
}
