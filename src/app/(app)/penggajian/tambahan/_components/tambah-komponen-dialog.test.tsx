// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { TambahanDialog } from "./tambah-komponen-dialog";

describe("TambahanDialog", () => {
	afterEach(() => {
		cleanup();
	});
	it("renders dialog with form fields", () => {
		render(
			<TambahanDialog
				open={true}
				onOpenChange={() => {}}
				onSuccess={() => {}}
				isSubmitting={false}
				onSubmit={async () => {}}
			/>,
		);

		expect(screen.getByText("Tambah Komponen Gaji")).toBeInTheDocument();
		expect(screen.getByLabelText(/Nama/)).toBeInTheDocument();
		expect(screen.getByLabelText(/Nilai/)).toBeInTheDocument();
	});

	it("shows error when submitting with empty nama", async () => {
		const handleSubmit = vi.fn();
		render(
			<TambahanDialog
				open={true}
				onOpenChange={() => {}}
				onSuccess={() => {}}
				isSubmitting={false}
				onSubmit={handleSubmit}
			/>,
		);

		fireEvent.click(screen.getByRole("button", { name: "Simpan" }));

		await waitFor(() => {
			expect(screen.getByText("Nama wajib diisi")).toBeInTheDocument();
		});
		expect(handleSubmit).not.toHaveBeenCalled();
	});

	it("shows error when submitting with negative nilai", async () => {
		const handleSubmit = vi.fn();
		render(
			<TambahanDialog
				open={true}
				onOpenChange={() => {}}
				onSuccess={() => {}}
				isSubmitting={false}
				onSubmit={handleSubmit}
			/>,
		);

		fireEvent.change(screen.getByLabelText(/Nama/), { target: { value: "Bonus" } });
		fireEvent.change(screen.getByLabelText(/Nilai/), { target: { value: "-100" } });
		fireEvent.click(screen.getByRole("button", { name: "Simpan" }));

		await waitFor(() => {
			expect(screen.getByText("Nilai tidak boleh negatif")).toBeInTheDocument();
		});
		expect(handleSubmit).not.toHaveBeenCalled();
	});

	it("calls onSubmit with valid data", async () => {
		const handleSubmit = vi.fn().mockResolvedValue(undefined);
		const handleSuccess = vi.fn();

		render(
			<TambahanDialog
				open={true}
				onOpenChange={() => {}}
				onSuccess={handleSuccess}
				isSubmitting={false}
				onSubmit={handleSubmit}
			/>,
		);

		fireEvent.change(screen.getByLabelText(/Nama/), { target: { value: "Insentif Proyek" } });
		fireEvent.change(screen.getByLabelText(/Nilai/), { target: { value: "500000" } });
		fireEvent.click(screen.getByRole("button", { name: "Simpan" }));

		await waitFor(() => {
			expect(handleSubmit).toHaveBeenCalledWith({
				nama: "Insentif Proyek",
				jenisGaji: "PEMASUKAN",
				nilai: 500000,
			});
			expect(handleSuccess).toHaveBeenCalled();
		});
	});

	it("calls onOpenChange(false) when Batal clicked", () => {
		const handleOpenChange = vi.fn();
		render(
			<TambahanDialog
				open={true}
				onOpenChange={handleOpenChange}
				onSuccess={() => {}}
				isSubmitting={false}
				onSubmit={async () => {}}
			/>,
		);

		fireEvent.click(screen.getByRole("button", { name: "Batal" }));
		expect(handleOpenChange).toHaveBeenCalledWith(false);
	});

	it("does not render when open is false", () => {
		render(
			<TambahanDialog
				open={false}
				onOpenChange={() => {}}
				onSuccess={() => {}}
				isSubmitting={false}
				onSubmit={async () => {}}
			/>,
		);

		expect(screen.queryByText("Tambah Komponen Gaji")).not.toBeInTheDocument();
	});
});
