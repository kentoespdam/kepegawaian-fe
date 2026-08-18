// @vitest-environment jsdom

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { KuotaImportDialog } from "./kuota-import-dialog";

let postInit: RequestInit | null = null;

function mockFetch() {
	vi.mocked(globalThis.fetch).mockImplementation(async (input: string | URL | Request, init?: RequestInit) => {
		const s = typeof input === "string" ? input : input instanceof Request ? input.url : String(input);
		if (s.includes("/cuti/kuota/import") && init?.method === "POST") {
			postInit = init;
			return new Response(JSON.stringify({ data: "Berhasil import 50 baris, 2 baris gagal" }), {
				status: 200,
				headers: { "Content-Type": "application/json" },
			});
		}
		if (s.includes("/cuti/kuota/template")) {
			return new Response(new Blob(["xlsx-bytes"]), { status: 200 });
		}
		return new Response(JSON.stringify({ data: [] }), { status: 200 });
	});
}

function renderDialog() {
	const qc = new QueryClient({ defaultOptions: { queries: { retry: false } } });
	return render(
		<QueryClientProvider client={qc}>
			<KuotaImportDialog open onOpenChange={vi.fn()} />
		</QueryClientProvider>,
	);
}

describe("KuotaImportDialog", () => {
	beforeEach(() => {
		cleanup();
		postInit = null;
		vi.clearAllMocks();
		vi.spyOn(globalThis, "fetch");
	});

	it("submit kirim multipart/form-data (tahun + file) dan summary tampil inline di dialog", async () => {
		mockFetch();
		renderDialog();

		// attach file via input (jsdom: upload via userEvent.upload)
		const file = new File(["baris,kuota"], "kuota.csv", { type: "text/csv" });
		const input = document.querySelector('input[type="file"]') as HTMLInputElement;
		await userEvent.upload(input, file);

		await userEvent.click(screen.getByRole("button", { name: /import$/i }));

		await waitFor(() => expect(postInit).not.toBeNull());
		const fd = postInit?.body as FormData;
		expect(fd).toBeInstanceOf(FormData);
		expect(fd.get("tahun")).toBe(String(new Date().getFullYear()));
		expect(fd.get("file")).toBeInstanceOf(File);

		// summary dari SavedResultString.data ditampilkan di dalam dialog (bukan toast)
		await waitFor(() => expect(screen.getByText(/berhasil import 50 baris/i)).toBeTruthy());
	});
});
