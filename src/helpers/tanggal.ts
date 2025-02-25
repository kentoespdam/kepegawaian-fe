export const getNamaBulan = (bulan: number): string => {
	const namaBulan = [
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
	return namaBulan[bulan - 1];
};
