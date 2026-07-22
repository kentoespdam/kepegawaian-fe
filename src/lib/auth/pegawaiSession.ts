import { cache } from "react";
import type { AppwriteUser } from "@/types/auth";
import type { PegawaiResponseDetail } from "@/types/pegawai/pegawai";
import { verifySession } from "./verifySession";

export interface PegawaiSession {
	user: AppwriteUser;
	pegawai: PegawaiResponseDetail | null;
	nipam: string | null;
	nik: string | null;
}

export const getPegawaiSession = cache(async (): Promise<PegawaiSession> => {
	const user = await verifySession();
	try {
		const res = await fetch(`/api/proxy/pegawai/${user.$id}`);
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
