import type { JenisKeahlianPostRequest, JenisKeahlianQuery } from "@/types/master/jenis-keahlian";
import { type EntityConfig, makeConfig, nameCol, nameField, simpleNameSchema } from "./_config-kit";

export const jenisKeahlianConfig: EntityConfig<JenisKeahlianQuery, JenisKeahlianPostRequest> = makeConfig<
	JenisKeahlianQuery,
	JenisKeahlianPostRequest
>(simpleNameSchema, [nameField], [nameCol], "Jenis Keahlian", {
	searchFields: [{ name: "nama", label: "Nama" }],
});
