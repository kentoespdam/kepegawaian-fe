import { verifySession } from "@/lib/auth";
import { ParameterSettingClient } from "./parameter-setting-client";

export default async function ParameterSettingPage() {
	await verifySession();

	return <ParameterSettingClient />;
}
