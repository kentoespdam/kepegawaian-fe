import { getDataByIdEnc } from "@helpers/action";
import { encodeString } from "@helpers/number";
import { useQuery } from "@tanstack/react-query";

export const useBiodataQuery = <Biodata>(nik: string) => {
	const { data, isFetching, isLoading, isError } = useQuery({
		queryKey: ["biodata", nik],
		queryFn: async () =>
			getDataByIdEnc<Biodata>({
				path: encodeString("profil/biodata"),
				id: encodeString(nik),
				isRoot: true,
				isString: true,
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
