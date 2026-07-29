"use client";

import { LampiranCard } from "@/components/lampiran-card";
import type { JenisSk } from "@/types/_shared";
import type { RiwayatMutasiQuery } from "@/types/kepegawaian/riwayat";

interface Props {
	selectedRow: RiwayatMutasiQuery | null;
}

export function MutasiLampiranCard({ selectedRow }: Props) {
	const ref = selectedRow?.skMutasi?.jenisSk as JenisSk | undefined;
	const refId = selectedRow?.skMutasi?.id;
	const skLabel = selectedRow?.skMutasi?.nomorSk ?? "";

	if (!ref || !refId) return null;

	return (
		<div className="mt-4">
			<LampiranCard
				title={skLabel ? `Lampiran — SK ${skLabel}` : "Lampiran"}
				ref={ref}
				refId={refId}
				queryKey={["lampiran"]}
				listUrl={`/api/proxy/kepegawaian/lampiran/list/${ref}/${refId}`}
				uploadUrl="/api/proxy/kepegawaian/lampiran"
				deleteUrl={(id) => `/api/proxy/kepegawaian/lampiran/${ref}/${refId}/${id}`}
				viewUrl={(id) => `/api/proxy/kepegawaian/lampiran/file/${ref}/${id}`}
			/>
		</div>
	);
}
