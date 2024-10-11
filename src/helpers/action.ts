"use server";
import type { JenisLampiranProfil } from "@_types/enums/jenisl_lampiran_profil";
import type { BaseDelete, BaseResult, Pageable } from "@_types/index";
import { API_URL } from "@lib/utils";
import type { QueryKey } from "@tanstack/react-query";
import { cookies } from "next/headers";
import { setAuthorizeHeader } from ".";
import { decodeId } from "./number";

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

export const globalGetData = async <TData>(
	props: getDataProps,
): Promise<TData> => {
	// const controller = new AbortController();

	const basePath = props.isRoot ? API_URL : `${API_URL}`;
	const url = `${basePath}/${props.path}?${props.searchParams}`;
	const headers = setAuthorizeHeader(cookies());
	// const timeoutId = setTimeout(() => controller.abort(), 5000);

	const response = await fetch(url, {
		method: "GET",
		headers,
		// signal: controller.signal,
		cache: "no-cache",
	});

	const result: BaseResult<TData> = await response.json();
	// clearTimeout(timeoutId);
	return result.data;
};

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

		const json = await response.json();
		// console.log(json)

		const result: BaseResult<Pageable<TData>> = json;
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
export const getListData = async <TData>(
	props: getMasterListProps,
): Promise<TData[]> => {
	const basePath = props.isRoot ? API_URL : `${API_URL}/master`;
	const url = props.subPath
		? `${basePath}/${props.path.replace("_", "-")}/${props.subPath}?${props.searchParams}`
		: `${basePath}/${props.path.replace("_", "-")}/list?${props.searchParams}`;
	console.log(url);
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

		const result: BaseResult<TData[]> = await response.json();
		return result.data;
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	} catch (error: any) {
		console.error(error);
		throw error;
	} finally {
		clearTimeout(timeoutId);
	}
};

interface acceptLampiranProfilDataProps extends baseProps {
	data: { id: number; ref: JenisLampiranProfil; refId: number };
}
export const acceptLampiranProfilData = async (
	props: acceptLampiranProfilDataProps,
) => {
	const url = `${API_URL}/${props.path}`;

	const headers = setAuthorizeHeader(cookies());
	const controller = new AbortController();
	const timeoutId = setTimeout(() => controller.abort(), 5000);

	const response = await fetch(url, {
		method: "POST",
		headers,
		signal: controller.signal,
		cache: "no-cache",
		body: JSON.stringify(props.data),
	});

	clearTimeout(timeoutId);

	return await response.json();
};

interface globalDeleteDataProps extends baseProps {
	formData: BaseDelete;
}
/**
 * Deletes a data record by id.
 * @param props - The URL path and id for the data record to delete.
 * @returns A Promise that resolves to the deleted data record.
 **/
export const globalDeleteData = async (props: globalDeleteDataProps) => {
	const unique = props.formData.unique as string;
	const uniqueId = decodeId(unique) as number;

	const id = Number(props.formData.id.split("-")[1]);
	if (id !== uniqueId)
		return {
			status: 400,
			statusText: "Bad Request",
			errors: "invalid data",
		};

	const url = `${API_URL}/${props.path}/${uniqueId}`;
	const headers = setAuthorizeHeader(cookies());
	const controller = new AbortController();
	const timeoutId = setTimeout(() => controller.abort(), 5000);

	const response = await fetch(url, {
		method: "DELETE",
		headers,
		signal: controller.signal,
		cache: "no-cache",
	});

	const result = await response.json();
	clearTimeout(timeoutId);

	return result;
};
