"use client";

import { LoadingButtonClient } from "@components/builder/loading-button-client";
import TooltipBuilder from "@components/builder/tooltip";
import InputZod from "@components/form/zod/input";
import { Form } from "@components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGlobalMutation } from "@store/query-store";
import { LogInIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { doLogin } from "./action";

export const LoginSchema = z.object({
	username: z.string().min(5),
	password: z.string().min(5),
	email: z.string().email().optional(),
});

export type LoginSchema = z.infer<typeof LoginSchema>;
const LoginForm = () => {
	const form = useForm<LoginSchema>({
		resolver: zodResolver(LoginSchema),
		defaultValues: {
			username: "",
			password: "",
		},
	});

	const mutation = useGlobalMutation({
		mutationFunction: doLogin,
		queryKeys: [],
	});

	const handleSubmit = (data: LoginSchema) => {
		mutation.mutate(data);
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(handleSubmit)} className="grid gap-4">
				<InputZod id="username" label="Username" form={form} />
				<InputZod id="password" label="Password" type="password" form={form} />
				<TooltipBuilder text="Save" delayDuration={100}>
					<LoadingButtonClient
						pending={mutation.isPending}
						type="submit"
						title="Login"
						icon={<LogInIcon />}
					/>
				</TooltipBuilder>
			</form>
		</Form>
	);
};

export default LoginForm;
