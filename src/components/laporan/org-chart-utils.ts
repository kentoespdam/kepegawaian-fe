import type { SoResponse } from "@/types/laporan/kepegawaian";

export interface OrgChartNode extends SoResponse {
	_expanded?: boolean;
}

export type { ExportOptions } from "./org-chart-export";
export { downloadFile, exportHighDefChart } from "./org-chart-export";

export function escapeHtml(str: string | null | undefined): string {
	if (!str) return "";
	return str
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&#039;");
}

/**
 * Memastikan dataset hanya memuat node yang valid dan terhubung ke root node.
 * Mencegah fatal crash `Error: missing: <parentId>` dari d3.stratify jika terdapat
 * orphan nodes (jabatan yang atasan langsungnya tidak ada di database / terfilter).
 * Sekaligus menetapkan `_expanded: true` hingga level Supervisor (level <= 5).
 */
export function sanitizeOrgChartData(rawData: SoResponse[]): OrgChartNode[] {
	if (!rawData || rawData.length === 0) return [];

	const root = rawData.find((d) => d.parentId === null || d.parentId === undefined);
	if (!root || root.id === undefined) return [];

	const validIds = new Set<number>();
	validIds.add(root.id);

	let sizeBefore = 0;
	do {
		sizeBefore = validIds.size;
		for (const node of rawData) {
			if (node.id !== undefined && node.parentId !== null && node.parentId !== undefined) {
				if (validIds.has(node.parentId)) {
					validIds.add(node.id);
				}
			}
		}
	} while (validIds.size > sizeBefore);

	const validNodes: OrgChartNode[] = rawData
		.filter((node) => node.id !== undefined && validIds.has(node.id))
		.map((node) => ({
			...node,
			_expanded: node.level !== undefined && node.level <= 5,
		}));

	const excludedCount = rawData.length - validNodes.length;
	if (excludedCount > 0) {
		console.warn(
			`[OrgChart] Mengecualikan ${excludedCount} jabatan dengan relasi atasan tidak valid (orphan) agar pohon bagan utuh.`,
		);
	}

	return validNodes;
}

/**
 * Template HTML card untuk tiap node di bagan d3-org-chart
 */
export function renderNodeContent(nodeData: OrgChartNode): string {
	const isVacant = Boolean(nodeData.isLowong);
	const level = Math.max(1, Math.min(7, Math.floor(nodeData.level ?? 1)));
	const levelColor = `var(--org-level-${level}, var(--primary))`;
	const namaJabatan = escapeHtml(nodeData.namaJabatan ?? "-");
	const namaPegawai = escapeHtml(nodeData.namaPegawai ?? "-");
	const nipam = escapeHtml(nodeData.nipam ?? "-");
	const namaOrganisasi = escapeHtml(nodeData.namaOrganisasi ?? "");

	return `
		<div style="
			width: 100%;
			height: 100%;
			box-sizing: border-box;
			background-color: var(--card, white);
			border: 1px solid var(--border, lightgray);
			border-top: 6px solid ${levelColor};
			border-radius: 8px;
			display: flex;
			flex-direction: column;
			overflow: hidden;
			font-family: var(--font-sans, Arial, sans-serif);
		">
			<div style="
			background-color: var(--org-level-${level}-fill, color-mix(in oklch, ${levelColor} 36%, var(--card, white)));
			padding: 8px 16px;
				display: flex;
				flex-direction: column;
				gap: 4px;
				border-bottom: 1px solid var(--border, lightgray);
				height: 40px;
				box-sizing: border-box;
				flex-shrink: 0;
				overflow: hidden;
				align-items: center;
			">
				<span style="font-size: 16px; line-height: 20px; font-weight: 600; color: var(--foreground, black); display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 2; overflow: hidden;" title="${namaJabatan}">
					${namaJabatan}
				</span>
			</div>
			<div style="
				flex: 1;
				display: flex;
				flex-direction: column;
				justify-content: center;
				gap: 4px;
				padding: 12px 16px;
				min-height: 0;
			">
				${
					isVacant
						? `<span aria-label="Jabatan lowong" style="font-size: 16px; line-height: 24px; color: var(--muted-foreground, dimgray); font-weight: 500;">
							-
						</span>`
						: `<span style="font-size: 16px; line-height: 24px; font-weight: 500; color: var(--foreground, black); overflow: hidden; text-overflow: ellipsis; white-space: nowrap;" title="${namaPegawai}">
							${namaPegawai}
						</span>
						<span style="font-size: 14px; line-height: 16px; color: var(--muted-foreground, dimgray); font-variant-numeric: tabular-nums;">
							NIPAM ${nipam}
						</span>`
				}
				<span style="font-size: 14px; line-height: 16px; color: var(--muted-foreground, dimgray); overflow: hidden; text-overflow: ellipsis; white-space: nowrap;" title="${namaOrganisasi}">
					${namaOrganisasi}
				</span>
			</div>
		</div>
	`;
}
