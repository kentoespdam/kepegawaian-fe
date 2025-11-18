"use client";

import { ProfilUpdateSchema } from "@_types/profil/profil-update";
import { LoadingButtonClient } from "@components/builder/loading-button-client";
import TooltipBuilder from "@components/builder/tooltip";
import InputZod from "@components/form/zod/input";
import { Button } from "@components/ui/button";
import { DialogFooter } from "@components/ui/dialog";
import { Form } from "@components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogClose } from "@radix-ui/react-dialog";
import { useProfilUpdateStore } from "@store/kepegawaian/profil/profil-update-store";
import { useGlobalMutation } from "@store/query-store";
import { CheckCircle2Icon, XCircleIcon, XIcon } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { memo, useCallback } from "react";
import { useForm } from "react-hook-form";
import { saveApprovalProfil } from "./action";

// Constants
const BUTTON_CONFIGS = [
	{
		action: "APPROVED" as const,
		tooltip: "Setujui Perubahan",
		icon: CheckCircle2Icon,
		iconClass: "size-4 text-primary",
		buttonClass: "border-b border-primary",
		tooltipClass: "bg-primary text-primary-foreground",
		title: "Setujui Perubahan",
	},
	{
		action: "REJECT" as const,
		tooltip: "Tolak Perubahan",
		icon: XCircleIcon,
		iconClass: "size-4 text-destructive",
		buttonClass: "border-b border-destructive",
		tooltipClass: "bg-destructive text-destructive-foreground",
		title: "Tolak Perubahan",
	},
] as const;

interface ActionButtonProps {
	config: (typeof BUTTON_CONFIGS)[number];
	isPending: boolean;
	onSetApproval: (value: "APPROVED" | "REJECT") => void;
}

const ActionButton = memo<ActionButtonProps>(
	({ config, isPending, onSetApproval }) => {
		const {
			action,
			tooltip,
			icon: Icon,
			iconClass,
			buttonClass,
			tooltipClass,
			title,
		} = config;

		const handleClick = useCallback(() => {
			onSetApproval(action);
		}, [action, onSetApproval]);

		return (
			<TooltipBuilder text={tooltip} delayDuration={0} className={tooltipClass}>
				<LoadingButtonClient
					title={title}
					variant="ghost"
					onClick={handleClick}
					icon={<Icon className={iconClass} />}
					pending={isPending}
					size="sm"
					className={buttonClass}
					type="submit"
				/>
			</TooltipBuilder>
		);
	},
);

ActionButton.displayName = "ActionButton";

const CloseButton = memo(() => {
	const onClose = useCallback(() => {
		// Reset form logic jika diperlukan
	}, []);

	return (
		<TooltipBuilder
			text="Tutup"
			delayDuration={0}
			className="bg-destructive text-destructive-foreground"
		>
			<DialogClose asChild>
				<Button
					variant="ghost"
					size="sm"
					onClick={onClose}
					className="border-b border-destructive"
				>
					<XIcon className="size-4 text-destructive" />
					<span>Tutup</span>
				</Button>
			</DialogClose>
		</TooltipBuilder>
	);
});

CloseButton.displayName = "CloseButton";

const ApprovalFormComponent = memo(() => {
	const params = useSearchParams();
	const { defaultValues, setOpen } = useProfilUpdateStore((state) => ({
		defaultValues: state.defaultValues,
		setOpen: state.setOpen,
	}));

	const form = useForm<ProfilUpdateSchema>({
		resolver: zodResolver(ProfilUpdateSchema),
		defaultValues,
		values: defaultValues,
	});

	const { mutate, isPending } = useGlobalMutation({
		mutationFunction: saveApprovalProfil,
		queryKeys: [["approval-profil", params.toString()]],
		actHandler: useCallback(() => setOpen(false), [setOpen]),
	});

	const onSubmit = useCallback(
		(values: ProfilUpdateSchema) => mutate(values),
		[mutate],
	);

	const handleSetApproval = useCallback(
		(approval: "APPROVED" | "REJECT") => {
			form.setValue("approval", approval);
			form.handleSubmit(onSubmit)();
		},
		[form, onSubmit],
	);

	return (
		<DialogFooter>
			<Form {...form}>
				<form name="form-approval-profil">
					<InputZod type="hidden" id="id" form={form} />
					<InputZod type="hidden" id="pegawaiId" form={form} />
					<InputZod type="hidden" id="approval" form={form} />

					<div className="flex gap-2">
						{BUTTON_CONFIGS.map((config) => (
							<ActionButton
								key={config.action}
								config={config}
								isPending={isPending}
								onSetApproval={handleSetApproval}
							/>
						))}
						<CloseButton />
					</div>
				</form>
			</Form>
		</DialogFooter>
	);
});

ApprovalFormComponent.displayName = "ApprovalFormComponent";

export default ApprovalFormComponent;