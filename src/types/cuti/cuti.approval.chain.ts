import type { ReadWriteStatus } from "@_types/enums/read.write.status";
import type { CutiPegawai } from "./cuti_pegawai";

export interface CutiApprovalChain {
	id: number;
	aprovalLevel: number;
	readWriteStatus: ReadWriteStatus;
	refCuti: CutiPegawai;
}
