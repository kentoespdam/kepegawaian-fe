"use client";

import type { PegawaiDetail } from "@_types/pegawai";
import TooltipBuilder from "@components/builder/tooltip";
import EditProfilPribadiFormComponent from "@components/kepegawaian/data_pegawai/profil/pribadi";
import { Accordion } from "@components/ui/accordion";
import { Button } from "@components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card";
import { useProfilPribadiStore } from "@store/kepegawaian/profil/pribadi";
import { EditIcon, RefreshCwIcon, UserIcon } from "lucide-react";
import KiriDataKepegawaian from "./data.kepegawaian";
import KiriDataPribadi from "./data.pribadi";

type DashboardPanelKiriComponentProps = {
	pegawai: PegawaiDetail;
};
const DashboardPanelKiriComponent = ({
	pegawai,
}: DashboardPanelKiriComponentProps) => {
	const { open, setOpen } = useProfilPribadiStore((state) => ({
		open: state.open,
		setOpen: state.setOpen,
	}));

	return (
		<Card className="border-none rounded-none">
			<CardHeader className="border-b bg-warning text-warning-foreground p-2">
				<CardTitle className="flex items-center justify-between gap-2">
					<div className="flex items-center gap-2">
						<UserIcon className="size-4" />
						<span>Profil Karyawan</span>
					</div>
					<div className="flex items-center gap-2">
						<TooltipBuilder
							text="Ubah Data"
							delayDuration={0}
							className="bg-info text-info-foreground"
						>
							<Button
								className="m-0 flex items-center gap-2 bg-info text-info-foreground size-6"
								size="icon"
								onClick={() => setOpen(true)}
							>
								<EditIcon className="size-4" />
							</Button>
						</TooltipBuilder>
						<TooltipBuilder
							text="Refresh"
							delayDuration={0}
							className="bg-destructive text-destructive-foreground"
						>
							<Button
								className="m-0 flex items-center gap-2 bg-destructive text-destructive-foreground size-6"
								size="icon"
							>
								<RefreshCwIcon className="size-4" />
							</Button>
						</TooltipBuilder>
					</div>
				</CardTitle>
			</CardHeader>
			<CardContent className="px-0 h-auto">
				<Accordion type="single" collapsible defaultValue="data-pribadi">
					<KiriDataPribadi pegawai={pegawai} />
					<KiriDataKepegawaian pegawai={pegawai} />
				</Accordion>
			</CardContent>
			<EditProfilPribadiFormComponent
				open={open}
				pegawai={pegawai}
				isUser={true}
			/>
		</Card>
	);
};

export default DashboardPanelKiriComponent;
