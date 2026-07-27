import type { JenisKitasPostRequest, JenisKitasQuery } from "@/types/master/jenis-kitas";
import { type EntityConfig, makeConfig, nameCol, nameField, simpleNameSchema } from "./_config-kit";

export const jenisKitasConfig: EntityConfig<JenisKitasQuery, JenisKitasPostRequest> = makeConfig<
	JenisKitasQuery,
	JenisKitasPostRequest
>(simpleNameSchema, [nameField], [nameCol], "Jenis Kitas", { searchFields: [{ name: "nama", label: "Nama" }] });
