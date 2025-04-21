"use client";
import { SystemRoleSchema } from "@_types/system/system_role";
import { LoadingButtonClient } from "@components/builder/loading-button-client";
import TooltipBuilder from "@components/builder/tooltip";
import InputZod from "@components/form/zod/input";
import { Button } from "@components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogTitle,
	DialogTrigger,
} from "@components/ui/dialog";
import { Form } from "@components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGlobalMutation } from "@store/query-store";
import { PlusCircleIcon, SaveIcon, XCircleIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { saveRole } from "./action";
import { useSearchParams } from "next/navigation";

const RoleFormDialog = () => {
	const params = useSearchParams();
	const [openDelete, setOpenDelete] = useState(false);
	const form = useForm<SystemRoleSchema>({
		resolver: zodResolver(SystemRoleSchema),
		defaultValues: {
			id: "",
		},
	});

	const mutation = useGlobalMutation({
		mutationFunction: saveRole,
		queryKeys: [["roles", params.toString()]],
		actHandler: () => {
			form.reset();
			setOpenDelete(false);
		},
	});

	const onSubmit = (values: SystemRoleSchema) => {
		mutation.mutate(values);
	};

	const onReset = () => {
		form.reset();
		setOpenDelete(false);
	};

	return (
		<Dialog open={openDelete} onOpenChange={setOpenDelete}>
			<TooltipBuilder text={"Add Roles"} className="bg-primary">
				<DialogTrigger className="p-0 w-6 h-6 rounded-full text-primary hover:bg-primary hover:text-primary-foreground">
					<PlusCircleIcon />
				</DialogTrigger>
			</TooltipBuilder>
			<DialogContent>
				<DialogTitle>Add Roles</DialogTitle>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-2">
						<div className="grid gap-2">
							<InputZod id="id" label="Nama Role" form={form} />
						</div>
						<DialogFooter>
							<LoadingButtonClient
								pending={mutation.isPending}
								type="submit"
								title="Save"
								icon={<SaveIcon />}
							/>
							<Button type="reset" variant="destructive" onClick={onReset}>
								<XCircleIcon className="mr-2" />
								<span>Batal</span>
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};

export default RoleFormDialog;
