// @vitest-environment jsdom

/**
 * Unit test untuk PdfViewer component.
 *
 * Strategi mock:
 * - react-pdf (Document, Page) — dimock sebagai div sederhana
 * - fetch — di-spy via vi.spyOn + mockResolvedValue/RejectedValue
 * - ResizeObserver — tidak tersedia di jsdom, distub global
 * - URL.createObjectURL / revokeObjectURL — distub untuk verifikasi download
 */
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";

import { PdfViewer } from "./pdf-viewer";

// ─── Global mocks ──

const mockCreateObjectURL = vi.fn(() => "blob:mock-url");
const mockRevokeObjectURL = vi.fn();

const mockResizeObserver = vi.fn().mockImplementation(() => ({
	observe: vi.fn(),
	disconnect: vi.fn(),
	unobserve: vi.fn(),
}));

// react-pdf butuh canvas/Web Worker — mock sebagai div untuk tes state & interaksi
vi.mock("react-pdf", () => ({
	Document: ({
		children,
		onLoadSuccess,
		loading,
		error,
	}: {
		children: React.ReactNode;
		onLoadSuccess?: ({ numPages }: { numPages: number }) => void;
		loading: React.ReactNode;
		error: React.ReactNode;
	}) => {
		// Panggil callback onLoadSuccess untuk mensimulasikan load PDF
		// (hanya sekali, gunakan efek samping di mock)
		return (
			<div data-testid="pdf-document">
				{loading}
				{error}
				{children}
			</div>
		);
	},
	Page: ({ pageNumber, scale, width }: { pageNumber: number; scale?: number; width?: number }) => (
		<div
			data-testid="pdf-page"
			data-page-number={pageNumber}
			data-scale={scale === undefined ? "undefined" : String(scale)}
			data-width={width === undefined ? "undefined" : String(width)}
		/>
	),
	pdfjs: { GlobalWorkerOptions: { workerSrc: "" } },
}));

// ─── Helpers ──

const MOCK_PDF_BUFFER = new ArrayBuffer(8);

/** Spy fetch agar bisa di-mock via vi.mocked().mock*(). */
function spyFetch() {
	vi.spyOn(globalThis, "fetch");
}

function mockFetchSuccess() {
	vi.mocked(globalThis.fetch).mockResolvedValue(new Response(MOCK_PDF_BUFFER, { status: 200 }));
}

function mockFetchPending() {
	vi.mocked(globalThis.fetch).mockImplementation(() => new Promise(() => {}));
}

function mockFetchError() {
	vi.mocked(globalThis.fetch).mockRejectedValue(new Error("Gagal mengambil data"));
}

async function waitForPdfLoaded() {
	await waitFor(() => {
		expect(screen.getByTestId("pdf-document")).toBeInTheDocument();
	});
}

function registerCleanup() {
	beforeEach(() => {
		cleanup();
		document.body.innerHTML = "";
	});
}

// ─── Suite ──

describe("PdfViewer", () => {
	registerCleanup();

	beforeAll(() => {
		vi.stubGlobal("ResizeObserver", mockResizeObserver);
		vi.stubGlobal("URL", {
			...globalThis.URL,
			createObjectURL: mockCreateObjectURL,
			revokeObjectURL: mockRevokeObjectURL,
		});
	});

	afterAll(() => {
		vi.unstubAllGlobals();
	});

	beforeEach(() => {
		spyFetch();
	});

	afterEach(() => {
		vi.mocked(globalThis.fetch).mockRestore();
	});

	// ── Loading / Error ──────────────────────────────────────────────

	it("menampilkan loading state saat fetch PDF berlangsung", () => {
		mockFetchPending();
		const { container } = render(<PdfViewer url="/api/proxy/pdf/1" fileName="test.pdf" />);

		// loading state: spinner + belum ada toolbar
		// Catatan: .animate-spin adalah Tailwind class — fragile tapi Loader2 tidak punya role aksesibel
		expect(container.querySelector(".animate-spin")).toBeInTheDocument();
		expect(screen.queryByText("Auto")).not.toBeInTheDocument();
	});

	it("menampilkan error state saat fetch gagal", async () => {
		mockFetchError();
		render(<PdfViewer url="/api/proxy/pdf/1" fileName="test.pdf" />);
		await waitFor(() => {
			expect(screen.getByText(/Gagal mengambil data/i)).toBeInTheDocument();
		});
	});

	it("menampilkan tombol 'Buka di Tab Baru' pada error state", async () => {
		mockFetchError();
		render(<PdfViewer url="/api/proxy/pdf/1" fileName="test.pdf" />);
		await waitFor(() => {
			expect(screen.getByRole("button", { name: /Buka di Tab Baru/i })).toBeInTheDocument();
		});
	});

	// ── Render setelah loaded ────────────────────────────────────────

	it("menampilkan nama file di toolbar setelah PDF termuat", async () => {
		mockFetchSuccess();
		render(<PdfViewer url="/api/proxy/pdf/1" fileName="surat-sk.pdf" />);
		await waitForPdfLoaded();
		expect(screen.getByText(/surat-sk\.pdf/)).toBeInTheDocument();
	});

	it("menampilkan indikator 'Auto' saat fit-to-width aktif (default)", async () => {
		mockFetchSuccess();
		render(<PdfViewer url="/api/proxy/pdf/1" fileName="test.pdf" />);
		await waitForPdfLoaded();
		expect(screen.getByText("Auto")).toBeInTheDocument();
	});

	it("merender Page di dalam Document setelah loaded", async () => {
		mockFetchSuccess();
		render(<PdfViewer url="/api/proxy/pdf/1" fileName="test.pdf" />);
		await waitForPdfLoaded();
		expect(screen.getByTestId("pdf-page")).toBeInTheDocument();
	});

	// ── Zoom In ──────────────────────────────────────────────────────

	it("Zoom In: beralih ke manual dan menampilkan '125%'", async () => {
		mockFetchSuccess();
		const user = userEvent.setup();
		render(<PdfViewer url="/api/proxy/pdf/1" fileName="test.pdf" />);
		await waitForPdfLoaded();

		await user.click(screen.getByTitle("Perbesar"));
		expect(screen.getByText("125%")).toBeInTheDocument();
	});

	// ── Zoom Out ─────────────────────────────────────────────────────

	it("Zoom Out: beralih ke manual dan menampilkan '75%'", async () => {
		mockFetchSuccess();
		const user = userEvent.setup();
		render(<PdfViewer url="/api/proxy/pdf/1" fileName="test.pdf" />);
		await waitForPdfLoaded();

		await user.click(screen.getByTitle("Perkecil"));
		expect(screen.getByText("75%")).toBeInTheDocument();
	});

	// ── Fit to Width ─────────────────────────────────────────────────

	it("Fit to Width: kembali ke 'Auto' dari manual zoom", async () => {
		mockFetchSuccess();
		const user = userEvent.setup();
		render(<PdfViewer url="/api/proxy/pdf/1" fileName="test.pdf" />);
		await waitForPdfLoaded();

		await user.click(screen.getByTitle("Perbesar"));
		expect(screen.getByText("125%")).toBeInTheDocument();

		await user.click(screen.getByTitle("Sesuaikan lebar"));
		expect(screen.getByText("Auto")).toBeInTheDocument();
	});

	it("tombol Fit to Width aktif (bg-accent) saat dalam mode auto", async () => {
		mockFetchSuccess();
		render(<PdfViewer url="/api/proxy/pdf/1" fileName="test.pdf" />);
		await waitForPdfLoaded();

		const btn = screen.getByTitle("Sesuaikan lebar");
		expect(btn).toHaveClass("bg-accent");
	});

	it("tombol Fit to Width non-aktif saat dalam mode manual", async () => {
		mockFetchSuccess();
		const user = userEvent.setup();
		render(<PdfViewer url="/api/proxy/pdf/1" fileName="test.pdf" />);
		await waitForPdfLoaded();

		await user.click(screen.getByTitle("Perbesar")); // switch ke manual

		const btn = screen.getByTitle("Sesuaikan lebar");
		expect(btn).not.toHaveClass("bg-accent");
	});

	// ── Zoom bounds ──────────────────────────────────────────────────

	it("Zoom In disabled saat mencapai MAX scale (3.0)", async () => {
		mockFetchSuccess();
		const user = userEvent.setup();
		render(<PdfViewer url="/api/proxy/pdf/1" fileName="test.pdf" />);
		await waitForPdfLoaded();

		const zoomIn = screen.getByTitle("Perbesar");
		// Dari 1.0 ke 3.0 = 8 klik (@ 0.25 per klik)
		for (let i = 0; i < 8; i++) {
			await user.click(zoomIn);
		}
		expect(zoomIn).toBeDisabled();
	});

	it("Zoom Out disabled saat mencapai MIN scale (0.5)", async () => {
		mockFetchSuccess();
		const user = userEvent.setup();
		render(<PdfViewer url="/api/proxy/pdf/1" fileName="test.pdf" />);
		await waitForPdfLoaded();

		const zoomOut = screen.getByTitle("Perkecil");
		// Dari 1.0 ke 0.5 = 2 klik (@ 0.25 per klik)
		for (let i = 0; i < 2; i++) {
			await user.click(zoomOut);
		}
		expect(zoomOut).toBeDisabled();
	});

	it("Zoom In masih bisa diklik saat fit-to-width (switch ke manual)", async () => {
		mockFetchSuccess();
		const user = userEvent.setup();
		render(<PdfViewer url="/api/proxy/pdf/1" fileName="test.pdf" />);
		await waitForPdfLoaded();

		const zoomIn = screen.getByTitle("Perbesar");
		// fitToWidth=true → disabled={false} → button enabled
		expect(zoomIn).not.toBeDisabled();

		await user.click(zoomIn);
		expect(screen.getByText("125%")).toBeInTheDocument(); // beralih ke manual
	});

	// ── Download ─────────────────────────────────────────────────────

	it("Download: membuat Blob application/pdf dari pdfData", async () => {
		mockFetchSuccess();
		const user = userEvent.setup();
		render(<PdfViewer url="/api/proxy/pdf/1" fileName="surat-sk.pdf" />);
		await waitForPdfLoaded();

		await user.click(screen.getByTitle("Download PDF"));

		expect(mockCreateObjectURL).toHaveBeenCalledOnce();
		const blob = mockCreateObjectURL.mock.calls[0][0] as Blob;
		expect(blob).toBeInstanceOf(Blob);
		expect(blob.type).toBe("application/pdf");
	});

	it("Download: membuat anchor dengan download attribute sesuai fileName", async () => {
		mockFetchSuccess();
		const user = userEvent.setup();
		render(<PdfViewer url="/api/proxy/pdf/1" fileName="surat-sk.pdf" />);
		await waitForPdfLoaded();

		const createElementSpy = vi.spyOn(document, "createElement");
		await user.click(screen.getByTitle("Download PDF"));

		const anchor = createElementSpy.mock.results.find((r) => r.value instanceof HTMLAnchorElement)
			?.value as HTMLAnchorElement;
		expect(anchor).toBeDefined();
		expect(anchor.download).toBe("surat-sk.pdf");
		expect(anchor.href).toBe("blob:mock-url");

		createElementSpy.mockRestore();
	});

	it("Download: membersihkan blob URL setelah trigger", async () => {
		mockFetchSuccess();
		const user = userEvent.setup();
		render(<PdfViewer url="/api/proxy/pdf/1" fileName="test.pdf" />);
		await waitForPdfLoaded();

		await user.click(screen.getByTitle("Download PDF"));

		expect(mockRevokeObjectURL).toHaveBeenCalledWith("blob:mock-url");
	});

	// ── Page props ───────────────────────────────────────────────────

	it("Page tidak menerima scale saat fit-to-width aktif", async () => {
		mockFetchSuccess();
		render(<PdfViewer url="/api/proxy/pdf/1" fileName="test.pdf" />);
		await waitForPdfLoaded();

		const page = screen.getByTestId("pdf-page");
		expect(page).toHaveAttribute("data-scale", "undefined");
	});

	it("Page menerima scale sesuai nilai zoom saat manual", async () => {
		mockFetchSuccess();
		const user = userEvent.setup();
		render(<PdfViewer url="/api/proxy/pdf/1" fileName="test.pdf" />);
		await waitForPdfLoaded();

		await user.click(screen.getByTitle("Perbesar")); // scale → 1.25

		const page = screen.getByTestId("pdf-page");
		expect(page).toHaveAttribute("data-scale", "1.25");
	});

	it("Page kembali tanpa scale setelah fit-to-width diaktifkan", async () => {
		mockFetchSuccess();
		const user = userEvent.setup();
		render(<PdfViewer url="/api/proxy/pdf/1" fileName="test.pdf" />);
		await waitForPdfLoaded();

		await user.click(screen.getByTitle("Perbesar"));
		await user.click(screen.getByTitle("Sesuaikan lebar"));

		const page = screen.getByTestId("pdf-page");
		expect(page).toHaveAttribute("data-scale", "undefined");
	});

	it("Page menerima pageNumber sesuai state", async () => {
		mockFetchSuccess();
		render(<PdfViewer url="/api/proxy/pdf/1" fileName="test.pdf" />);
		await waitForPdfLoaded();

		const page = screen.getByTestId("pdf-page");
		expect(page).toHaveAttribute("data-page-number", "1");
	});
});
