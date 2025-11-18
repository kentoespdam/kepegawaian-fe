"use server";
import type { JenisLampiranProfil } from "@_types/enums/jenisl_lampiran_profil";
import type { BaseDelete, BaseResult, Pageable } from "@_types/index";
import { API_URL } from "@lib/utils";
import { cookies } from "next/headers";
import { setAuthorizeHeader } from ".";
import { decodeId, decodeString } from "./number";

export interface baseProps {
	path: string;
	isRoot?: boolean;
	retry?: number;
}
interface getDataProps extends baseProps {
	searchParams?: string;
}

// Constants
const DEFAULT_TIMEOUT = 5000;
const MAX_RETRIES = 3;
const RETRYABLE_STATUS = 401;

// Common configuration
const commonFetchConfig: RequestInit = {
	cache: "no-cache",
};

// Utility functions
const getBasePath = (isRoot?: boolean): string => {
	return isRoot ? API_URL : `${API_URL}/master`;
};

const normalizePath = (path: string): string => {
	return path.replace("_", "-");
};

const buildUrl = (
	basePath: string,
	path: string,
	searchParams?: string,
	normalize: boolean = true,
): string => {
	const normalizedPath = normalize ? normalizePath(path) : path;
	return searchParams
		? `${basePath}/${normalizedPath}?${searchParams}`
		: `${basePath}/${normalizedPath}`;
};
const buildUrlWithId = (
	basePath: string,
	path: string,
	id: string | number,
	normalize: boolean = true,
): string => {
	const normalizedPath = normalize ? normalizePath(path) : path;
	return `${basePath}/${normalizedPath}/${id}`;
};

const fetchWithTimeoutAndRetry = async <T>(
	url: string,
	options: RequestInit & {
		timeout?: number;
		maxRetries?: number;
		retryCount?: number;
	} = {},
): Promise<T> => {
	const {
		timeout = DEFAULT_TIMEOUT,
		maxRetries = MAX_RETRIES,
		retryCount = 0,
		...fetchOptions
	} = options;

	const controller = new AbortController();
	const timeoutId = setTimeout(() => controller.abort(), timeout);

	try {
		const headers = setAuthorizeHeader(cookies());
		const response = await fetch(url, {
			...fetchOptions,
			headers,
			signal: controller.signal,
			...commonFetchConfig,
		});

		if (!response.ok) {
			const error = new Error(
				`HTTP error! status: ${response.status}`,
			) as unknown as BaseResult<T>;
			error.status = response.status;
			throw error;
		}

		const result: BaseResult<T> = await response.json();
		return result.data;
	} catch (err: unknown) {
		const error = err as BaseResult<T>;
		if (error.status === RETRYABLE_STATUS && retryCount < maxRetries) {
			return fetchWithTimeoutAndRetry<T>(url, {
				...options,
				retryCount: retryCount + 1,
			});
		}

		// Re-throw the error for the caller to handle
		throw error;
	} finally {
		clearTimeout(timeoutId);
	}
};

export const globalGetData = async <TData>(
	props: getDataProps,
): Promise<TData> => {
	const requestUrl = buildUrl(API_URL, props.path, props.searchParams, false);
	return fetchWithTimeoutAndRetry<TData>(requestUrl, {
		method: "GET",
	});
};

export const globalGetDataEnc = async <TData>(
	props: getDataProps,
): Promise<TData> => {
	const decPath = decodeString(props.path);
	const requestUrl = buildUrl(API_URL, decPath, props.searchParams, false);
	return fetchWithTimeoutAndRetry<TData>(requestUrl, {
		method: "GET",
	});
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
	const basePath = getBasePath(props.isRoot);
	const url = buildUrl(basePath, props.path, props.searchParams);
	return fetchWithTimeoutAndRetry<Pageable<TData>>(url, {
		method: "GET",
		retryCount: props.retry ?? 0,
	});
};

export const getPageDataEnc = async <TData>(
	props: getDataProps,
): Promise<Pageable<TData>> => {
	const basePath = getBasePath(props.isRoot);
	const decPath = decodeString(props.path);
	const url = buildUrl(basePath, decPath, props.searchParams);
	return fetchWithTimeoutAndRetry<Pageable<TData>>(url, {
		method: "GET",
		retryCount: props.retry ?? 0,
	});
};

interface getByIdProps extends baseProps {
	id: number | string;
}
/**
 * Retrieves data for a specific master record by id.
 * @param {getByIdProps} props - The URL path and id for the master record.
 * @returns {Promise} A Promise that resolves to the specified master record data.
 * @throws {Error} An error if the API request is unsuccessful.
 */
export const getDataById = async <TData>(
	props: getByIdProps,
): Promise<TData> => {
	const basePath = getBasePath(props.isRoot);
	const url = buildUrlWithId(basePath, props.path, props.id);
	return fetchWithTimeoutAndRetry<TData>(url, {
		method: "GET",
	});
};

type getByIdEncProps = {
	isString?: boolean;
} & getByIdProps;
export const getDataByIdEnc = async <TData>({
	isString = false,
	...props
}: getByIdEncProps): Promise<TData> => {
	const decPath = decodeString(props.path);
	const decId = isString
		? decodeString(props.id as string)
		: decodeId(props.id as string);
	const basePath = getBasePath(props.isRoot);
	const url = buildUrlWithId(basePath, decPath, decId);
	return fetchWithTimeoutAndRetry<TData>(url, {
		method: "GET",
	});
};

interface getMasterListProps extends baseProps {
	isMaster?: boolean;
	subPath?: string;
	searchParams?: string;
}

const buildListUrl = (props: getMasterListProps): string => {
	const basePath = getBasePath(props.isRoot);

	if (props.subPath) {
		return `${basePath}/${normalizePath(props.path)}/${props.subPath}?${props.searchParams ?? ""}`;
	}

	return `${basePath}/${normalizePath(props.path)}/list?${props.searchParams ?? ""}`;
};


/**
 * Retrieves data for a pageable list of TData.
 * @param props - The URL path and search parameters for filtering the data.
 * @returns A Promise that resolves to a Pageable<TData> object containing the data.
 * @throws An error if the API request is unsuccessful.
 */
export const getListData = async <TData>(
	props: getMasterListProps,
): Promise<TData[]> => {
	const url = buildListUrl(props)
	return fetchWithTimeoutAndRetry<TData[]>(url, {
		method: "GET",
	})

};

export const getListDataEnc = async <TData>(
	props: getMasterListProps,
): Promise<TData[]> => {
	const decPath = decodeString(props.path)
	const decSubPath = props.subPath ? decodeString(props.subPath) : ""
	
	const basePath = getBasePath(props.isRoot)
	const url = props.subPath
		? `${basePath}/${normalizePath(decPath)}/${decSubPath}?${props.searchParams ?? ""}`
		: `${basePath}/${normalizePath(decPath)}/list?${props.searchParams ?? ""}`

	return fetchWithTimeoutAndRetry<TData[]>(url, {
		method: "GET",
	})

};

interface acceptLampiranProfilDataProps extends baseProps {
	data: { id: number; ref: JenisLampiranProfil; refId: number };
}
export const acceptLampiranProfilData = async (
	props: acceptLampiranProfilDataProps,
) => {
	const url = `${API_URL}/${props.path}`
	return fetchWithTimeoutAndRetry(url, {
		method: "POST",
		body: JSON.stringify(props.data),
	})
};

interface globalDeleteDataProps extends baseProps {
	formData: BaseDelete;
}

const validateDeleteData = (
	formData: BaseDelete,
): {
	isValid: boolean;
	uniqueId?: number;
	error?: { status: number; statusText: string; errors: string };
} => {
	const unique = formData.unique as string;
	const uniqueId = decodeId(unique) as number;
	const id = Number(formData.id.split("-")[1]);

	if (id !== uniqueId) {
		return {
			isValid: false,
			error: {
				status: 400,
				statusText: "Bad Request",
				errors: "invalid data",
			},
		};
	}

	return { isValid: true, uniqueId };
};

/**
 * Deletes a data record by id.
 * @param props - The URL path and id for the data record to delete.
 * @returns A Promise that resolves to the deleted data record.
 **/
export const globalDeleteData = async (props: globalDeleteDataProps) => {
	const validation = validateDeleteData(props.formData)
	if (!validation.isValid) return validation.error

	const url = buildUrlWithId(API_URL, props.path, Number(validation.uniqueId));
	return fetchWithTimeoutAndRetry(url, {
		method: "DELETE",
	})

};

export const globalDeleteDataEnc = async (props: globalDeleteDataProps) => {
	const validation = validateDeleteData(props.formData);
	if (!validation.isValid) return validation.error;

	const decPath = decodeString(props.path);
	const url = buildUrlWithId(API_URL, decPath, Number(validation.uniqueId));
	return fetchWithTimeoutAndRetry(url, {
		method: "DELETE",
	});
};
