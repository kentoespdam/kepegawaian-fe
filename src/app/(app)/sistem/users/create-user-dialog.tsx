"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { systemKeys } from "@/hooks/keys/system-keys";
import type { PrefRole } from "@/types/system/roles";
import type { AuthPostRequest } from "@/types/system/users";

interface CreateUserDialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	allRoles: PrefRole[];
}

export function CreateUserDialog({ open, onOpenChange, allRoles }: CreateUserDialogProps) {
	const qc = useQueryClient();
	const [nipam, setNipam] = useState("");
	const [nama, setNama] = useState("");
	const [password, setPassword] = useState("");
	const [roles, setRoles] = useState<Set<string>>(new Set());
	const [error, setError] = useState<string | null>(null);

	const createUser = useMutation({
		mutationFn: async (data: AuthPostRequest) => {
			const res = await fetch("/api/proxy/system/users", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(data),
			});
			if (!res.ok) {
				const body: { message?: string } = await res.json().catch(() => ({}));
				throw new Error(body.message ?? "Gagal membuat user");
			}
		},
		onSuccess: () => {
			toast.success("User dibuat");
			onOpenChange(false);
			setError(null);
			qc.invalidateQueries({ queryKey: systemKeys.users.all() });
		},
		onError: (e: Error) => setError(e.message),
	});

	const handleSubmit = () => {
		const nipamV = nipam.trim();
		const namaV = nama.trim();
		const passwordV = password.trim();
		if (!nipamV || !namaV) {
			setError("NIPAM dan nama wajib diisi");
			return;
		}
		createUser.mutate({
			nipam: nipamV,
			nama: namaV,
			password: passwordV || undefined,
			roles: [...roles].map((id) => ({ id })),
		});
	};

	const reset = () => {
		setNipam("");
		setNama("");
		setPassword("");
		setRoles(new Set());
		setError(null);
	};

	return (
		<Dialog
			open={open}
			onOpenChange={(v) => {
				if (!v) reset();
				onOpenChange(v);
			}}
		>
			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<DialogTitle>Tambah user</DialogTitle>
				</DialogHeader>
				<div className="space-y-3">
					<div className="space-y-1.5">
						<Label htmlFor="user-nipam">NIPAM</Label>
						<Input
							id="user-nipam"
							value={nipam}
							onChange={(e) => setNipam(e.target.value)}
							placeholder="Nomor pegawai"
						/>
					</div>
					<div className="space-y-1.5">
						<Label htmlFor="user-nama">Nama</Label>
						<Input id="user-nama" value={nama} onChange={(e) => setNama(e.target.value)} placeholder="Nama lengkap" />
					</div>
					<div className="space-y-1.5">
						<Label htmlFor="user-password">Password</Label>
						<Input
							id="user-password"
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							placeholder="Opsional"
						/>
					</div>
					<div className="space-y-1.5">
						<Label>Role</Label>
						<div className="flex max-h-40 flex-col gap-1 overflow-y-auto rounded-lg border p-2">
							{allRoles.length === 0 && <p className="text-sm text-muted-foreground">Tidak ada role</p>}
							{allRoles.map((role) => {
								const checked = roles.has(role.id);
								return (
									<label
										key={role.id}
										className="flex cursor-pointer items-center justify-between rounded-lg border px-3 py-2"
									>
										<span className="text-sm font-medium">{role.id}</span>
										<input
											type="checkbox"
											checked={checked}
											onChange={() => {
												const next = new Set(roles);
												checked ? next.delete(role.id) : next.add(role.id);
												setRoles(next);
											}}
											className="size-4 accent-primary"
										/>
									</label>
								);
							})}
						</div>
					</div>
					{error && <p className="text-sm text-destructive">{error}</p>}
					<div className="flex justify-end gap-2">
						<Button variant="outline" size="lg" onClick={() => onOpenChange(false)}>
							Batal
						</Button>
						<Button size="lg" onClick={handleSubmit} disabled={createUser.isPending}>
							Simpan
						</Button>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
