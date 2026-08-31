"use client";

import { ArrowLeft, CheckCircle2, Circle, Loader2 } from "lucide-react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { BatchProvider, useBatchContext } from "@/hooks/BatchContext";
import { useAuth } from "@/hooks/useAuth";
import { useBatchInfo } from "@/hooks/useBatchInfo";
import { PERMISSION } from "@/lib/auth/permissions";
import { cn } from "@/lib/utils";
import type { StatusBatch } from "@/types/penggajian/batch";

const STEPS = [
	{
		id: "setup",
		label: "Seting Komponen Gaji",
		href: "./setup",
		permission: PERMISSION.PENGGAJIAN_SETUP,
		status: ["PENDING", "PROSES"] as StatusBatch[],
	},
	{
		id: "verifikasi-1",
		label: "Verifikasi Tahap 1",
		href: "./verifikasi-1",
		permission: PERMISSION.PENGGAJIAN_VERIFY1,
		status: ["WAIT_VERIFICATION_PHASE_1"] as StatusBatch[],
	},
	{
		id: "tambahan",
		label: "Tambahan Komponen",
		href: "./tambahan",
		permission: PERMISSION.PENGGAJIAN_TAMBAHAN,
		status: ["WAIT_VERIFICATION_PHASE_2"] as StatusBatch[],
	},
	{
		id: "persetujuan",
		label: "Persetujuan Akhir",
		href: "./persetujuan",
		permission: PERMISSION.PENGGAJIAN_APPROVE,
		status: ["WAIT_APPROVAL"] as StatusBatch[],
	},
] as const;

const STATUS_ORDER: StatusBatch[] = [
	"PENDING",
	"PROSES",
	"WAIT_VERIFICATION_PHASE_1",
	"WAIT_VERIFICATION_PHASE_2",
	"WAIT_APPROVAL",
	"FINISHED",
];

function getStepState(
	step: (typeof STEPS)[number],
	batchStatus: StatusBatch | undefined,
	permissions: string[],
): "active" | "completed" | "disabled" {
	if (!batchStatus) return "disabled";

	const statusIdx = STATUS_ORDER.indexOf(batchStatus);
	const stepIdx = STATUS_ORDER.indexOf(step.status[0]);

	// ponytail: step completed if batch status is past this step
	if (statusIdx > stepIdx) return "completed";

	// step active if batch status matches this step AND user has permission
	const hasPermission = permissions.includes(step.permission);
	if (step.status.includes(batchStatus) && hasPermission) return "active";

	return "disabled";
}

function StepperRail() {
	const { data: batch, isPending } = useBatchContext();
	const { permissions } = useAuth();
	const pathname = usePathname();

	if (isPending) {
		return (
			<nav className="space-y-1">
				{STEPS.map((step) => (
					<div key={step.id} className="flex items-center gap-3 px-3 py-2">
						<Loader2 className="size-5 animate-spin text-muted-foreground" />
						<div className="h-4 w-32 bg-muted animate-pulse rounded" />
					</div>
				))}
			</nav>
		);
	}

	return (
		<nav className="space-y-1" aria-label="Workflow Steps">
			{STEPS.map((step) => {
				const state = getStepState(step, batch?.status, permissions);
				const isActive = pathname.includes(step.id);
				const Icon = state === "completed" ? CheckCircle2 : Circle;

				return (
					<Link
						key={step.id}
						href={state === "disabled" ? "#" : step.href}
						aria-disabled={state === "disabled"}
						tabIndex={state === "disabled" ? -1 : 0}
						className={cn(
							"flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-all duration-150",
							state === "active" && "bg-primary/10 text-primary",
							state === "completed" && "text-green-600 hover:bg-green-50",
							state === "disabled" && "text-muted-foreground/50 cursor-not-allowed",
							isActive && state !== "disabled" && "ring-2 ring-primary/20",
						)}
						title={state === "disabled" ? "Belum saatnya" : undefined}
					>
						<Icon className={cn("size-5 shrink-0", state === "completed" && "text-green-600")} />
						<span>{step.label}</span>
					</Link>
				);
			})}
		</nav>
	);
}

function BatchLayoutInner({ children }: { children: React.ReactNode }) {
	const params = useParams<{ id: string }>();
	const { data: batch, isPending, isError, error } = useBatchInfo(params.id);

	return (
		<BatchProvider value={{ data: batch, isPending, isError, error }}>
			<div className="flex flex-col gap-4">
				{/* Back arrow + header */}
				<div className="flex items-center gap-3">
					<Link
						href="/penggajian/batch"
						className="flex items-center justify-center size-10 shrink-0 rounded-md hover:bg-accent transition-colors mt-0.5"
						aria-label="Kembali ke Daftar Batch"
					>
						<ArrowLeft className="size-5" />
					</Link>
					<div className="flex-1 min-w-0">
						{isPending ? (
							<div className="space-y-1.5">
								<div className="h-6 w-64 bg-muted animate-pulse rounded" />
								<div className="h-4 w-48 bg-muted animate-pulse rounded" />
							</div>
						) : isError ? (
							<p className="text-sm text-muted-foreground">Gagal memuat data batch</p>
						) : (
							<div>
								<h1 className="text-lg font-semibold text-foreground">Proses Gaji — {batch?.periode ?? "-"}</h1>
								<div className="flex items-center gap-2 text-sm text-muted-foreground">
									<span className="px-2 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
										{batch?.status ?? "-"}
									</span>
									<span>•</span>
									<span>{batch?.totalPegawai ?? 0} pegawai</span>
									{batch?.tanggalProses && (
										<>
											<span>•</span>
											<span>{new Date(batch.tanggalProses).toLocaleDateString("id-ID")}</span>
										</>
									)}
								</div>
							</div>
						)}
					</div>
				</div>

				{/* Rail + content */}
				<div className="flex gap-5 items-start">
					<div className="w-64 shrink-0 rounded-lg border bg-card shadow-sm p-4 sticky top-4">
						<div className="flex items-center justify-between mb-3 pb-3 border-b border-border">
							<h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Workflow</h2>
						</div>
						<StepperRail />
					</div>
					<div className="flex-1 min-w-0">{children}</div>
				</div>
			</div>
		</BatchProvider>
	);
}

export default function BatchLayout({ children }: { children: React.ReactNode }) {
	return <BatchLayoutInner>{children}</BatchLayoutInner>;
}
