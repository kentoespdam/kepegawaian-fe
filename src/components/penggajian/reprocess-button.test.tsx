// @vitest-environment jsdom
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import type { ReactNode } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ReprocessButton } from "./reprocess-button";

function wrapper({ children }: { children: ReactNode }) {
	return (
		<QueryClientProvider client={new QueryClient({ defaultOptions: { queries: { retry: false, gcTime: 0 } } })}>
			{children}
		</QueryClientProvider>
	);
}

describe("ReprocessButton", () => {
	beforeEach(() => {
		vi.restoreAllMocks();
	});

	afterEach(() => {
		cleanup();
	});

	it("renders button with default label and sends { id } body on confirmation", async () => {
		global.fetch = vi.fn().mockResolvedValue({
			ok: true,
			json: () => Promise.resolve({ data: {} }),
		});

		render(<ReprocessButton batchId="batch-1" />, { wrapper });

		const button = screen.getByRole("button", { name: "Proses Ulang" });
		expect(button).toBeInTheDocument();
		expect(button).toBeEnabled();

		fireEvent.click(button);

		// Dialog shows up
		expect(screen.getByText("Proses Ulang Batch")).toBeInTheDocument();

		const confirmBtn = screen.getByRole("button", { name: "Ya, Proses Ulang" });
		fireEvent.click(confirmBtn);

		await waitFor(() => {
			expect(global.fetch).toHaveBeenCalledWith("/api/proxy/penggajian/batch/batch-1/reprocess", {
				method: "PATCH",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ id: "batch-1" }),
			});
		});
	});

	it("respects custom confirmDescription, custom confirmActionLabel, and triggers onSuccess", async () => {
		global.fetch = vi.fn().mockResolvedValue({
			ok: true,
			json: () => Promise.resolve({ data: {} }),
		});

		const onSuccess = vi.fn();

		render(
			<ReprocessButton
				batchId="batch-2"
				confirmTitle="Konfirmasi Rollback"
				confirmDescription="Yakin ingin proses ulang?"
				confirmActionLabel="Proses Ulang Sekarang"
				onSuccess={onSuccess}
			/>,
			{ wrapper },
		);

		fireEvent.click(screen.getByRole("button", { name: "Proses Ulang" }));

		expect(screen.getByText("Konfirmasi Rollback")).toBeInTheDocument();
		expect(screen.getByText("Yakin ingin proses ulang?")).toBeInTheDocument();

		fireEvent.click(screen.getByRole("button", { name: "Proses Ulang Sekarang" }));

		await waitFor(() => {
			expect(global.fetch).toHaveBeenCalledWith("/api/proxy/penggajian/batch/batch-2/reprocess", {
				method: "PATCH",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ id: "batch-2" }),
			});
			expect(onSuccess).toHaveBeenCalled();
		});
	});

	it("disables button when disabled prop is true or batchId is empty", () => {
		render(<ReprocessButton batchId="" disabled={false} />, { wrapper });
		expect(screen.getByRole("button", { name: "Proses Ulang" })).toBeDisabled();
	});
});
