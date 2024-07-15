"use client";
import { IMAGE_TYPE, PDF_TYPE } from "@_types/index";
import ViewImageComponent from "@components/kepegawaian/lampiran/view/image";
import ViewPdfComponent from "@components/kepegawaian/lampiran/view/pdf";
import { useQuery } from "@tanstack/react-query";
import { type LampiranFile, getFile } from "../../action";

export interface LampiranProfilContentProps {
	type: string;
	id: number;
}

const LampiranProfilContent = (props: LampiranProfilContentProps) => {
	const query = useQuery<LampiranFile>({
		queryKey: ["lampiran-profil", props.type, props.id],
		queryFn: async () => {
			return await getFile(props.type, props.id);
		},
	});

	if (query.isLoading) return <div>Loading...</div>;
	if (query.isError) return <div>Error</div>;
	if (!query.data) return <div>No Data</div>;

	if (PDF_TYPE.includes(query.data.type))
		return <ViewPdfComponent {...query.data} />;

	if (IMAGE_TYPE.includes(query.data.type))
		return <ViewImageComponent {...query.data} />;

	// return query.data
	
	return <div>{query.data.type}</div>;
};

export default LampiranProfilContent;
