"use client";

import { ChangePasswordSchema } from "@_types/system/user";
import { LoadingButtonClient } from "@components/builder/loading-button-client";
import InputZod from "@components/form/zod/input";
import InputPasswordZod from "@components/form/zod/input.password";
import { Button } from "@components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogTitle,
} from "@components/ui/dialog";
import { Form } from "@components/ui/form";
import { encodeString } from "@helpers/number";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGlobalMutation } from "@store/query-store";
import { SaveIcon, XCircleIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { changePassword } from "./action";

interface ChangePasswordFormDialogProps {
	userId: string;
	qKey: string[];
	openChangePassword: boolean;
	setOpenChangePassword: (value: boolean) => void;
}
const ChangePasswordFormDialog = ({
	userId,
	qKey,
	openChangePassword,
	setOpenChangePassword,
}: ChangePasswordFormDialogProps) => {
	const form = useForm<ChangePasswordSchema>({
		resolver: zodResolver(ChangePasswordSchema),
		defaultValues: {
			id: userId,
			newPassword: "",
			confirmPassword: "",
		},
		values: {
			id: userId,
			newPassword: "",
			confirmPassword: "",
		},
	});

	const mutation = useGlobalMutation({
		mutationFunction: changePassword,
		queryKeys: [qKey],
		actHandler: () => {
			form.reset();
			setOpenChangePassword(false);
		},
	});

	const onSubmit = (values: ChangePasswordSchema) => {
		values.newPassword = encodeString(values.newPassword);
		values.confirmPassword = encodeString(values.confirmPassword);
		mutation.mutate(values);
	};

	const onReset = () => {
		form.reset();
		setOpenChangePassword(false);
	};

	const openChangeHandler = () => {
		form.reset();
		setOpenChangePassword(!openChangePassword);
	};

	return (
		<Dialog open={openChangePassword} onOpenChange={openChangeHandler}>
			<DialogContent>
				<DialogTitle>Add Roles</DialogTitle>
				<Form {...form}>
					<form name="form" onSubmit={form.handleSubmit(onSubmit)} className="grid gap-2">
						<div className="grid gap-2">
							<InputZod id="id" label="id" form={form} readonly type="hidden" />
							<InputPasswordZod
								id="newPassword"
								label="New Password"
								form={form}
							/>
							<InputPasswordZod
								id="confirmPassword"
								label="Confirm Password"
								form={form}
							/>
						</div>
						<DialogFooter className="mt-2">
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

export default ChangePasswordFormDialog;
