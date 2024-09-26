export const base64toBlob = (base64: string, mime: string) => {
	const byteCharacters = atob(base64);
	const byteNumbers = new Array(byteCharacters.length);
	for (let i = 0; i < byteCharacters.length; i++) {
		byteNumbers[i] = byteCharacters.charCodeAt(i);
	}
	const byteArray = new Uint8Array(byteNumbers);
	return new Blob([byteArray], { type: mime });
};

// change date format to indonesian ${hari}, ${tanggal} ${bulan} ${tahun}
export const dateToIndonesian = (date: string) => {
	const d = new Date(date);
	return `${d.toLocaleDateString("id-ID", {
		day: "numeric",
		month: "long",
		year: "numeric",
	})}`;
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
