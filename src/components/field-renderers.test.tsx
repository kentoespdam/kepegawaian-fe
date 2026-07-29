// @vitest-environment jsdom

/**
 * Unit test untuk field-renderers components.
 *
 * Menguji: render label, required indicator, error state, onChange callback.
 * FieldFk menggunakan FKCombobox yang kompleks (Dialog + cmdk) — dimock agar
 * test tetap fokus ke wrapper FieldFk, bukan ke internals FKCombobox.
 */
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { FieldFk, FieldSelect, FieldText, FieldTextarea } from "./field-renderers";

/** Bersihkan DOM sebelum tiap test (defensif — DOM bekas test gagal tetap dibersihkan). */
function registerCleanup() {
	beforeEach(() => {
		cleanup();
		document.body.innerHTML = "";
	});
}

// Mock FKCombobox — hindari kompleksitas Dialog/cmdk yang tak relevan untuk test wrapper.
vi.mock("@/components/fk-combobox", () => ({
	FKCombobox: ({
		options,
		value,
		onChange,
		placeholder,
		disabled,
		invalid,
	}: {
		options: { value: string; label: string }[];
		value: string | undefined;
		onChange: (v: string | undefined) => void;
		placeholder?: string;
		disabled?: boolean;
		invalid?: boolean;
	}) => (
		<select
			data-testid="fk-combobox"
			data-invalid={invalid}
			disabled={disabled}
			aria-label={placeholder}
			value={value ?? ""}
			onChange={(e) => onChange(e.target.value || undefined)}
		>
			<option value="">{placeholder}</option>
			{options.map((o) => (
				<option key={o.value} value={o.value}>
					{o.label}
				</option>
			))}
		</select>
	),
}));

// ─── Shared options ──

const OPTIONS = [
	{ value: "a", label: "Option A" },
	{ value: "b", label: "Option B" },
	{ value: "c", label: "Option C" },
] as const;

// ─── FieldSelect ────────────────────────────────────────────────────────────

describe("FieldSelect", () => {
	registerCleanup();

	it("merender label", () => {
		render(<FieldSelect label="Pilih Sesuatu" value="" options={OPTIONS} onChange={() => {}} />);
		expect(screen.getByText("Pilih Sesuatu")).toBeInTheDocument();
	});

	it("menampilkan asterisk required", () => {
		render(<FieldSelect label="Wajib" value="" options={OPTIONS} onChange={() => {}} required />);
		expect(screen.getByText("*")).toBeInTheDocument();
	});

	it("tidak menampilkan asterisk bila tidak required", () => {
		render(<FieldSelect label="Opsional" value="" options={OPTIONS} onChange={() => {}} />);
		expect(screen.queryByText("*")).not.toBeInTheDocument();
	});

	it("menampilkan pesan error", () => {
		render(<FieldSelect label="Pilih" value="" options={OPTIONS} onChange={() => {}} error="Field ini wajib" />);
		expect(screen.getByText("Field ini wajib")).toBeInTheDocument();
	});

	it("tidak menampilkan error bila undefined", () => {
		render(<FieldSelect label="Pilih" value="" options={OPTIONS} onChange={() => {}} />);
		expect(screen.queryByText("Field ini wajib")).not.toBeInTheDocument();
	});
});

// ─── FieldText ──────────────────────────────────────────────────────────────

describe("FieldText", () => {
	registerCleanup();

	it("merender label", () => {
		render(<FieldText label="Nama" value="" onChange={() => {}} />);
		expect(screen.getByText("Nama")).toBeInTheDocument();
	});

	it("menampilkan asterisk required", () => {
		render(<FieldText label="Wajib" value="" onChange={() => {}} required />);
		expect(screen.getByText("*")).toBeInTheDocument();
	});

	it("menerapkan tipe input", () => {
		const { container } = render(<FieldText label="Email" value="" onChange={() => {}} type="email" />);
		// getByLabelText tidak bisa dipakai karena Base UI Label tanpa htmlFor
		const input = container.querySelector('input[type="email"]');
		expect(input).toBeInTheDocument();
	});

	it("menampilkan pesan error", () => {
		render(<FieldText label="Nama" value="" onChange={() => {}} error="Nama harus diisi" />);
		expect(screen.getByText("Nama harus diisi")).toBeInTheDocument();
	});

	it("memanggil onChange saat diketik", async () => {
		const onChange = vi.fn();
		const user = userEvent.setup();
		render(<FieldText label="Nama" value="" onChange={onChange} />);
		// getByRole("textbox") aman karena DOM cuma satu input per test
		await user.type(screen.getByRole("textbox"), "A");
		expect(onChange).toHaveBeenCalledWith("A");
	});
});

// ─── FieldTextarea ──────────────────────────────────────────────────────────

describe("FieldTextarea", () => {
	registerCleanup();

	it("merender label", () => {
		render(<FieldTextarea label="Alamat" value="" onChange={() => {}} />);
		expect(screen.getByText("Alamat")).toBeInTheDocument();
	});

	it("menampilkan asterisk required", () => {
		render(<FieldTextarea label="Wajib" value="" onChange={() => {}} required />);
		expect(screen.getByText("*")).toBeInTheDocument();
	});

	it("menampilkan pesan error", () => {
		render(<FieldTextarea label="Alamat" value="" onChange={() => {}} error="Alamat harus diisi" />);
		expect(screen.getByText("Alamat harus diisi")).toBeInTheDocument();
	});

	it("memanggil onChange saat diketik", async () => {
		const onChange = vi.fn();
		const user = userEvent.setup();
		render(<FieldTextarea label="Alamat" value="" onChange={onChange} />);
		await user.type(screen.getByRole("textbox"), "Jl. Merdeka");
		expect(onChange).toHaveBeenCalled();
	});
});

// ─── FieldFk ────────────────────────────────────────────────────────────────

describe("FieldFk", () => {
	registerCleanup();

	it("merender label dan FKCombobox mock", () => {
		render(<FieldFk label="Organisasi" options={OPTIONS} value="" onChange={() => {}} />);
		expect(screen.getByText("Organisasi")).toBeInTheDocument();
		expect(screen.getByTestId("fk-combobox")).toBeInTheDocument();
		expect(screen.getByLabelText(/Pilih organisasi/i)).toBeInTheDocument();
	});

	it("menampilkan asterisk required", () => {
		render(<FieldFk label="Wajib" options={OPTIONS} value="" onChange={() => {}} required />);
		expect(screen.getByText("*")).toBeInTheDocument();
	});

	it("menampilkan pesan error", () => {
		render(<FieldFk label="Org" options={OPTIONS} value="" onChange={() => {}} error="Pilih organisasi" />);
		expect(screen.getByText("Pilih organisasi")).toBeInTheDocument();
	});

	it("menandai invalid ke FKCombobox", () => {
		render(<FieldFk label="Org" options={OPTIONS} value="" onChange={() => {}} error="Ada error" />);
		expect(screen.getByTestId("fk-combobox")).toHaveAttribute("data-invalid", "true");
	});
});
