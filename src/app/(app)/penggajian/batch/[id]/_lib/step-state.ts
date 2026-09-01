import type { StatusBatch } from "@/types/penggajian/batch";

export const STEPS = [
	{
		id: "setup",
		label: "Seting Komponen Gaji",
		href: "./setup",
		permission: "PENGGAJIAN:SETUP",
		status: ["PENDING", "PROSES"] as StatusBatch[],
	},
	{
		id: "verifikasi-1",
		label: "Verifikasi Tahap 1",
		href: "./verifikasi-1",
		permission: "PENGGAJIAN:VERIFY1",
		status: ["WAIT_VERIFICATION_PHASE_1"] as StatusBatch[],
	},
	{
		id: "tambahan",
		label: "Tambahan Komponen",
		href: "./tambahan",
		permission: "PENGGAJIAN:TAMBAHAN",
		status: ["WAIT_VERIFICATION_PHASE_2"] as StatusBatch[],
	},
	{
		id: "persetujuan",
		label: "Persetujuan Akhir",
		href: "./persetujuan",
		permission: "PENGGAJIAN:APPROVE",
		status: ["WAIT_APPROVAL"] as StatusBatch[],
	},
] as const;

export const STATUS_ORDER: StatusBatch[] = [
	"PENDING",
	"PROSES",
	"WAIT_VERIFICATION_PHASE_1",
	"WAIT_VERIFICATION_PHASE_2",
	"WAIT_APPROVAL",
	"FINISHED",
];

export function getStepState(
	step: (typeof STEPS)[number],
	batchStatus: StatusBatch | undefined,
	permissions: string[],
): "active" | "completed" | "disabled" {
	if (!batchStatus) return "disabled";

	const statusIdx = STATUS_ORDER.indexOf(batchStatus);
	const stepIdx = STATUS_ORDER.indexOf(step.status[0]);

	// Step completed if batch status is past this step
	if (statusIdx > stepIdx) return "completed";

	// Step active if batch status matches this step AND user has permission
	const hasPermission = permissions.includes(step.permission);
	if (step.status.includes(batchStatus) && hasPermission) return "active";

	return "disabled";
}
