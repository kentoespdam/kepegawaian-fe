import type { JenisPelatihanPostRequest, JenisPelatihanQuery } from "@/types/master/jenis-pelatihan";
import { type EntityConfig, makeConfig, nameCol, nameField, simpleNameSchema } from "./_config-kit";

export const jenisPelatihanConfig: EntityConfig<JenisPelatihanQuery, JenisPelatihanPostRequest> = makeConfig<
	JenisPelatihanQuery,
	JenisPelatihanPostRequest
>(simpleNameSchema, [nameField], [nameCol], "Jenis Pelatihan", { searchFields: [{ name: "nama", label: "Nama" }] });
