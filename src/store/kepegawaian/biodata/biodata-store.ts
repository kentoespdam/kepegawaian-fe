import { getDataById } from "@helpers/action";
import { useQuery } from "@tanstack/react-query";

export const useBiodataQuery = <Biodata>(nik: string) => {
	const { data, isFetching, isLoading, isError } = useQuery({
		queryKey: ["biodata", nik],
		queryFn: async () =>
			getDataById<Biodata>({
				path: "profil/biodata",
				id: nik,
				isRoot: true,
			}),
		enabled: !!nik,
	});

	return {
		data,
		isFetching,
		isLoading,
		isError,
	};
};
