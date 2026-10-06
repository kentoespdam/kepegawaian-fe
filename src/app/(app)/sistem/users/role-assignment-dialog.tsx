"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useRoleAssignment } from "@/hooks/sistem/useRoleAssignment";
import type { PrefRole } from "@/types/system/roles";
import type { UserResponse } from "@/types/system/users";

interface RoleAssignmentDialogProps {
	user: UserResponse | null;
	allRoles: PrefRole[];
	isLoadingRoles: boolean;
	onClose: () => void;
}

export function RoleAssignmentDialog({ user, allRoles, isLoadingRoles, onClose }: RoleAssignmentDialogProps) {
	const [selectedRoles, setSelectedRoles] = useState<Set<string>>(new Set(user?.prefs?.roles ?? []));

	const { assignMutation } = useRoleAssignment(onClose);

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
