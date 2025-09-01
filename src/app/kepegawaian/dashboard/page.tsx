import type { PegawaiDetail } from "@_types/pegawai";
import DashboardPanelKananComponent from "@components/dashboard/pegawai/kanan";
import DashboardPanelKiriComponent from "@components/dashboard/pegawai/kiri";
import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from "@components/ui/resizable";
import { getDataByIdEnc } from "@helpers/action";
import { encodeString } from "@helpers/number";
import { getCurrentUser } from "@lib/appwrite/user";

export const metadata = { title: "Dashboard Pegawai" };
const DashboardPage = async () => {
	const user = await getCurrentUser();
	const pegawai = await getDataByIdEnc<PegawaiDetail>({
		path: encodeString("pegawai"),
		id: encodeString(user.$id),
		isRoot: true,
		isString: true,
	});
	return (
		<>
			<div className="grid gap-2">
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
			<div id="clone-gaji-content" className="p-4" />
		</>
	);
};

export default DashboardPage;
