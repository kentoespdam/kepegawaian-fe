"use client";
import type { Pegawai } from "@_types/pegawai";
import { getDataById } from "@helpers/action";
import type { ChildrenNode } from "@lib/index";
import { useRiwayatMutasiStore } from "@store/kepegawaian/detail/riwayat_mutasi";
import { useQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";

const AddMutasiTemplate = ({ children }: ChildrenNode) => {
	const pathname = usePathname();
	const pegawaiId = pathname.split("/kepegawaian/mutasi/add/").slice(-1)[0];

	const { setDefaultValues } = useRiwayatMutasiStore((state) => ({
		setDefaultValues: state.setDefaultValues,
	}));

	const query = useQuery({
		queryKey: ["pegawai", pegawaiId],
		queryFn: async () => {
			const result = await getDataById<Pegawai>({
				path: "pegawai",
				id: pegawaiId,
				isRoot: true,
			});
			setDefaultValues(result);
			return result;
		},
		enabled: !!pegawaiId,
	});

	if (query.isLoading) {
		return <div>Loading...</div>;
	}

	return <>{children}</>;
};

export default AddMutasiTemplate;
