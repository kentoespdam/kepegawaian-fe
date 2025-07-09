"use client";

import type { CutiKuotaSisa } from "@_types/cuti/kuota";
import { globalGetDataEnc } from "@helpers/action";
import { encodeString } from "@helpers/number";
import { type QueryKey, useQuery } from "@tanstack/react-query";

const SisaCutiComponent = ({ qKey }: { qKey: QueryKey }) => {
	const path = `cuti/kuota/${qKey[1]}/${qKey[2]}/sisa`;
	const { data, isLoading, isFetching } = useQuery({
		queryKey: qKey,
		queryFn: async () =>
			await globalGetDataEnc<CutiKuotaSisa>({
				path: encodeString(path),
				isRoot: true,
			}),
	});
	return (
		<div className="mb-4">
			{isLoading || isFetching ? (
				<div>Loading...</div>
			) : (
				<code className="text-sm h-fit font-bold border p-2 rounded bg-muted">
					Sisa Cuti Tahun ini:{" "}
					<span className="text-destructive">{data?.sisaCutiTahunIni} hari</span>,
					Tahun lalu:{" "}
					<span className="text-destructive">{data?.sisaCutiTahunLalu} hari</span>
				</code>
			)}
		</div>
	);
};

export default SisaCutiComponent;
