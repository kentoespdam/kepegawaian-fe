import { verifySession } from "@/lib/auth";
import { SettingClient } from "./setting-client";

export default async function SettingPage() {
	await verifySession();

	return <SettingClient />;
}
