"use client";

import { FilterMutasiSchema } from "@_types/kepegawaian/mutasi";
import DatePickerZod from "@components/form/zod/date-picker";
import JenisMutasiZod from "@components/form/zod/jenis-mutasi";
import { Button } from "@components/ui/button";
import Fieldset from "@components/ui/fieldset";
import { Form } from "@components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SearchIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import MutasiDownloadButton from "./button.download";

const FilterMutasiComponent = ({
	jenisMutasi,
	tglAwal,
	tglAkhir,
}: FilterMutasiSchema) => {
	const pathname = usePathname();
	const router = useRouter();
	const form = useForm<FilterMutasiSchema>({
		resolver: zodResolver(FilterMutasiSchema),
		defaultValues: {
			jenisMutasi: jenisMutasi,
			tglAwal: tglAwal,
			tglAkhir: tglAkhir,
		},
	});

	const onSubmit = (data: FilterMutasiSchema) => {
		const urlParams = new URLSearchParams();
		urlParams.delete("jenisMutasi");
		if (data.jenisMutasi) urlParams.set("jenisMutasi", data.jenisMutasi);
		urlParams.set("tglAwal", data.tglAwal);
		urlParams.set("tglAkhir", data.tglAkhir);
		router.replace(`${pathname}?${urlParams.toString()}`);
	};

	return (
		<Form {...form}>
			<Fieldset title="Filter Mutasi">
				<form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-2">
					<JenisMutasiZod id="jenisMutasi" form={form} />
					<DatePickerZod id="tglAwal" form={form} />
					<DatePickerZod id="tglAkhir" form={form} />
					<Button type="submit" className="mt-2 flex gap-2 justify-between">
						<SearchIcon /> <span>Cari</span>
					</Button>
					<MutasiDownloadButton form={form} />
				</form>
			</Fieldset>
		</Form>
	);
};

export default FilterMutasiComponent;
