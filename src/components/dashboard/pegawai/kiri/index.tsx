"use client";

import type { PegawaiDetail } from "@_types/pegawai";
import { Accordion } from "@components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card";
import { UserIcon } from "lucide-react";
import KiriDataKepegawaian from "./data.kepegawaian";
import KiriDataPribadi from "./data.pribadi";

type DashboardPanelKiriComponentProps = {
	pegawai: PegawaiDetail;
};
const DashboardPanelKiriComponent = ({
	pegawai,
}: DashboardPanelKiriComponentProps) => {
	return (
		<Card className="border-none rounded-none">
			<CardHeader className="border-b bg-warning text-warning-foreground p-2">
				<CardTitle className="flex items-center justify-between gap-2">
					<div className="flex items-center gap-2">
						<UserIcon className="size-4" />
						<span>Profil Karyawan</span>
					</div>
				</CardTitle>
			</CardHeader>
			<CardContent className="px-0 h-auto">
				<Accordion type="single" collapsible defaultValue="data-pribadi">
					<KiriDataPribadi pegawai={pegawai} />
					<KiriDataKepegawaian pegawai={pegawai} />
				</Accordion>
			</CardContent>
		</Card>
	);
};

export default DashboardPanelKiriComponent;
