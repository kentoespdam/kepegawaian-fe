import type { Pageable } from "@_types/index";

export const rupiah = (rp: number, fraction?: number) =>
	new Intl.NumberFormat("id-ID", {
		style: "currency",
		currency: "IDR",
		maximumFractionDigits: 0 || fraction,
	}).format(rp);

export const isDecimal = (nilai: number) => nilai % 1 !== 0;

export const getUrut = (data: Pageable<unknown>) => {
	return data.first ? 1 : Math.ceil(data.totalPages / data.number) + 1;
};
