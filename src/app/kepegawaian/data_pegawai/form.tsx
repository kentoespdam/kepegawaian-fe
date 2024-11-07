"use client";

import { JenisKelamin } from "@_types/enums/jenisKelamin";
import { type PegawaiDetail, PegawaiSchema } from "@_types/pegawai";
import type { Biodata } from "@_types/profil/biodata";
import SelectStatusPegawaiZod from "@components/form/zod/status-pegawai";
import PegawaiActionComponent from "@components/kepegawaian/data_pegawai/add/action";
import PegawaiBiodataComponent from "@components/kepegawaian/data_pegawai/add/biodata";
import PegawaiDetailComponent from "@components/kepegawaian/data_pegawai/add/detail_pegawai";
import { Form } from "@components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAddBiodataStore } from "@store/kepegawaian/biodata/add-store";
import { useGlobalMutation } from "@store/query-store";
import { useForm } from "react-hook-form";
import { saveKepegawaian } from "./action";
import { useEffect } from "react";

type PegawaiFormProps = {
	biodata?: Biodata;
	pegawai?: PegawaiDetail;
};
const PegawaiForm = ({ biodata, pegawai }: PegawaiFormProps) => {
	const biodataStore = useAddBiodataStore();

	const form = useForm<PegawaiSchema>({
		resolver: zodResolver(PegawaiSchema),
		defaultValues: {
			statusPegawai: biodataStore.statusPegawai,
			nik: "",
			nama: "",
			jenisKelamin: JenisKelamin.Values.LAKI_LAKI,
			golonganDarah: "",
			statusKawin: "",
			agama: "",
			tempatLahir: "",
			tanggalLahir: "",
			ibuKandung: "",
			telp: "",
			pendidikanTerakhirId: 0,
			alamat: "",
			notes: "",
			nipam: "",
			statusKerja:
				biodataStore.statusPegawai !== "NON_PEGAWAI" ? "KARYAWAN_AKTIF" : "",
			organisasiId: 0,
			jabatanId: 0,
			profesiId: 0,
			gradeId: 0,
			golonganId: 0,
			nomorSk: "",
			tanggalSk: "",
			tmtKontrakSelesai: "",
			gajiPokok: 0,
		},
		values: {
			statusPegawai: biodataStore.statusPegawai,
			nik: biodata?.nik ?? "",
			nama: biodata?.nama ?? "",
			jenisKelamin: biodata?.jenisKelamin ?? JenisKelamin.Values.LAKI_LAKI,
			golonganDarah: biodata?.golonganDarah ?? "",
			statusKawin: biodata?.statusKawin ?? "",
			agama: biodata?.agama ?? "",
			tempatLahir: biodata?.tempatLahir ?? "",
			tanggalLahir: biodata?.tanggalLahir ?? "",
			ibuKandung: biodata?.ibuKandung ?? "",
			telp: biodata?.telp ?? "",
			pendidikanTerakhirId: biodata?.pendidikanTerakhir.id ?? 0,
			alamat: biodata?.alamat ?? "",
			notes: biodata?.notes ?? "",
			nipam: pegawai?.nipam ?? "",
			statusKerja:
				biodataStore.statusPegawai !== "NON_PEGAWAI" ? "KARYAWAN_AKTIF" : "",
			organisasiId: pegawai?.organisasi.id ?? 0,
			jabatanId: pegawai?.jabatan.id ?? 0,
			profesiId: pegawai?.profesi.id ?? 0,
			gradeId: pegawai?.grade.id ?? 0,
			golonganId: pegawai?.golongan.id ?? 0,
			nomorSk: pegawai?.nomorSk ?? "",
			tanggalSk: pegawai?.tanggalSk ?? "",
			tmtKontrakSelesai: pegawai?.tmtKontrakSelesai ?? "",
			gajiPokok: 0,
		},
	});

	const mutation = useGlobalMutation({
		mutationFunction: saveKepegawaian,
		queryKeys: [["data-pegawai", "data-biodata"]],
		redirectTo: "/kepegawaian/data_pegawai",
	});

	const onSubmit = (values: PegawaiSchema) => {
		Object.assign(values, {
			statusKerja: "KARYAWAN_AKTIF",
		});
		mutation.mutate(values);
		// console.log(values)
	};

	useEffect(() => {
		form.watch()
		console.table(form.watch());
	}, [form]);

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
				<SelectStatusPegawaiZod
					id="statusPegawai"
					label="Status Pegawai"
					form={form}
				/>
				{biodataStore.statusPegawai !== "" &&
				biodataStore.statusPegawai !== "NON_PEGAWAI" ? (
					<PegawaiDetailComponent form={form} />
				) : null}

				<PegawaiBiodataComponent form={form} />

				<PegawaiActionComponent pending={mutation.isPending} />
			</form>
		</Form>
	);
};

export default PegawaiForm;
