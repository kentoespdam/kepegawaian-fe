"use client";
import { getDataById } from "@helpers/action";
import type { ChildrenNode } from "@lib/index";
import { useQueries, useQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";

const DetailPegawaiTemplate = ({ children }: ChildrenNode) => {
	const path = usePathname();
	const pathArray = path?.split("/");
	useQueries({
		queries: [
			{
				queryKey: ["pegawai", pathArray[pathArray.length - 1]],
				queryFn: async () =>
					await getDataById({
						path: "pegawai",
						id: pathArray[pathArray.length - 1],
						isRoot: true,
					}),
				enabled: !!pathArray[pathArray.length - 1],
			},
		],
	});
	return <>{children}</>;
};

export default DetailPegawaiTemplate;
