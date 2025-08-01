"use client";
import { BaseDelete } from "@_types/index";
import { Alert, AlertDescription } from "@components/ui/alert";
import {
	AlertDialog,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@components/ui/alert-dialog";
import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DeleteIcon } from "lucide-react";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { LoadingButtonClient } from "../loading-button-client";
import TooltipBuilder from "../tooltip";

type ButtonDeleteBuilderProps = {
	id: number;
	msg: string;
	tag: string;
	action: (formData: FormData) => Promise<{
		success: boolean;
		error?: {
			message: string;
		};
	}>;
};

const deleteText = "DELETE-";
const ButtonDeleteBuilder = (props: ButtonDeleteBuilderProps) => {
	const { action } = props;
	const [state, setState] = useState<{
		success: boolean;
		error?: {
			message: string;
		};
	} | null>(null);
	const [open, setOpen] = React.useState(false);
	const searchParams = useSearchParams();
	const search = new URLSearchParams(searchParams);

	const form = useForm<BaseDelete>({
		resolver: zodResolver(BaseDelete),
		defaultValues: {
			id: "",
			curId: props.id,
		},
	});

	const client = useQueryClient();

	const mutation = useMutation({
		mutationFn: async (formData: FormData) => {
			const result = await action(formData);
			if (result.success === false) {
				setState(result);
				return;
			}
		},
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		onError: (err: any) => {
			setState(err);
		},
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		onSuccess: (result: any) => {
			setState(result);
			setOpen(false);
			client.invalidateQueries({
				queryKey: [props.tag, search.toString()],
				refetchType: "active",
			});
		},
	});

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		mutation.mutate(new FormData(e.currentTarget));
	};

	return (
		<AlertDialog key={props.id} open={open} onOpenChange={setOpen}>
			<TooltipBuilder
				text={props.msg}
				className="bg-destructive text-destructive-foreground"
			>
				<AlertDialogTrigger id={String(props.id)} asChild>
					<Button
						id={String(props.id)}
						variant="ghost"
						size="icon"
						className="p-0 h-7 w-7"
					>
						<DeleteIcon
							className="h-5 w-5 text-destructive"
							aria-hidden="true"
						/>
					</Button>
				</AlertDialogTrigger>
			</TooltipBuilder>
			<AlertDialogContent>
				<form name="form" onSubmit={handleSubmit}>
					<AlertDialogHeader>
						<AlertDialogTitle>Yakin akan menghapus data?</AlertDialogTitle>
						<AlertDialogDescription>
							proses ini tidak bisa dibatalkan dan data yang terhapus tidak
							dapat dikembalikan.
							<br />
							Ketik{" "}
							<code className="font-normal bg-orange-300 text-gray-700 dark:text-gray-900 border px-1">
								{`${deleteText}${props.id}`}
							</code>
							<Input
								name="deleteRef"
								placeholder="ketik disini"
								className="mt-2"
								autoComplete="off"
							/>
						</AlertDialogDescription>
						{state && !state.success ? (
							<Alert variant="destructive" className="mt-2 p-2">
								<AlertDescription>{state.error?.message}</AlertDescription>
							</Alert>
						) : null}
					</AlertDialogHeader>
					<AlertDialogFooter className="mt-2">
						<AlertDialogCancel>Cancel</AlertDialogCancel>
						<LoadingButtonClient
							pending={mutation.isPending}
							title="Save"
							type="submit"
							className="bg-destructive text-destructive-foreground"
						/>
					</AlertDialogFooter>
				</form>
			</AlertDialogContent>
		</AlertDialog>
	);
};

export default ButtonDeleteBuilder;

/**
 


 */
