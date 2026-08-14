"use client";

import { LampiranCard } from "@/components/lampiran-card";
import type { JenisSk } from "@/types/_shared";
import type { RiwayatSkQuery } from "@/types/kepegawaian/riwayat";

interface Props {
	selectedRow: RiwayatSkQuery | null;
	hideUpload?: boolean;
	hideDelete?: boolean;
}

export function SkLampiranCard({ selectedRow, hideUpload, hideDelete }: Props) {
	const ref = selectedRow?.jenisSk as JenisSk | undefined;
	const refId = selectedRow?.id;
	const skLabel = selectedRow?.nomorSk ?? "";

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
				hideUpload={hideUpload}
				hideDelete={hideDelete}
			/>
		</div>
	);
}
