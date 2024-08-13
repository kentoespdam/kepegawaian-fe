"use client";
import type { StatusPegawai } from "@_types/master/status_pegawai";
import { Label } from "@components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@components/ui/select";
import { getListData } from "@helpers/action";
import { useAddBiodataStore } from "@store/kepegawaian/biodata/add-store";
import { useQuery } from "@tanstack/react-query";

const ReferensiPegawaiComponent = () => {
	const biodataStore = useAddBiodataStore();
	const query = useQuery({
		queryKey: ["status_pegawai"],
		queryFn: () => getListData<StatusPegawai>({ path: "status-pegawai" }),
	});

	return (
		<div className="flex flex-row gap-2 items-center m-5">
			<Label htmlFor="theme">Referensi Profil Karyawan : </Label>
			<div>
				<Select onValueChange={biodataStore.setStatusPegawai}>
					<SelectTrigger>
						{query.isLoading || query.isFetching ? (
							<SelectValue placeholder="Loading..." />
						) : (
							<SelectValue
								placeholder="Pilih Referensi Profil Karyawan"
								className="pr-2"
							/>
						)}
					</SelectTrigger>
					<SelectContent>
						{query.data?.map((status) => (
							<SelectItem key={status.id} value={status.id}>
								{status.nama}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>
		</div>
	);
};

export default ReferensiPegawaiComponent;
