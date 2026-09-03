// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { UploadPotonganDialog } from "./upload-potongan-dialog";

describe("UploadPotonganDialog", () => {
	beforeEach(() => {
		vi.restoreAllMocks();
	});

	afterEach(() => {
		cleanup();
	});

	it("renders dialog with pre-filled ID when open", () => {
		render(<UploadPotonganDialog open={true} onOpenChange={vi.fn()} rootBatchId="202510-001" onSuccess={vi.fn()} />);

		expect(screen.getByText("Upload Potongan")).toBeInTheDocument();
		const idInput = screen.getByLabelText("ID") as HTMLInputElement;
		expect(idInput.value).toBe("202510-001");
		expect(screen.getByRole("button", { name: /Upload/i })).toBeDisabled();
	});

	it("handles file selection and upload", async () => {
		const onSuccess = vi.fn();
		const onOpenChange = vi.fn();

		global.fetch = vi.fn().mockResolvedValue({
			ok: true,
			status: 200,
			json: () => Promise.resolve({ data: "OK" }),
		});

		render(
			<UploadPotonganDialog open={true} onOpenChange={onOpenChange} rootBatchId="202510-001" onSuccess={onSuccess} />,
		);

		const fileInput = screen.getByLabelText("File");
		const file = new File(["dummy content"], "potongan.xlsx", {
			type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
		});

		fireEvent.change(fileInput, { target: { files: [file] } });

		const uploadBtn = screen.getByRole("button", { name: /Upload/i });
		expect(uploadBtn).toBeEnabled();

		fireEvent.click(uploadBtn);

		await waitFor(() => {
			expect(global.fetch).toHaveBeenCalledWith(
				expect.stringContaining("/api/proxy/penggajian/batch/master/upload/202510-001"),
				expect.objectContaining({ method: "PATCH" }),
			);
			expect(onSuccess).toHaveBeenCalled();
			expect(onOpenChange).toHaveBeenCalledWith(false);
		});
	});
});
