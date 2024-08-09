"use client";

import { findAgamaIndex } from "@_types/enums/agama";
import { JenisKelamin } from "@_types/enums/jenisKelamin";
import { findStatusKawinIndex } from "@_types/enums/status_kawin";
import { ConditionalSchema, type Pegawai } from "@_types/pegawai";
import type { Biodata } from "@_types/profil/biodata";
import PegawaiActionComponent from "@components/kepegawaian/data_pegawai/add/action";
import PegawaiBiodataComponent from "@components/kepegawaian/data_pegawai/add/biodata";
import PegawaiDetailComponent from "@components/kepegawaian/data_pegawai/add/detail_pegawai";
import ReferensiPegawaiComponent from "@components/kepegawaian/data_pegawai/add/referensi";
import { Form } from "@components/ui/form";
import { useToast } from "@components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAddBiodataStore } from "@store/kepegawaian/biodata/add-store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { saveKepegawaian } from "./action";

type PegawaiFormProps = {
	pegawai?: Pegawai;
	biodata?: Biodata;
};

const PegawaiForm = ({ pegawai, biodata }: PegawaiFormProps) => {
	const { push } = useRouter();
	const store = useAddBiodataStore();
	const { toast } = useToast();
	const qc = useQueryClient();

	const defaultValues = {
		updateBio: !!biodata,
		updatePegawai: false,
		nik: biodata?.nik ?? "",
		nama: biodata?.nama ?? "",
		jenisKelamin: biodata?.jenisKelamin ?? JenisKelamin.Values.LAKI_LAKI,
		tempatLahir: biodata?.tempatLahir ?? "",
		tanggalLahir: biodata?.tanggalLahir ?? "",
		alamat: biodata?.alamat ?? "",
		telp: biodata?.telp ?? "",
		agama: findAgamaIndex(biodata?.agama),
		ibuKandung: biodata?.ibuKandung ?? "",
		pendidikanTerakhirId: biodata?.pendidikanTerakhir.id ?? 0,
		golonganDarah: biodata?.golonganDarah ?? "",
		statusKawin: findStatusKawinIndex(biodata?.statusKawin),
		notes: biodata?.notes ?? "",
	};

	Object.assign(defaultValues, {
		updatePegawai: !!pegawai,
		id: pegawai?.id ?? 0,
		nipam: pegawai?.nipam ?? "",
		statusPegawaiId: pegawai?.statusPegawai ?? "",
		nomorSk: pegawai?.nomorSk ?? "",
		tanggalTmtSk: pegawai?.tanggalSk ?? "",
		golonganId: pegawai?.golongan.id ?? 0,
		organisasiId: pegawai?.organisasi.id ?? 0,
		jabatanId: pegawai?.jabatan.id ?? 0,
		profesiId: pegawai?.profesi.id ?? 0,
		gradeId: pegawai?.grade.id ?? 0,
		statusKerjaId: pegawai?.statusKerja.id ?? 0,
	});

	// console.log(defaultValues)

	const form = useForm<z.infer<typeof ConditionalSchema>>({
		resolver: zodResolver(ConditionalSchema),
		defaultValues: { ...defaultValues, referensi: "PEGAWAI" },
		values: {
			referensi: pegawai ? "PEGAWAI" : "BIODATA",
			updateBio: !!biodata,
			nik: biodata?.nik ?? "",
			nama: biodata?.nama ?? "",
			jenisKelamin: biodata?.jenisKelamin ?? JenisKelamin.Values.LAKI_LAKI,
			tempatLahir: biodata?.tempatLahir ?? "",
			tanggalLahir: biodata?.tanggalLahir ?? "",
			alamat: biodata?.alamat ?? "",
			telp: biodata?.telp ?? "",
			agama: findAgamaIndex(biodata?.agama),
			ibuKandung: biodata?.ibuKandung ?? "",
			pendidikanTerakhirId: biodata?.pendidikanTerakhir.id ?? 0,
			golonganDarah: biodata?.golonganDarah ?? "",
			statusKawin: findStatusKawinIndex(biodata?.statusKawin),
			notes: biodata?.notes ?? "",
			updatePegawai: !!pegawai,
			id: pegawai?.id ?? 0,
			nipam: pegawai?.nipam ?? "",
			statusPegawaiId: pegawai?.statusPegawai.id ?? 0,
			nomorSk: pegawai?.nomorSk ?? "",
			tanggalTmtSk: pegawai?.tanggalSk ?? "",
			golonganId: pegawai?.golongan.id ?? 0,
			organisasiId: pegawai?.organisasi.id ?? 0,
			jabatanId: pegawai?.jabatan.id ?? 0,
			profesiId: pegawai?.profesi.id ?? 0,
			gradeId: pegawai?.grade.id ?? 0,
			statusKerjaId: pegawai?.statusKerja.id ?? 0,
		},
	});

	const mutation = useMutation({
		mutationFn: saveKepegawaian,
		onSuccess: (data) => {
			if (data.status !== 201) throw new Error(data.message);

			toast({
				title: "Success",
				description: "Data berhasil disimpan",
				className: "bg-primary text-primary-foreground",
			});
			qc.invalidateQueries({ queryKey: ["data-pegawai", "data-biodata"] });
			push("/kepegawaian/data_pegawai");
		},
		onError: (error, variables, context) => {
			console.log(error);
			toast({
				title: "Error",
				description: error.message,
				variant: "destructive",
			});
		},
	});

	const onSubmit = (values: z.infer<typeof ConditionalSchema>) => {
		// mutation.mutate(values);
		console.log(values);
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
				<ReferensiPegawaiComponent form={form} />
				{store.referensi === "pegawai" ? (
					<PegawaiDetailComponent form={form} />
				) : null}

				<PegawaiBiodataComponent form={form} />

				<PegawaiActionComponent pending={mutation.isPending} />
			</form>
		</Form>
	);
};

export default PegawaiForm;
