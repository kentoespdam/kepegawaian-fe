export interface StatusPegawai {
	id: string;
	nama: string;
}

export const statusPegawaiName = (data: StatusPegawai[], id: string) => {
	const result = data.find((status) => status.id === id);
	return result? result.nama : "Pilih Status Pegawai";
};
