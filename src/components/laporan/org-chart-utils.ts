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
	const bgHeader = isVacant ? "#fed7aa" : "#bae6fd";
	const borderCol = isVacant ? "#f97316" : "#0284c7";
	const namaJabatan = escapeHtml(nodeData.namaJabatan ?? "-");
	const namaPegawai = escapeHtml(nodeData.namaPegawai ?? "-");
	const nipam = escapeHtml(nodeData.nipam ?? "-");
	const namaOrganisasi = escapeHtml(nodeData.namaOrganisasi ?? "");

	return `
		<div style="
			width: 100%;
			height: 100%;
			background-color: #ffffff;
			border: 2px solid ${borderCol};
			border-radius: 8px;
			box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);
			display: flex;
			flex-direction: column;
			overflow: hidden;
			font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
		">
			<div style="
				background-color: ${bgHeader};
				padding: 6px 8px;
				text-align: center;
				font-weight: 700;
				font-size: 13px;
				color: #0f172a;
				border-bottom: 1px solid rgba(0,0,0,0.08);
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
			" title="${namaJabatan}">
				${namaJabatan}
			</div>
			<div style="
				flex: 1;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				padding: 6px 8px;
				text-align: center;
				background-color: #ffffff;
			">
				${
					isVacant
						? `<span style="font-size: 12px; color: #ea580c; font-weight: 600; font-style: italic;">
							(Jabatan Lowong)
						</span>`
						: `<span style="font-size: 12px; font-weight: 700; color: #1e293b; max-width: 220px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;" title="${namaPegawai}">
							${namaPegawai}
						</span>
						<span style="font-size: 11px; font-weight: 500; color: #475569; margin-top: 2px; font-variant-numeric: tabular-nums;">
							NIPAM: ${nipam}
						</span>`
				}
				<span style="font-size: 10px; color: #64748b; margin-top: 2px; max-width: 220px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;" title="${namaOrganisasi}">
					${namaOrganisasi}
				</span>
			</div>
		</div>
	`;
}
