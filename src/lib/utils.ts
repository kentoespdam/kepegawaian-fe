import { clsx, type ClassValue } from "clsx";
import Cryptr from "cryptr";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export const authHostname = process.env.NEXT_PUBLIC_APPWRITE_HOSTNAME || "";
export const baseAuthUrl = `${
	process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || ""
}/v1`;
export const authUrl = `${baseAuthUrl}/account/sessions/email`;
export const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || "";
export const appwriteKey = process.env.NEXT_PUBLIC_APPWRITE_API_KEY || "";
export const localAppUrl = `${process.env.PROTOCOL || "http"}://${
	process.env.APP_HOSTNAME
}:${process.env.PORT}`;

export const sessionNames = [
	`a_session_${projectId.toLowerCase()}`,
	`a_session_${projectId.toLowerCase()}_legacy`,
	`a_session_${projectId.toLowerCase()}_token`,
];

export const DEFAULT_MAIL_DOMAIN = process.env.DEFAULT_MAIL_DOMAIN || "";
export const AUTH_SECRET = process.env.AUTH_SECRET || "";

export const API_URL = process.env.NEXT_PUBLIC_API_URL || "";

export const cryptr = new Cryptr(`${process.env.AUTH_SECRET}`);

export const delay = (time = 1000) =>
	new Promise((resolve) => setTimeout(() => resolve(true), time));
