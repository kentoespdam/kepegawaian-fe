import { redirect } from "next/navigation";
import { forbidden, getAccountSession, hasPermission, PERMISSION, verifySession } from "@/lib/auth";

export default async function PendukungRootPage({ params }: { params: Promise<{ pegawaiId: string }> }) {
	const [, { permissions }] = await Promise.all([verifySession(), getAccountSession()]);
	if (!hasPermission(permissions, PERMISSION.PEGAWAI_READ)) forbidden();
	const { pegawaiId } = await params;
	redirect(`/kepegawaian/data/${pegawaiId}/pendukung/pendidikan`);
}
