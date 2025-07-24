export const NAMA_BULAN = [
	"Januari",
	"Februari",
	"Maret",
	"April",
	"Mei",
	"Juni",
	"Juli",
	"Agustus",
	"September",
	"Oktober",
	"November",
	"Desember",
];

export const getNamaBulan = (bulan: number): string => {
	return NAMA_BULAN[bulan - 1];
};

export const hitungSisaBulanHari = (
	tanggalAwal: string,
	tanggalAkhir: string,
) => {
	// Membuat objek Date untuk tanggalAwal dan tanggalAkhir
	const tAwal = new Date(tanggalAwal);
	const tAkhir = new Date(tanggalAkhir);

	// Menghitung selisih tahun dan bulan
	let tahunSelisih = tAkhir.getFullYear() - tAwal.getFullYear();
	let bulanSelisih = tAkhir.getMonth() - tAwal.getMonth();
	let hariSelisih = tAkhir.getDate() - tAwal.getDate();

	// Jika selisih bulan negatif, berarti harus pinjam bulan dari tahun sebelumnya
	if (bulanSelisih < 0) {
		bulanSelisih += 12;
		tahunSelisih--;
	}

	// Jika selisih hari negatif, kita pinjam hari dari bulan sebelumnya
	if (hariSelisih < 0) {
		// Mengurangi bulan
		bulanSelisih--;
		// Mendapatkan jumlah hari di bulan sebelumnya
		const bulanSebelumnya = (tAkhir.getMonth() - 1 + 12) % 12;
		const hariDalamBulanSebelumnya = new Date(
			tAkhir.getFullYear(),
			bulanSebelumnya + 1,
			0,
		).getDate();
		hariSelisih += hariDalamBulanSebelumnya;
	}

	// Total bulan termasuk dari selisih tahun
	const totalBulan = tahunSelisih * 12 + bulanSelisih;

	return { bulan: totalBulan, hari: hariSelisih };
};

export const hitungUmur = (tanggalAwal: string, tanggalAkhir: string) => {
	if (!tanggalAwal || !tanggalAkhir) return 0;
	const date1 = new Date(tanggalAwal);
	const date2 = new Date(tanggalAkhir);
	const timeDiff = date2.getTime() - date1.getTime();
	const age = Math.floor(timeDiff / (1000 * 3600 * 24) / 365);
	return age;
};

export const getTanggalRangeList = (
	tanggalAwalDate: Date,
	tanggalAkhirDate: Date,
): string[] => {
	const tanggalRangeList = [];
	const currentDate = new Date(tanggalAwalDate);
	while (currentDate <= tanggalAkhirDate) {
		tanggalRangeList.push(currentDate.toISOString().split("T")[0].toString());
		currentDate.setDate(currentDate.getDate() + 1);
	}
	return tanggalRangeList;
};
