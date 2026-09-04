// @vitest-environment jsdom
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import type { ReactNode } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { VerifyButton } from "./verify-button";

function wrapper({ children }: { children: ReactNode }) {
	return (
		<QueryClientProvider client={new QueryClient({ defaultOptions: { queries: { retry: false, gcTime: 0 } } })}>
			{children}
		</QueryClientProvider>
	);
}

describe("VerifyButton", () => {
	beforeEach(() => {
		vi.restoreAllMocks();
	});

	afterEach(() => {
		cleanup();
	});

	it("renders button with default label and triggers confirmation dialog", async () => {
		global.fetch = vi.fn().mockResolvedValue({
			ok: true,
			json: () => Promise.resolve({ data: {} }),
		});

		render(<VerifyButton batchId="batch-1" nama="Budi" jabatan="Manager SDM" />, { wrapper });

		const button = screen.getByRole("button", { name: "Verifikasi" });
		expect(button).toBeInTheDocument();
		expect(button).toBeEnabled();

		fireEvent.click(button);

		// Dialog shows up
		expect(screen.getByText("Konfirmasi Verifikasi")).toBeInTheDocument();

		const confirmBtn = screen.getByRole("button", { name: "Ya, Verifikasi" });
		fireEvent.click(confirmBtn);

		await waitFor(() => {
			expect(global.fetch).toHaveBeenCalledWith("/api/proxy/penggajian/batch/batch-1/verify", {
				method: "PATCH",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					id: "batch-1",
					nama: "Budi",
					jabatan: "Manager SDM",
				}),
			});
		});
	});

	it("respects custom label, custom confirm title, and custom icon", async () => {
		global.fetch = vi.fn().mockResolvedValue({
			ok: true,
			json: () => Promise.resolve({ data: {} }),
		});

		const onSuccess = vi.fn();

		render(
			<VerifyButton
				batchId="batch-2"
				nama="Ahmad"
				jabatan="Direktur Utama"
				label="Setujui"
				confirmTitle="Persetujuan Akhir"
				confirmDescription="Yakin setujui batch?"
				onSuccess={onSuccess}
			/>,
			{ wrapper },
		);

		const button = screen.getByRole("button", { name: "Setujui" });
		fireEvent.click(button);

		expect(screen.getByText("Persetujuan Akhir")).toBeInTheDocument();
		expect(screen.getByText("Yakin setujui batch?")).toBeInTheDocument();

		fireEvent.click(screen.getByRole("button", { name: "Ya, Setujui" }));

		await waitFor(() => {
			expect(global.fetch).toHaveBeenCalledWith("/api/proxy/penggajian/batch/batch-2/verify", {
				method: "PATCH",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					id: "batch-2",
					nama: "Ahmad",
					jabatan: "Direktur Utama",
				}),
			});
			expect(onSuccess).toHaveBeenCalled();
		});
	});

	it("disables button when disabled prop is true or batchId is empty", () => {
		render(<VerifyButton batchId="" disabled={false} />, { wrapper });
		expect(screen.getByRole("button", { name: "Verifikasi" })).toBeDisabled();
	});
});
