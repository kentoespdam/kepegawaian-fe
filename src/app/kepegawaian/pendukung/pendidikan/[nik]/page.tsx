import type { Biodata } from "@_types/profil/biodata";
import { getDataById } from "@helpers/action";
import AddProfilPendidikanButton from "./add-button";
import PendukungPendidikanContentComponent from "./content";

export const metadata = {
	title: "Data Pendidikan",
};
const PendukungPage = async ({ params }: { params: { nik: string } }) => {
	const biodata = await getDataById<Biodata>({
		path: "profil/biodata",
		id: params.nik,
		isRoot: true,
	});

	return (
		<div className="border-t border-r border-b gap-0">
			<div className="grid">
				<header className="flex justify-between h-10 items-center border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
					<span className="text-md font-semibold">{metadata.title}</span>
					<AddProfilPendidikanButton biodata={biodata} />
				</header>
				<main className="flex flex-1 flex-col lg:gap-6 lg:p-6">
					<div className="grid flex-1" x-chunk="dashboard-02-chunk-1">
						<PendukungPendidikanContentComponent
							nik={params.nik}
							biodata={biodata}
						/>
					</div>
				</main>
			</div>
		</div>
	);
};

export default PendukungPage;
