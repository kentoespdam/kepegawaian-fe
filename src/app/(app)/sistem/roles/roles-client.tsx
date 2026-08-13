"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Check, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import type { ListResultPrefPermission } from "@/types/system/permissions";
import type { ListResultPrefRole, PrefRole } from "@/types/system/roles";

/** Ambil SEMUA permission yang tersedia di sistem (read-only, katalog). */
function useAllPermissions() {
	return useQuery({
		queryKey: ["system-permissions"],
		queryFn: async () => {
			const res = await fetch("/api/proxy/system/permissions");
			if (!res.ok) throw new Error("Gagal memuat permission");
			const body = (await res.json()) as ListResultPrefPermission;
			return body.data ?? [];
		},
		staleTime: 5 * 60_000,
	});
}

/** Ambil semua role + permission yang dimilikinya (list endpoint, tanpa paging). */
function useAllRoles() {
	return useQuery({
		queryKey: ["system-roles"],
		queryFn: async () => {
			const res = await fetch("/api/proxy/system/roles/list");
			if (!res.ok) throw new Error("Gagal memuat role");
			const body = (await res.json()) as ListResultPrefRole;
			return body.data ?? [];
		},
		staleTime: 30_000,
	});
}

export function RolesClient() {
	const qc = useQueryClient();
	const rolesQuery = useAllRoles();
	const permsQuery = useAllPermissions();

	const roles = rolesQuery.data ?? [];
	const allPerms = permsQuery.data ?? [];

	const [selectedRole, setSelectedRole] = useState<PrefRole | null>(null);

	const toggleMutation = useMutation({
		mutationFn: async ({ roleId, permName, assign }: { roleId: string; permName: string; assign: boolean }) => {
			const res = await fetch(`/api/proxy/system/roles/${roleId}/permissions/${permName}`, {
				method: assign ? "POST" : "DELETE",
			});
			if (!res.ok && res.status !== 409) {
				const body: { message?: string } = await res.json().catch(() => ({}));
				throw new Error(body.message ?? (assign ? "Gagal menetapkan permission" : "Gagal mencabut permission"));
			}
		},
		onSuccess: (_d, { assign }) => {
			toast.success(assign ? "Permission ditetapkan" : "Permission dicabut");
			qc.invalidateQueries({ queryKey: ["system-roles"] });
		},
		onError: (e: Error) => toast.error(e.message),
	});

	const rolePerms = new Set((selectedRole?.permissions ?? []).map((p) => p.name));

	const handleToggle = (permName: string, assign: boolean) => {
		if (!selectedRole) return;
		toggleMutation.mutate({ roleId: selectedRole.id, permName, assign });
	};

	return (
		<>
			<div className="space-y-4">
				{rolesQuery.isPending && <p className="text-sm text-muted-foreground">Memuat role...</p>}
				{rolesQuery.isError && (
					<p className="text-sm text-destructive">
						Gagal memuat role.{" "}
						<Button variant="link" size="sm" className="h-auto p-0" onClick={() => rolesQuery.refetch()}>
							Coba lagi
						</Button>
					</p>
				)}
				{roles.length > 0 && (
					<div className="overflow-hidden rounded-lg border bg-card">
						<table className="w-full text-sm">
							<thead className="bg-muted/50 text-left text-xs uppercase text-muted-foreground">
								<tr>
									<th className="px-4 py-2.5">Role</th>
									<th className="px-4 py-2.5">Permission</th>
								</tr>
							</thead>
							<tbody>
								{roles.map((role) => (
									<tr key={role.id} className="border-t hover:bg-muted/30">
										<td className="px-4 py-2.5 font-medium">{role.id}</td>
										<td className="px-4 py-2.5">
											<Button
												variant="outline"
												size="sm"
												onClick={() => setSelectedRole(role)}
												aria-label={`Kelola permission ${role.id}`}
											>
												<Badge variant="secondary" className="mr-2">
													{(role.permissions ?? []).length}
												</Badge>
												Kelola
											</Button>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				)}
			</div>

			<Dialog open={selectedRole != null} onOpenChange={(v) => !v && setSelectedRole(null)}>
				<DialogContent className="flex max-h-[85dvh] flex-col gap-0 p-0 sm:max-w-lg">
					<DialogHeader className="shrink-0 border-b px-4 py-3">
						<DialogTitle>Permission — {selectedRole?.id}</DialogTitle>
					</DialogHeader>
					<div className="flex-1 space-y-1 overflow-y-auto p-4">
						{permsQuery.isPending && <p className="text-sm text-muted-foreground">Memuat permission...</p>}
						{allPerms.map((perm) => {
							const name = perm.name ?? "";
							const assigned = rolePerms.has(name);
							return (
								<div key={name} className="flex items-center justify-between rounded-lg border px-3 py-2">
									<span className="font-mono text-xs">{name}</span>
									<Button
										variant={assigned ? "secondary" : "outline"}
										size="sm"
										disabled={toggleMutation.isPending}
										onClick={() => handleToggle(name, !assigned)}
									>
										{assigned ? <Check className="mr-1.5 size-3.5" /> : <X className="mr-1.5 size-3.5" />}
										{assigned ? "Dicabut" : "Tetapkan"}
									</Button>
								</div>
							);
						})}
					</div>
				</DialogContent>
			</Dialog>
		</>
	);
}
