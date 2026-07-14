"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useChangePassword } from "@/hooks/useChangePassword";

const schema = z
	.object({
		oldPassword: z.string().min(1, "Password lama wajib diisi"),
		newPassword: z.string().min(6, "Password baru minimal 6 karakter"),
		confirmPassword: z.string().min(1, "Konfirmasi password wajib diisi"),
	})
	.refine((d) => d.newPassword !== d.oldPassword, {
		message: "Password baru harus berbeda dari password lama",
		path: ["newPassword"],
	})
	.refine((d) => d.newPassword === d.confirmPassword, {
		message: "Konfirmasi password tidak cocok",
		path: ["confirmPassword"],
	});

type Data = z.infer<typeof schema>;

function PasswordField({
	id,
	label,
	show,
	onToggle,
	error,
	register,
}: {
	id: string;
	label: string;
	show: boolean;
	onToggle: () => void;
	error?: string;
	register: ReturnType<ReturnType<typeof useForm<Data>>["register"]>;
}) {
	return (
		<div className="space-y-1.5">
			<Label htmlFor={id} className="text-sm font-medium">
				{label}
			</Label>
			<div className="relative">
				<Input id={id} type={show ? "text" : "password"} className="h-11 pr-10" aria-invalid={!!error} {...register} />
				<button
					type="button"
					onClick={onToggle}
					className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
					aria-label={show ? "Sembunyikan password" : "Tampilkan password"}
				>
					{show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
				</button>
			</div>
			{error && <p className="text-xs text-destructive">{error}</p>}
		</div>
	);
}

export function ChangePasswordForm() {
	const [showOld, setShowOld] = useState(false);
	const [showNew, setShowNew] = useState(false);
	const [showConfirm, setShowConfirm] = useState(false);
	const mutation = useChangePassword();
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
		setError,
	} = useForm<Data>({
		// ponytail: Zod v4 type mismatch with hookform — cast
		resolver: zodResolver(schema as never),
	});

	const onSubmit = (data: Data) => {
		mutation.mutate(
			{ oldPassword: data.oldPassword, newPassword: data.newPassword },
			{
				onSuccess: () => reset(),
				onError: (e) => setError("root", { message: e.message }),
			},
		);
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
			<PasswordField
				id="oldPassword"
				label="Password Lama"
				show={showOld}
				onToggle={() => setShowOld((p) => !p)}
				error={errors.oldPassword?.message}
				register={register("oldPassword")}
			/>
			<PasswordField
				id="newPassword"
				label="Password Baru"
				show={showNew}
				onToggle={() => setShowNew((p) => !p)}
				error={errors.newPassword?.message}
				register={register("newPassword")}
			/>
			<PasswordField
				id="confirmPassword"
				label="Konfirmasi Password Baru"
				show={showConfirm}
				onToggle={() => setShowConfirm((p) => !p)}
				error={errors.confirmPassword?.message}
				register={register("confirmPassword")}
			/>

			{errors.root && <p className="text-sm text-destructive">{errors.root.message}</p>}

			<div className="flex justify-end">
				<Button type="submit" disabled={mutation.isPending} className="h-11">
					{mutation.isPending && <Loader2 className="mr-1.5 size-4 animate-spin" />}
					{mutation.isPending ? "Menyimpan\u2026" : "Ganti Password"}
				</Button>
			</div>
		</form>
	);
}
