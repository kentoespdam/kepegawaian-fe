// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { z } from "zod";
import { CrudForm } from "./crud-form";

const schema = z.object({
	tanggal: z.string().min(1, "Tanggal wajib diisi"),
	jenisLibur: z.enum(["LIBUR_NASIONAL", "CUTI_BERSAMA"], {
		message: "Jenis libur wajib diisi",
	}),
	notes: z.string().optional(),
});

const fields = [
	{ name: "tanggal", label: "Tanggal", type: "date" as const, required: true },
	{
		name: "jenisLibur",
		label: "Jenis Libur",
		type: "select" as const,
		required: true,
		options: [
			{ value: "LIBUR_NASIONAL", label: "Libur Nasional" },
			{ value: "CUTI_BERSAMA", label: "Cuti Bersama" },
		],
	},
	{ name: "notes", label: "Catatan", type: "textarea" as const },
];

describe("CrudForm — Select field registration", () => {
	it("includes select field value in submission even without user interaction", async () => {
		const onSubmit = vi.fn().mockResolvedValue(undefined);
		const defaultValues = {
			tanggal: "2024-08-17",
			jenisLibur: "LIBUR_NASIONAL",
			notes: "Hari Kemerdekaan",
		};

		render(<CrudForm schema={schema} fields={fields} defaultValues={defaultValues} onSubmit={onSubmit} />);

		const user = userEvent.setup();
		await user.click(screen.getByRole("button", { name: /simpan/i }));

		expect(onSubmit).toHaveBeenCalledTimes(1);
		expect(onSubmit).toHaveBeenCalledWith(
			expect.objectContaining({
				tanggal: "2024-08-17",
				jenisLibur: "LIBUR_NASIONAL",
			}),
		);
	});
});
