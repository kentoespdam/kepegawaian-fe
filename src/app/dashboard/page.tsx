import type { PegawaiDetail } from "@_types/pegawai";
import DashboardPanelKananComponent from "@components/dashboard/pegawai/kanan";
import DashboardPanelKiriComponent from "@components/dashboard/pegawai/kiri";
import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from "@components/ui/resizable";
import { getDataById } from "@helpers/action";
import { getCurrentUser } from "@lib/appwrite/user";

export const metadata = { title: "Dashboard Pegawai" };
const DashboardPage = async () => {
	const user = await getCurrentUser();
	const pegawai = await getDataById<PegawaiDetail>({
		path: "pegawai",
		id: user.$id,
		isRoot: true,
	});
	return (
		<div className="grid gap-2">
			<h2 className="text-2xl font-semibold">{metadata.title}</h2>
			<ResizablePanelGroup
				direction="horizontal"
				className="w-full rounded-lg border"
			>
				<ResizablePanel defaultSize={30}>
					<DashboardPanelKiriComponent pegawai={pegawai} />
				</ResizablePanel>
				<ResizableHandle withHandle />
				<ResizablePanel>
					<DashboardPanelKananComponent pegawai={pegawai} />
				</ResizablePanel>
			</ResizablePanelGroup>
		</div>
	);
};

export default DashboardPage;
