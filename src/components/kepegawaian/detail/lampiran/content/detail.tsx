"use client";
import { IMAGE_TYPE, PDF_TYPE } from "@_types/index";
import type { LampiranFile } from "@app/kepegawaian/profil/lampiran/action";
import ViewImageComponent from "@components/kepegawaian/lampiran/view/image";
import ViewPdfComponent from "@components/kepegawaian/lampiran/view/pdf";
import { useQuery } from "@tanstack/react-query";
import { RefreshCcwIcon } from "lucide-react";
import { getFile } from "../action";

type LampiranSkDetailComponentProps = {
	id: number;
	jenisSk: string;
};
const LampiranSkDetailComponent = ({
	id,
	jenisSk,
}: LampiranSkDetailComponentProps) => {
	const query = useQuery<LampiranFile>({
		queryKey: ["lampiran-sk", jenisSk, id],
		queryFn: async () => await getFile(jenisSk, id),
	});

	if (query.isLoading)
		return (
			<div className="w-full flex gap-1 justify-center items-center animate-pulse">
				<RefreshCcwIcon className="animate-spin h-5 w-5" />
				<span>Loading ...</span>
			</div>
		);
	if (query.isError)
		return (
			<div className="w-full text-center text-destructive font-bold">
				{query.error.message}
			</div>
		);
	if (!query.data) return <div>No Data</div>;

	if (PDF_TYPE.includes(query.data.type))
		return <ViewPdfComponent {...query.data} />;

	if (IMAGE_TYPE.includes(query.data.type))
		return <ViewImageComponent {...query.data} />;

	return <div>{query.data.type}</div>;
};

export default LampiranSkDetailComponent;
