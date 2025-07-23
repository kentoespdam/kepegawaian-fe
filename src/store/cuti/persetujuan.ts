import type {
	CutiApprovalMini,
	CutiApprovalSchema,
} from "@_types/cuti/cuti.approval";
import type { CutiPegawai } from "@_types/cuti/cuti_pegawai";
import type { PegawaiDetail } from "@_types/pegawai";
import type { SelectedHandlerStore } from "@store/base-store";
import { create } from "zustand";

interface PersetujuanCutiStore extends SelectedHandlerStore {
	defaultValue: CutiApprovalSchema;
	setDefaultValue: (
		approver: PegawaiDetail,
		cutiPegawai: CutiPegawai,
		value?: CutiApprovalMini,
	) => void;
	openInfo: boolean;
	setOpenInfo: (open: boolean) => void;
	cutiPegawai?: CutiPegawai;
	setCutiPegawai: (cutiPegawai: CutiPegawai) => void;
}

export const usePersetujuanCutiStore = create<PersetujuanCutiStore>((set) => ({
	defaultValue: {
		id: 0,
		csrfToken: "",
		cutiId: 0,
		nipam: "",
		nama: "",
		pangkatGolongan: "",
		organisasi: "",
		jabatan: "",
		jenisCutiNama: "",
		subJenisCutiNama: "",
		tanggalMulai: "",
		tanggalSelesai: "",
		jumlahHariKerja: 0,
		alasan: "",
		approverId: 0,
		approvalLevel: 0,
		approvalStatus: "",
		notes: "",
	},
	setDefaultValue: (approver, cutiPegawai, value) =>
		set((state) => ({
			...state,
			defaultValue: {
				...state.defaultValue,
				id: value?.id ?? 0,
				csrfToken: "",
				cutiId: cutiPegawai.id,
				nipam: cutiPegawai.nipam,
				nama: cutiPegawai.nama,
				pangkatGolongan: cutiPegawai.pangkatGolongan,
				organisasi: cutiPegawai.organisasi?.nama ?? "",
				jabatan: cutiPegawai.jabatan?.nama ?? "",
				jenisCutiNama: cutiPegawai.jenisCuti.nama,
				subJenisCutiNama: cutiPegawai.subJenisCuti?.nama ?? "",
				tanggalMulai: cutiPegawai.tanggalMulai,
				tanggalSelesai: cutiPegawai.tanggalSelesai,
				jumlahHariKerja: cutiPegawai.jumlahHariKerja,
				alasan: cutiPegawai.alasan,
				approverId: value?.approver.id ?? approver.id,
				approvalLevel: value?.approvalLevel ?? cutiPegawai.approvalLevel,
				approvalStatus: value?.approvalStatus ?? "",
				notes: value?.notes ?? "",
			},
		})),
	selectedDataId: 0,
	setSelectedDataId: (id) => set({ selectedDataId: id }),
	open: false,
	setOpen: (val) => set({ open: val }),
	openDelete: false,
	setOpenDelete: (val) => set({ openDelete: val }),
	openInfo: false,
	setOpenInfo: (open) => set({ openInfo: open }),
	setCutiPegawai: (cutiPegawai) => set({ cutiPegawai }),
}));
