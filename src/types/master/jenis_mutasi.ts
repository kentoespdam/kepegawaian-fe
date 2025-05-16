export interface JenisMutasi {
	id: string;
	nama: string;
}

export const mutasiGetName = (data: JenisMutasi[], id: string) => {
	return data.find((mutasi) => mutasi.id === id)?.nama;
};
