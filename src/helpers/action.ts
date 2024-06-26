"use server";
import type { BaseResult, Pageable } from "@_types/index";
import { API_URL } from "@lib/utils";
import { cookies } from "next/headers";
import { setAuthorizeHeader } from ".";

interface baseProps {
	path: string;
}
interface getPageMasterDataProps extends baseProps {
	searchParams?: string;
	retry?: number;
}
/**
 * Retrieves data for a pageable list of TData.
 * @param props - The URL path and search parameters for filtering the data.
 * @returns A Promise that resolves to a Pageable<TData> object containing the data.
 * @throws An error if the API request is unsuccessful.
 */
export const getPageMasterData = async <TData>(
	props: getPageMasterDataProps,
): Promise<Pageable<TData>> => {
	const url = `${API_URL}/master/${props.path.replace("_", "-")}?${props.searchParams}`;
	const headers = setAuthorizeHeader(cookies());
	const controller = new AbortController();
	const timeoutId = setTimeout(() => controller.abort(), 5000);

	const retry = props.retry ?? 0;

	try {
		const response = await fetch(url, {
			method: "GET",
			headers,
			signal: controller.signal,
			cache: "no-cache",
		});
		if (!response.ok) {
			throw new Error(await response.text());
		}

		const result: BaseResult<Pageable<TData>> = await response.json();
		return result.data;
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	} catch (error: any) {
		if (error.status === 401)
			return await getPageMasterData({ ...props, retry: retry + 1 });
		console.error(error);
		return {
			content: [],
			totalPages: 0,
			totalElements: 0,
			last: true,
			size: 10,
			number: 0,
			sort: { sorted: false, unsorted: false, empty: true },
			numberOfElements: 0,
			first: true,
			empty: true,
		};
	} finally {
		clearTimeout(timeoutId);
	}
};

interface getMasterByIdProps extends baseProps {
	id: number;
}
/**
 * Retrieves data for a specific master record by id.
 * @param props - The URL path and id for the master record.
 * @returns A Promise that resolves to the specified master record data.
 * @throws An error if the API request is unsuccessful.
 */
export const getMasterById = async <TData>(
	props: getMasterByIdProps,
): Promise<TData> => {
	const url = `${API_URL}/master/${props.path.replace("_", "-")}/${props.id}`;
	const headers = setAuthorizeHeader(cookies());
	const controller = new AbortController();
	const timeoutId = setTimeout(() => controller.abort(), 5000);

	try {
		const response = await fetch(url, {
			method: "GET",
			headers,
			signal: controller.signal,
			cache: "no-cache",
		});
		if (!response.ok) {
			throw new Error(await response.text());
		}
		const result: BaseResult<TData> = await response.json();
		return result.data;
	} catch (error) {
		console.error(error);
		throw error;
	} finally {
		clearTimeout(timeoutId);
	}
};

interface getMasterListProps extends baseProps {
	subPath?: string;
	searchParams?: string;
}
/**
 * Retrieves data for a pageable list of TData.
 * @param props - The URL path and search parameters for filtering the data.
 * @returns A Promise that resolves to a Pageable<TData> object containing the data.
 * @throws An error if the API request is unsuccessful.
 */
export const getMasterList = async <TData>(
	props: getMasterListProps,
): Promise<TData[]> => {
	// revalidatePath(`/master/${props.path.replace("-", "_")}`);
	// revalidateTag(props.path.replace("-", "_"));
	const url = props.subPath
		? `${API_URL}/master/${props.path}/${props.subPath}?${props.searchParams}`
		: `${API_URL}/master/${props.path}/list?${props.searchParams}`;
	const headers = setAuthorizeHeader(cookies());
	const controller = new AbortController();
	const timeoutId = setTimeout(() => controller.abort(), 5000);

	try {
		const response = await fetch(url, {
			method: "GET",
			headers,
			signal: controller.signal,
			cache: "no-cache",
		});

		// if (!response.ok) {
		// 	throw new Error(await response.text());
		// }

		const result: BaseResult<TData[]> = await response.json();
		return result.data;
	} catch (error) {
		console.error(error);
		throw error;
	} finally {
		clearTimeout(timeoutId);
	}
};
