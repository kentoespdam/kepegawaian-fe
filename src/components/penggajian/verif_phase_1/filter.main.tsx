"use client"
import SelectBulanZod from "@components/form/zod/bulan";
import SelectTahunZod from "@components/form/zod/tahun";
import { Button } from "@components/ui/button";
import { Form } from "@components/ui/form";
import { Label } from "@components/ui/label";
import { LoopIcon } from "@radix-ui/react-icons";
import { useMutation } from "@tanstack/react-query";
import { DownloadIcon, FileSpreadsheetIcon, SearchIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { downloadTableGajiExcel } from "./action";
import { base64toBlob } from "@helpers/string";
import TooltipBuilder from "@components/builder/tooltip";

export const PeriodeBatchRootSchema = z.object({
    bulan: z.string(),
    tahun: z.string(),
})

export type PeriodeBatchRootSchema = z.infer<typeof PeriodeBatchRootSchema>

const VerifPhase1MainFilter = () => {
    const { replace } = useRouter()
    const searchParams = useSearchParams()
    const search = new URLSearchParams(searchParams.toString())
    const periode = searchParams.get("periode") ?? ""
    const [defaultValues, setDefaultValues] = useState<PeriodeBatchRootSchema>({ bulan: "", tahun: "" })

    const downloadFile = useMutation({
        mutationFn: () => downloadTableGajiExcel(periode),
        onSuccess: (data) => {
            const blob = base64toBlob(data.base64, data.type)
            const url = URL.createObjectURL(blob)
            const link = document.createElement("a")
            link.href = url
            link.setAttribute("download", `table-gaji_${periode}`)
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
        }
    })

    const form = useForm<PeriodeBatchRootSchema>({
        defaultValues: defaultValues,
        values: defaultValues
    })

    const onSubmit = (values: PeriodeBatchRootSchema) => {
        if (values.bulan === "" || values.tahun === "") return
        search.set("periode", `${values.tahun}${values.bulan}`)
        replace(`?${search.toString()}`)
    }

    useEffect(() => {
        const bulan = periode ? periode.substring(4, 6) : ""
        const tahun = periode ? periode.substring(0, 4) : `${new Date(Date.now()).getFullYear()}`
        setDefaultValues({ bulan, tahun })
    }, [periode])

    return (
        <Form {...form}>
            <div className="flex justify-center items-center gap-2">
                <Label className="mt-2">Periode Gaji:<b className="text-destructive">*</b> </Label>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex gap-2">
                    <SelectBulanZod id="bulan" form={form} className="w-fit" />
                    <SelectTahunZod id="tahun" form={form} className="w-fit" />
                    <div className="mt-2">
                        <TooltipBuilder text="Tampilkan Data" delayDuration={10}>
                            <Button type="submit" className="flex gap-2">
                                <SearchIcon className="w-4 h-4" />
                                Tampilkan
                            </Button>
                        </TooltipBuilder>
                    </div>
                    <TooltipBuilder text="Download File Excel" delayDuration={10}>
                        <Button type="button"
                            className="flex gap-2 mt-2"
                            onClick={() => downloadFile.mutate()}>
                            <FileSpreadsheetIcon className="w-4 h-4" />
                            Download
                        </Button>
                    </TooltipBuilder>
                </form>
            </div>
        </Form>
    );
}

export default VerifPhase1MainFilter;