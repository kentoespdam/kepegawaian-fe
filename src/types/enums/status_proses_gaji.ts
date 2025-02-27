import { z } from "zod";

export const STATUS_PROSES_GAJI = {
	PENDING: "PENDING",
	PROSES: "PROSES",
	WAIT_VERIFICATION_PHASE_1: "Menunggu Verifikasi Tahap 1",
	WAIT_VERIFICATION_PHASE_2: "Menunggu Verifikasi Tahap 2",
	WAIT_APPROVAL: "Menunggu Persetujuan",
	FINISHED: "Selesai",
	FAILED: "Gagal",
} as const;

export const StatusProseGaji = z.nativeEnum(STATUS_PROSES_GAJI);

export type StatusProseGaji = z.infer<typeof StatusProseGaji>;

export const getStatusProsesGajiValue = (key: string) => {
	return STATUS_PROSES_GAJI[key as keyof typeof STATUS_PROSES_GAJI];
};

export const getKeyStatusProsesGaji = (status: StatusProseGaji): string => {
	const keys = Object.keys(
		STATUS_PROSES_GAJI,
	) as (keyof typeof STATUS_PROSES_GAJI)[];
	for (const key of keys) {
		if (STATUS_PROSES_GAJI[key] === status) {
			return key;
		}
	}
	return "";
};
