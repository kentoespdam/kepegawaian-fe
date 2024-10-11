import type { Pageable } from "@_types/index";
import Sqids from "sqids";

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

const rndNum = () => Math.floor(Math.random() * 101);

/**
 * Generates an iterated number from Pageable.
 * @param data The Pageable object.
 * @returns The iterated number.
 */
export const getUrut = (data: Pageable<unknown>): number =>
	data.first ? 1 : data.number * data.size + 1;

const sqids = new Sqids({
	minLength: 16,
});

/**
 * Encodes an ID into a string using the Sqids library.
 * @param id The number to be encoded.
 * @returns The encoded string.
 */
export const encodeId = (id: number): string => {
	const arr = [rndNum(), rndNum(), rndNum(), rndNum(), rndNum(), id];
	console.log(arr);
	return sqids.encode(arr);
};

export const decodeId = (id: string) => {
	const arr = sqids.decode(id);
	console.log(arr);
	return arr[5];
};
