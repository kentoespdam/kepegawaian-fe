import type { Metadata } from "next";
import { KpiClient } from "./kpi-client";

export const metadata: Metadata = {
	title: "00. Input Data KPI | Kepegawaian",
};

export default function KpiPage() {
	return <KpiClient />;
}
