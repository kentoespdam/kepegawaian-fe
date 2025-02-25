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
			statusPegawai: "PEGAWAI",
			nomorSk: "123456789",
			tmtGolongan: "2022-01-01",
			jabatan: {
				id: 3,
				kode: "0",
				level: {
					id: 3,
					nama: "DIRTEK",
				},
				nama: "Direktur Teknik",
			},
			organisasi: {
				id: 3,
				kode: "0",
				parent: {
					id: 2,
					kode: "0",
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
				organisasi: {
					id: 39,
					kode: "0",
					nama: "SUB BAG TEKNOLOGI INFORMASI",
				},
				jabatan: {
					id: 59,
					kode: "0",
					level: {
						id: 5,
						nama: "MANAJER",
					},
					nama: "MANAJER SDM & TI",
				},
				grade: {
					id: 10,
					level: {
						id: 5,
						nama: "MANAJER",
					},
					grade: 1,
					tukin: 300000.0,
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
			statusKerja: "KARYAWAN_AKTIF",
			refSkCapegId: 0,
			refSkGolonganId: 0,
			refSkJabatanId: 0,
			refSkMutasiId: 0,
			refSkPegawaiId: 0,
			tmtKerja: "2022-01-01",
			tmtJabatan: null,
			tmtMutasi: null,
			tmtPegawai: null,
			tmtPensiun: null,
			gajiPokok: 0,
			phdp: 0,
			jmlTanggungan: 0,
			mkgTahun: 0,
			mkgBulan: 0,
			isAskes: false,
			kodePajak: null,
			absensiId: 0,
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
