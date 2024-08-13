import type { Pageable } from "@_types/index";

/**
 * Converts a number to a string representing the number in Indonesian Rupiah format.
 * @param rp The number to be converted.
 * @param fraction The number of decimal places to include in the formatted string. Optional.
 * @returns A string representing the number in Indonesian Rupiah format.
 */
export const rupiah = (rp: number, fraction?: number): string =>
	new Intl.NumberFormat("id-ID", {
		style: "currency",
		currency: "IDR",
		maximumFractionDigits: fraction || 0,
	}).format(rp);

/**
 * Checks if a number is a decimal.
 * @param nilai The number to be checked.
 * @returns True if the number is a decimal, false otherwise.
 */
export const isDecimal = (nilai: number) => nilai % 1 !== 0;

/**
 * Generates an iterated number from Pageable.
 * @param data The Pageable object.
 * @returns The iterated number.
 */
export const getUrut = (data: Pageable<unknown>): number =>
	data.first ? 1 : data.number * data.size + 1;
