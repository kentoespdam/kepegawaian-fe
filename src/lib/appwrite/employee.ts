import { STATUS_KAWIN } from "@_types/enums/status_kawin";
import type { Pegawai } from "@_types/pegawai";
import { delay } from "@lib/utils";

export const getEmployeeByNipam = async (
	nipam: string,
): Promise<Pegawai | undefined> => {
	try {
		await delay();
		// Contoh data pegawai, seharusnya diambil dari database atau API
		const employee: Pegawai = {
			id: 1,
			nipam: "900800456",
			biodata: {
				nik: "33021123456789",
				nama: "Bagus Sudrajat",
				jenisKelamin: "LAKI_LAKI",
				tanggalLahir: "2000-01-01",
				statusKawin: STATUS_KAWIN[1],
			},
			statusPegawai: {
				id: 3,
				nama: "PEGAWAI",
			},
			noSk: "123456789",
			tanggalTmtSk: "2022-01-01",
			jabatan: {
				id: 3,
				level: {
					id: 3,
					nama: "DIRTEK",
				},
				nama: "Direktur Teknik",
			},
			organisasi: {
				id: 3,
				parent: {
					id: 2,
					nama: "DIREKTORAT UTAMA",
				},
				levelOrganisasi: 3,
				nama: "DIREKTORAT TEKNIK",
			},
			profesi: {
				id: 2,
				level: {
					id: 5,
					nama: "MANAJER",
				},
				detail: null,
				resiko: null,
				nama: "Manajer Produksi & Distribusi 1",
				apdList: null,
				alatKerjaList: null,
			},
			golongan: {
				id: 1,
				golongan: "A.1",
				pangkat: "Pegawai Dasar Muda",
			},
			grade: {
				id: 1,
				level: {
					id: 5,
					nama: "MANAJER",
				},
				grade: 1,
				tukin: 300000.0,
			},
			statusKerja: {
				id: 1,
				nama: "Karyawan Aktif",
			},
			notes: null,
		};
		// Mengembalikan data pegawai jika nipam cocok
		if (employee.nipam === nipam) {
			return employee;
		}
		return undefined;
	} catch (e) {
		console.error("Terjadi kesalahan saat mengambil data pegawai:", e);
	}
};
