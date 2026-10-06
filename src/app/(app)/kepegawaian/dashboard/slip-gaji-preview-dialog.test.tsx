/** @vitest-environment jsdom */
import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { SlipGajiPreviewDialog } from "./slip-gaji-preview-dialog";

// Mock dynamic import / PdfViewer
vi.mock("@/components/pdf-viewer", () => ({
	PdfViewer: ({ url, fileName }: { url: string; fileName: string }) => (
		<div data-testid="pdf-viewer" data-url={url} data-filename={fileName}>
			PDF Viewer Mock
		</div>
	),
}));

describe("SlipGajiPreviewDialog", () => {
	it("tidak merender dialog saat open = false", () => {
		render(<SlipGajiPreviewDialog open={false} onOpenChange={() => {}} batchMasterId={123} periode="2026-06" />);
		expect(screen.queryByText(/Pratinjau Slip Gaji/i)).not.toBeInTheDocument();
	});

	it("merender dialog dengan judul, periode terformat, dan PdfViewer saat open = true", async () => {
		render(<SlipGajiPreviewDialog open={true} onOpenChange={() => {}} batchMasterId={123} periode="2026-06" />);
		expect(screen.getByText(/Pratinjau Slip Gaji — Periode Juni 2026/i)).toBeInTheDocument();
		const viewer = await screen.findByTestId("pdf-viewer");
		expect(viewer).toBeInTheDocument();
		expect(viewer.getAttribute("data-url")).toBe("/api/proxy/penggajian/batch/master/123/slip-gaji");
		expect(viewer.getAttribute("data-filename")).toBe("slip-gaji-2026-06.pdf");
	});

	it("menampilkan pesan kosong saat batchMasterId null", () => {
		render(<SlipGajiPreviewDialog open={true} onOpenChange={() => {}} batchMasterId={null} periode="2026-06" />);
		expect(screen.getByText(/Tidak ada dokumen slip gaji untuk ditampilkan/i)).toBeInTheDocument();
	});
});
