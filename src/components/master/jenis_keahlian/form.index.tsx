"use client"
import {
	type JenisKeahlian,
	JenisKeahlianSchema,
} from "@_types/master/jenis_keahlian"
import { LoadingButtonClient } from "@components/builder/loading-button-client"
import InputZod from "@components/form/zod/input"
import { Button } from "@components/ui/button"
import { Form } from "@components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useGlobalMutation } from "@store/query-store";
import { SaveIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import { useCallback, useMemo } from "react"
import { useForm } from "react-hook-form"
import { saveJenisKeahlian } from "./action"

type JenisKeahlianFormComponentProps = {
	data?: JenisKeahlian
}
const JenisKeahlianFormComponent = ({
	data,
}: JenisKeahlianFormComponentProps) => {
	const { back } = useRouter()

	const defaultValues = useMemo(() => {
		const result = data
			? {
					id: data.id,
					nama: data.nama,
				}
			: {
					id: 0,
					nama: "",
				}
		return result as JenisKeahlianSchema
	}, [data])
	const form = useForm<JenisKeahlianSchema>({
		resolver: zodResolver(JenisKeahlianSchema),
		defaultValues: defaultValues,
		values: defaultValues,
	})

	const mutation = useGlobalMutation({
		mutationFunction: saveJenisKeahlian,
		queryKeys: [["jenis_keahlian", ""]],
		redirectTo: "/master/jenis_keahlian",
	})

	const onSubmit = useCallback(
		(value: JenisKeahlianSchema) => {
			mutation.mutate(value)
		},
		[mutation]
	)

	const cancelHandler = useCallback(() => {
		form.reset()
		back()
	}, [form, back])

	return (
		<Form {...form}>
			<form
				className="space-y-4 md:space-y-6"
				onSubmit={form.handleSubmit(onSubmit)}
			>
				<InputZod type={"hidden"} id={"id"} form={form} />
				<InputZod id={"nama"} label={"Nama Jenis Keahlian"} form={form} />
				<div className="flex flex-row justify-end gap-2">
					<LoadingButtonClient
						type="submit"
						title="Save"
						pending={mutation.isPending}
						icon={<SaveIcon />}
					/>
					<Button
						type="reset"
						variant="destructive"
						onClick={cancelHandler}
					>
						Cancel
					</Button>
					<input type="hidden" name="id" value={data?.id} />
				</div>
			</form>
		</Form>
	)
}

export default JenisKeahlianFormComponent
