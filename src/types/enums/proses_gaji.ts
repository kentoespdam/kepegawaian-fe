import { z } from "zod";

export const PROSES_GAJI={
	PENDING:"PENDING",
	PROSES:"PROSES",
	WAIT_VERIFICATION_PHASE_1: "Menunggu Verifikasi Tahap 1",
	WAIT_VERIFICATION_PHASE_2: "Menunggu Verifikasi Tahap 2",
	WAIT_APPROVAL: "Menunggu Persetujuan",
	FINISHED: "Selesai",
	FAILED: "Gagal",
}as const

export const ProseGaji=z.nativeEnum(PROSES_GAJI);

export type ProseGaji=z.infer<typeof ProseGaji>;