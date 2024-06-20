"use server";
import type { SaveErrorStatus } from "@_types/index";
import { BiodataSchema } from "@_types/profil/biodata";

export const saveKepegawaian = async (
	formData: FormData,
): Promise<SaveErrorStatus> => {
	try {
		const validateBiodata = BiodataSchema.safeParse({
			nik: formData.get("nik"),
			nama: formData.get("nama"),
			jenisKelamin: formData.get("jenisKelamin"),
			tempatLahir: formData.get("tempatLahir"),
			tanggalLahir: formData.get("tanggalLahir"),
			alamat: formData.get("alamat"),
			telp: formData.get("telp"),
			agama: Number(formData.get("agama")),
			ibuKandung: formData.get("ibuKandung"),
			pendidikanTerakhirId: Number(formData.get("pendidikanTerakhir")),
			golonganDarah: formData.get("golonganDarah"),
			statusKawin: formData.get("statusKawin"),
			notes: formData.get("notes"),
		});

		if (!validateBiodata.success) {
			return {
				success: false,
				error: validateBiodata.error.flatten().fieldErrors,
			};
		}

		return {
			success: true,
			error: { message: JSON.stringify(validateBiodata.data) },
		};
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	} catch (err: any) {
		console.log(err);
		return { success: false, error: { message: err.response.data.message } };
	}
};
