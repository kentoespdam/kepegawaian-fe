export interface JenisKontrak {
	id: string;
	nama: string;
}

export const jenisKontrakGetName = (data: JenisKontrak[], id: string) => {
	return data.find((mutasi) => mutasi.id === id)?.nama;
};
