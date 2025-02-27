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
