import type { Biodata } from "@_types/profil/biodata";
import type { Pendidikan, PendidikanSchema } from "@_types/profil/pendidikan";
import { create } from "zustand";

const defaultValues = {
	id: 0,
	biodataId: "",
	biodataName: "",
	jenjangPendidikanId: 0,
	gelarDepan: "",
	gelarBelakang: "",
	institusi: "",
	jurusan: "",
	kota: "",
	tahunMasuk: 0,
	tahunLulus: 0,
	gpa: 0,
	isLatest: false,
};

interface PendidikanStore {
	pendidikanId: number;
	setPendidikanId: (pendidikanId: number) => void;
	open: boolean;
	setOpen: (open: boolean) => void;
	openDelete: boolean;
	setOpenDelete: (open: boolean) => void;
	defaultValues: PendidikanSchema;
	setDefaultValues: (biodata: Biodata, pendidikan?: Pendidikan) => void;
}

export const usePendidikanStore = create<PendidikanStore>((set) => ({
	pendidikanId: 0,
	setPendidikanId: (pendidikanId) => set({ pendidikanId }),
	open: false,
	setOpen: (open) => set({ open }),
	openDelete: false,
	setOpenDelete: (open) => set({ openDelete: open }),
	defaultValues: defaultValues,
	setDefaultValues: (biodata, pendidikan) =>
		set((state) => ({
			...state,
			defaultValues: {
				id: pendidikan?.id || 0,
				biodataId: biodata.nik || "",
				biodataName: biodata.nama || "",
				jenjangPendidikanId: pendidikan?.jenjangPendidikan.id || 0,
				gelarDepan: pendidikan?.gelarDepan || "",
				gelarBelakang: pendidikan?.gelarBelakang || "",
				institusi: pendidikan?.institusi || "",
				jurusan: pendidikan?.jurusan || "",
				kota: pendidikan?.kota || "",
				tahunMasuk: pendidikan?.tahunMasuk || 0,
				tahunLulus: pendidikan?.tahunLulus || 0,
				gpa: pendidikan?.gpa || 0,
				isLatest: pendidikan?.isLatest || false,
			},
		})),
}));
