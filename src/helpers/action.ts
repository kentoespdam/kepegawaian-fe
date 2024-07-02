"use server";
import type { BaseResult, Pageable } from "@_types/index";
import { API_URL } from "@lib/utils";
import type { QueryKey } from "@tanstack/react-query";
import { cookies } from "next/headers";
import { setAuthorizeHeader } from ".";

export interface myQueryRequest {
	queryKey: QueryKey;
	meta: Record<string, unknown> | undefined;
	pageParam?: unknown;
	direction?: unknown;
}

interface baseProps {
	path: string;
	isRoot?: boolean;
	retry?: number;
}
interface getDataProps extends baseProps {
	searchParams?: string;
}
/**
 * Retrieves data for a pageable list of TData.
 * @param props - The URL path and search parameters for filtering the data.
 * @returns A Promise that resolves to a Pageable<TData> object containing the data.
 * @throws An error if the API request is unsuccessful.
 */
export const getPageData = async <TData>(
	props: getDataProps,
): Promise<Pageable<TData>> => {
	const controller = new AbortController();

	const basePath = props.isRoot ? API_URL : `${API_URL}/master`;
	const url = `${basePath}/${props.path.replace("_", "-")}?${props.searchParams}`;
	const headers = setAuthorizeHeader(cookies());
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
		if (error.status === 401 && retry < 3)
			return await getPageData({ ...props, retry: retry + 1 });

		throw new Error(error);
	} finally {
		clearTimeout(timeoutId);
	}
};

interface getByIdProps extends baseProps {
	id: number | string;
}
/**
 * Retrieves data for a specific master record by id.
 * @param props - The URL path and id for the master record.
 * @returns A Promise that resolves to the specified master record data.
 * @throws An error if the API request is unsuccessful.
 */
export const getDataById = async <TData>(
	props: getByIdProps,
): Promise<TData> => {
	const basePath = props.isRoot ? API_URL : `${API_URL}/master`;
	const url = `${basePath}/${props.path.replace("_", "-")}/${props.id}`;
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

		// if (!response.ok) throw new Error(await response.text());

		const result: BaseResult<TData> = await response.json();
		return result.data;
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	} catch (error: any) {
		if (error.status === 401 && retry < 3)
			return await getDataById({ ...props, retry: retry + 1 });
		console.error(error);
		throw error;
	} finally {
		clearTimeout(timeoutId);
	}
};

interface getMasterListProps extends baseProps {
	isMaster?: boolean;
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
	const basePath = props.isRoot ? API_URL : `${API_URL}/master`;
	const url = props.subPath
		? `${basePath}/${props.path}/${props.subPath}?${props.searchParams}`
		: `${basePath}/${props.path}/list?${props.searchParams}`;
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

		if (!response.ok) throw new Error(await response.text());

		const result: BaseResult<TData[]> = await response.json();
		return result.data;
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	} catch (error: any) {
		if (error.status === 401 && retry < 3)
			return await getMasterList({ ...props, retry: retry + 1 });
		console.error(error);
		throw error;
	} finally {
		clearTimeout(timeoutId);
	}
};
