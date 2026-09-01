// @vitest-environment jsdom
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { TambahanDialog } from "./tambah-komponen-dialog";

const defaultProps = {
	open: true,
	onOpenChange: vi.fn(),
	onSuccess: vi.fn(),
	isSubmitting: false,
	onSubmit: vi.fn().mockResolvedValue(undefined),
};

function renderDialog(overrides: Partial<typeof defaultProps> = {}) {
	return render(<TambahanDialog {...defaultProps} {...overrides} />);
}

describe("TambahanDialog", () => {
	beforeEach(() => vi.restoreAllMocks());
	afterEach(() => cleanup());

	it("renders dialog with form fields", () => {
		renderDialog();

		expect(screen.getByText("Tambah Komponen Gaji")).toBeInTheDocument();
		expect(screen.getByLabelText(/Nama/)).toBeInTheDocument();
		expect(screen.getByLabelText(/Nilai/)).toBeInTheDocument();
		expect(screen.getByText("Simpan")).toBeInTheDocument();
		expect(screen.getByText("Batal")).toBeInTheDocument();
	});

	it("shows error when submitting with empty nama", async () => {
		const user = userEvent.setup();
		const onSubmit = vi.fn().mockResolvedValue(undefined);
		renderDialog({ onSubmit });

		// Clear nama field (default is empty, but trigger validation)
		const namaInput = screen.getByLabelText(/Nama/);
		await user.clear(namaInput);
		await user.click(screen.getByText("Simpan"));

		await waitFor(() => {
			expect(screen.getByText("Nama wajib diisi")).toBeInTheDocument();
		});
		expect(onSubmit).not.toHaveBeenCalled();
	});

	it("shows error when submitting with negative nilai", async () => {
		const user = userEvent.setup();
		const onSubmit = vi.fn().mockResolvedValue(undefined);
		renderDialog({ onSubmit });

		const nilaiInput = screen.getByLabelText(/Nilai/);
		await user.clear(nilaiInput);
		await user.type(nilaiInput, "-100");
		await user.click(screen.getByText("Simpan"));

		await waitFor(() => {
			expect(screen.getByText("Nilai tidak boleh negatif")).toBeInTheDocument();
		});
		expect(onSubmit).not.toHaveBeenCalled();
	});

	it("calls onSubmit with valid data", async () => {
		const user = userEvent.setup();
		const onSubmit = vi.fn().mockResolvedValue(undefined);
		const onSuccess = vi.fn();
		renderDialog({ onSubmit, onSuccess });

		const namaInput = screen.getByLabelText(/Nama/);
		await user.type(namaInput, "Bonus Kinerja");

		// nilai defaults to 0, jenisGaji defaults to PEMASUKAN
		await user.click(screen.getByText("Simpan"));

		await waitFor(() => {
			expect(onSubmit).toHaveBeenCalledWith({
				nama: "Bonus Kinerja",
				jenisGaji: "PEMASUKAN",
				nilai: 0,
			});
		});
	});

	it("calls onOpenChange(false) when Batal clicked", async () => {
		const user = userEvent.setup();
		const onOpenChange = vi.fn();
		renderDialog({ onOpenChange });

		await user.click(screen.getByText("Batal"));

		expect(onOpenChange).toHaveBeenCalledWith(false);
	});

	it("does not render when open is false", () => {
		renderDialog({ open: false });

		expect(screen.queryByText("Tambah Komponen Gaji")).not.toBeInTheDocument();
	});
});
