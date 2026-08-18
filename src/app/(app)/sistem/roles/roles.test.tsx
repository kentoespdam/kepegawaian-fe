// @vitest-environment jsdom

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { getActionBadgeInfo, resolveModuleConfig, resolvePermissionMeta } from "./permission-config";
import { RolePermissionDialog } from "./role-permission-dialog";
import { RolesClient } from "./roles-client";

function createTestQueryClient() {
	return new QueryClient({
		defaultOptions: {
			queries: { retry: false },
			mutations: { retry: false },
		},
	});
}

const mockPermissions = [
	{ name: "PEGAWAI:READ" },
	{ name: "PEGAWAI:WRITE" },
	{ name: "PEGAWAI:DELETE" },
	{ name: "CUTI:READ" },
	{ name: "CUTI:WRITE" },
	{ name: "CUTI:APPROVE" },
	{ name: "SYSTEM:MANAGE_USER" },
	{ name: "SYSTEM:MANAGE_ROLE" },
];

const mockRole = {
	id: "HRD",
	description: "Divisi Kepegawaian & HR",
	permissions: [{ name: "PEGAWAI:READ" }, { name: "CUTI:READ" }, { name: "CUTI:APPROVE" }],
};

describe("permission-config helpers", () => {
	it("resolves known permissions with accurate metadata", () => {
		const meta = resolvePermissionMeta("PEGAWAI:READ");
		expect(meta.name).toBe("Lihat Data Pegawai");
		expect(meta.actionType).toBe("read");
		expect(meta.moduleKey).toBe("PEGAWAI");
	});

	it("resolves unknown permissions with graceful fallback", () => {
		const meta = resolvePermissionMeta("INVENTORY:CREATE");
		expect(meta.moduleKey).toBe("INVENTORY");
		expect(meta.actionType).toBe("write");
		expect(meta.name).toContain("INVENTORY");
	});

	it("returns proper action badge formatting", () => {
		const readBadge = getActionBadgeInfo("read");
		expect(readBadge.label).toBe("Lihat");

		const deleteBadge = getActionBadgeInfo("delete");
		expect(deleteBadge.label).toBe("Hapus");
	});

	it("resolves module configs and handles custom modules", () => {
		const pegawaiModule = resolveModuleConfig("PEGAWAI");
		expect(pegawaiModule.title).toBe("Data Pegawai");

		const unknownModule = resolveModuleConfig("CUSTOM");
		expect(unknownModule.title).toContain("Modul CUSTOM");
	});
});

describe("RolePermissionDialog", () => {
	let queryClient: QueryClient;

	beforeEach(() => {
		queryClient = createTestQueryClient();
		vi.restoreAllMocks();
	});

	afterEach(() => {
		cleanup();
	});

	it("renders role info, metric stats, and grouped permissions", () => {
		render(
			<QueryClientProvider client={queryClient}>
				<RolePermissionDialog open={true} onOpenChange={vi.fn()} role={mockRole} allPermissions={mockPermissions} />
			</QueryClientProvider>,
		);

		expect(screen.getByRole("heading", { name: "Kelola Hak Akses" })).toBeInTheDocument();
		expect(screen.getByText("HRD")).toBeInTheDocument();
		expect(screen.getByText("Divisi Kepegawaian & HR")).toBeInTheDocument();

		// Check active count
		expect(screen.getByText(/Status Akses:/i)).toBeInTheDocument();

		// Module Group titles
		expect(screen.getByRole("heading", { name: "Data Pegawai" })).toBeInTheDocument();
		expect(screen.getByRole("heading", { name: "Cuti & Izin" })).toBeInTheDocument();
	});

	it("filters permissions by search query", () => {
		render(
			<QueryClientProvider client={queryClient}>
				<RolePermissionDialog open={true} onOpenChange={vi.fn()} role={mockRole} allPermissions={mockPermissions} />
			</QueryClientProvider>,
		);

		const searchInput = screen.getByPlaceholderText(/Cari permission, modul, atau aksi/i);
		fireEvent.change(searchInput, { target: { value: "cuti" } });

		expect(screen.getByRole("heading", { name: "Cuti & Izin" })).toBeInTheDocument();
		expect(screen.queryByRole("heading", { name: "Data Pegawai" })).not.toBeInTheDocument();
	});

	it("toggles permission via API call on switch change", async () => {
		const fetchMock = vi.fn().mockResolvedValue({
			ok: true,
			status: 200,
			json: async () => ({ statusCode: 200 }),
		});
		global.fetch = fetchMock;

		render(
			<QueryClientProvider client={queryClient}>
				<RolePermissionDialog open={true} onOpenChange={vi.fn()} role={mockRole} allPermissions={mockPermissions} />
			</QueryClientProvider>,
		);

		// PEGAWAI:WRITE is currently inactive, clicking it should send POST
		const switchInput = document.getElementById("perm-switch-PEGAWAI-WRITE");
		expect(switchInput).not.toBeNull();

		if (switchInput) {
			fireEvent.click(switchInput);
		}

		await waitFor(() => {
			expect(fetchMock).toHaveBeenCalledWith(
				"/api/proxy/system/roles/HRD/permissions/PEGAWAI:WRITE",
				expect.objectContaining({ method: "POST" }),
			);
		});
	});
});

describe("RolesClient", () => {
	let queryClient: QueryClient;

	beforeEach(() => {
		queryClient = createTestQueryClient();
		vi.restoreAllMocks();
	});

	afterEach(() => {
		cleanup();
	});

	it("renders table with roles and handles search", async () => {
		global.fetch = vi.fn().mockImplementation((url: string) => {
			if (url.includes("/system/roles/list")) {
				return Promise.resolve({
					ok: true,
					json: async () => ({
						statusCode: 200,
						data: [
							{ id: "ADMIN", description: "Administrator Utama", permissions: [] },
							{ id: "HRD", description: "Bagian Kepegawaian", permissions: [{ name: "PEGAWAI:READ" }] },
						],
					}),
				});
			}
			if (url.includes("/system/permissions")) {
				return Promise.resolve({
					ok: true,
					json: async () => ({
						statusCode: 200,
						data: mockPermissions,
					}),
				});
			}
			return Promise.reject(new Error("Unknown url"));
		});

		render(
			<QueryClientProvider client={queryClient}>
				<RolesClient />
			</QueryClientProvider>,
		);

		await waitFor(() => {
			expect(screen.getByText("ADMIN")).toBeInTheDocument();
			expect(screen.getByText("HRD")).toBeInTheDocument();
		});

		// Search role in table
		const searchInput = screen.getByPlaceholderText("Cari ID role atau deskripsi...");
		fireEvent.change(searchInput, { target: { value: "HRD" } });

		expect(screen.getByText("HRD")).toBeInTheDocument();
		expect(screen.queryByText("ADMIN")).not.toBeInTheDocument();
	});
});
