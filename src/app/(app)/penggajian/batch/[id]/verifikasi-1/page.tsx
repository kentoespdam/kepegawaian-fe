import { getAccountSession, hasPermission, PERMISSION, verifySession } from "@/lib/auth";
import { forbidden } from "@/lib/auth/can";
import { Verifikasi1Client } from "./verifikasi-1-client";

export default async function Verifikasi1Page() {
	const [, { permissions }] = await Promise.all([verifySession(), getAccountSession()]);

	if (!hasPermission(permissions, PERMISSION.PENGGAJIAN_VERIFY1)) forbidden();

	return <Verifikasi1Client />;
}
