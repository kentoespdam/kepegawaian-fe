/**
 * Format angka ke mata uang Rupiah (Rp).
 *
 * @example
 *   rupiah(1_500_000)       → "Rp 1.500.000"
 *   rupiah(1_500_000, true) → "Rp 1.500.000,00"
 *   rupiah(undefined)       → "-"
 *   rupiah(0)               → "Rp 0"
 *
 * @param value  Nilai numerik (atau null/undefined).
 * @param cents  Tampilkan sen (2 desimal). Default `false`.
 */
export function rupiah(value: number | null | undefined, cents?: boolean): string {
	if (value == null) return "-";
	if (!Number.isFinite(value)) return "-";

	const fmt = new Intl.NumberFormat("id-ID", {
		style: "decimal",
		minimumFractionDigits: cents ? 2 : 0,
		maximumFractionDigits: cents ? 2 : 0,
	});

	return `Rp ${fmt.format(value)}`;
}

/**
 * Format Rupiah — default 0 untuk undefined (cocok untuk payroll di mana
 * nilai kosong = Rp 0, bukan "-").
 */
export function fmtRupiah(v: number | undefined): string {
	return rupiah(v ?? 0);
}
