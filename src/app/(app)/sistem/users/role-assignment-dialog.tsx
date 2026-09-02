"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { systemKeys } from "@/hooks/keys/system-keys";
import type { PrefRole } from "@/types/system/roles";
import type { UserResponse } from "@/types/system/users";

interface RoleAssignmentDialogProps {
	user: UserResponse | null;
	allRoles: PrefRole[];
	isLoadingRoles: boolean;
	onClose: () => void;
}

export function RoleAssignmentDialog({ user, allRoles, isLoadingRoles, onClose }: RoleAssignmentDialogProps) {
	const qc = useQueryClient();
	const [selectedRoles, setSelectedRoles] = useState<Set<string>>(new Set(user?.prefs?.roles ?? []));

	const assignMutation = useMutation({
		mutationFn: async ({ userId, roles }: { userId: string; roles: PrefRole[] }) => {
			const res = await fetch(`/api/proxy/system/users/pref/${userId}`, {
				method: "PATCH",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(roles),
			});
			if (!res.ok) {
				const body: { message?: string } = await res.json().catch(() => ({}));
				throw new Error(body.message ?? "Gagal memperbarui role");
			}
		},
		onSuccess: () => {
			toast.success("Role user diperbarui");
			onClose();
			qc.invalidateQueries({ queryKey: systemKeys.users.all() });
		},
		onError: (e: Error) => toast.error(e.message),
	});

	const handleSave = () => {
		if (!user?.id) return;
		assignMutation.mutate({ userId: String(user.id), roles: [...selectedRoles].map((id) => ({ id })) });
	};

	if (!user) return null;

	return (
		<Dialog open={user != null} onOpenChange={(v) => !v && onClose()}>
			<DialogContent className="flex max-h-[85dvh] flex-col gap-0 p-0 sm:max-w-md">
				<DialogHeader className="shrink-0 border-b px-4 py-3">
					<DialogTitle>Role — {user.nama ?? user.nipam}</DialogTitle>
				</DialogHeader>
				<div className="flex-1 space-y-1.5 overflow-y-auto p-4">
					{isLoadingRoles && <p className="text-sm text-muted-foreground">Memuat role...</p>}
					{allRoles.map((role) => {
						const checked = selectedRoles.has(role.id);
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
										const next = new Set(selectedRoles);
										checked ? next.delete(role.id) : next.add(role.id);
										setSelectedRoles(next);
									}}
									className="size-4 accent-primary"
								/>
							</label>
						);
					})}
				</div>
				<div className="flex shrink-0 justify-end gap-2 border-t px-4 py-3">
					<Button variant="outline" size="lg" onClick={onClose}>
						Batal
					</Button>
					<Button size="lg" onClick={handleSave} disabled={assignMutation.isPending}>
						Simpan
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
}
