import { useState } from "react";
import { toast } from "sonner";
import { handle } from "@/lib/api/client";
import type { ReportJobResponse } from "@/types/laporan/kepegawaian";

export interface ExportReportOptions {
	endpoint: string;
	reportName: string;
}

export function useAsyncReportExport() {
	const [isExporting, setIsExporting] = useState(false);

	const exportReport = async ({ endpoint, reportName }: ExportReportOptions) => {
		setIsExporting(true);
		const toastId = toast.loading(`Menyiapkan ${reportName}...`);

		try {
			const res = await fetch(endpoint, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
			});
			const job = await handle<ReportJobResponse>(res);

			if (!job?.jobId) {
				toast.error(`Gagal memulai antrean ekspor ${reportName}`, { id: toastId });
				setIsExporting(false);
				return;
			}

			if (job.status === "COMPLETED") {
				toast.success(`${reportName} siap diunduh!`, {
					id: toastId,
					duration: 20000,
					action: {
						label: "Unduh",
						onClick: () => {
							window.open(`/api/proxy/laporan/kepegawaian/jobs/${job.jobId}/download`, "_blank");
						},
					},
				});
				setIsExporting(false);
				return;
			}

			// Polling status di background
			toast.loading(`Sedang memproses ${reportName} di server...`, { id: toastId });

			let attempts = 0;
			const maxAttempts = 120; // 120 * 2.5s = 5 menit timeout
			const intervalId = setInterval(async () => {
				attempts += 1;
				try {
					const pollRes = await fetch(`/api/proxy/laporan/kepegawaian/jobs/${job.jobId}`);
					const pollJob = await handle<ReportJobResponse>(pollRes);

					if (pollJob.status === "COMPLETED") {
						clearInterval(intervalId);
						setIsExporting(false);
						toast.success(`${reportName} selesai dibuat!`, {
							id: toastId,
							duration: 20000,
							action: {
								label: "Unduh",
								onClick: () => {
									window.open(`/api/proxy/laporan/kepegawaian/jobs/${job.jobId}/download`, "_blank");
								},
							},
						});
					} else if (pollJob.status === "FAILED") {
						clearInterval(intervalId);
						setIsExporting(false);
						toast.error(pollJob.errorMessage || `Gagal mengekspor ${reportName}`, { id: toastId });
					} else if (attempts >= maxAttempts) {
						clearInterval(intervalId);
						setIsExporting(false);
						toast.error(`Waktu proses ${reportName} telah habis. Silakan coba kembali nanti.`, { id: toastId });
					}
				} catch {
					// Bila network error sementara saat polling, biarkan mencoba sampai maxAttempts
					if (attempts >= maxAttempts) {
						clearInterval(intervalId);
						setIsExporting(false);
						toast.error(`Terjadi gangguan koneksi saat memeriksa status ${reportName}`, { id: toastId });
					}
				}
			}, 2500);
		} catch (error) {
			setIsExporting(false);
			const msg = error instanceof Error ? error.message : `Gagal mengekspor ${reportName}`;
			toast.error(msg, { id: toastId });
		}
	};

	return {
		exportReport,
		isExporting,
	};
}
