"use client";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@components/ui/form";
import { Input } from "@components/ui/input";
import type { FieldValues } from "react-hook-form";
import type { InputZodProps } from "./iface";
import { useState } from "react";
import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";

const InputPasswordZod = <TData extends FieldValues>({
	id,
	label,
	form,
	className,
	readonly,
}: InputZodProps<TData>) => {
	const [isView, setIsView] = useState(false);
	return (
		<FormField
			control={form.control}
			name={id}
			render={({ field }) => (
				<FormItem>
					<FormLabel>{label}</FormLabel>
					<FormControl>
						<div className="relative">
							<Input
								type={isView ? "text" : "password"}
								placeholder={`Masukkan ${label}`}
								readOnly={readonly}
								className={
									readonly
										? "cursor-not-allowed bg-secondary text-secondary-foreground"
										: ""
								}
								{...field}
							/>
							{isView ? (
								<EyeOpenIcon
									className="absolute right-2 top-2 cursor-pointer"
									onClick={() => setIsView(!isView)}
								/>
							) : (
								<EyeClosedIcon
									className="absolute right-2 top-2 cursor-pointer"
									onClick={() => setIsView(!isView)}
								/>
							)}
						</div>
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
};

export default InputPasswordZod;
