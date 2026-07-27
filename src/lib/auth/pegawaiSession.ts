import { cookies } from "next/headers";
import { cache } from "react";
import type { AppwriteUser } from "@/types/auth";
import type { PegawaiResponseDetail } from "@/types/pegawai/pegawai";
import { readSession, resolveToken } from "./appwriteSession";
import { verifySession } from "./verifySession";

const BACKEND_URL = process.env.BACKEND_URL ?? "";

export interface PegawaiSession {
	user: AppwriteUser;
	pegawai: PegawaiResponseDetail | null;
	nipam: string | null;
	nik: string | null;
}

export const getPegawaiSession = cache(async (): Promise<PegawaiSession> => {
	const user = await verifySession();
	try {
		const cookieStore = await cookies();
		const session = readSession((name) => cookieStore.get(name)?.value);
		// ponytail: cold path mint can't persist cookie in server component —
		// next client-side fetch (/api/proxy/* via useQuery) refreshes the cookie
		// almost immediately after render; mintCache TTL 5s dedups bursts.
		const jwt = await resolveToken((name) => cookieStore.get(name)?.value, session);
		if (!jwt) {
			return { user, pegawai: null, nipam: null, nik: null };
		}

		const res = await fetch(`${BACKEND_URL}/pegawai/${user.$id}`, {
			headers: { Authorization: `Bearer ${jwt}` },
		});
		if (res.status === 404 || !res.ok) {
			return { user, pegawai: null, nipam: null, nik: null };
		}
		const body = (await res.json()) as { data: PegawaiResponseDetail };
		const pegawai = body.data;
		return {
			user,
			pegawai,
			nipam: pegawai?.nipam ?? null,
			nik: pegawai?.biodata?.nik ?? null,
		};
	} catch {
		return { user, pegawai: null, nipam: null, nik: null };
	}
});
