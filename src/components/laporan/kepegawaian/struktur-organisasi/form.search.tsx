"use client";

import { Button } from "@components/ui/button";
import { Form, FormField, FormItem } from "@components/ui/form";
import { Input } from "@components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { SearchIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const SearchDiagram = z.object({
	search: z.string().optional(),
});

type SearchDiagram = z.infer<typeof SearchDiagram>;

interface SearchSOFormProps {
	diagram: go.Diagram | null;
}
const SearchSOForm = ({ diagram }: SearchSOFormProps) => {
	const form = useForm<SearchDiagram>({
		resolver: zodResolver(SearchDiagram),
		defaultValues: {
			search: "",
		},
	});

	const handleSearch = ({ search }: SearchDiagram) => {
		console.log(search);
		if (!diagram) return;
		diagram.startTransaction("highlight search");

		if (!search || search === "") {
			diagram.clearHighlighteds();
			diagram.commitTransaction();
			return;
		}

		const regex = new RegExp(search, "i");
		const nodes = diagram.findNodesByExample(
			{ name: regex },
			{ jabatan: regex },
		);

		if (nodes.count === 0) {
			diagram.clearHighlighteds();
			diagram.commitTransaction();
			return;
		}

		diagram.highlightCollection(nodes);
		const first = nodes.first();
		if (first) diagram.centerRect(first.actualBounds);
		diagram.commitTransaction();
	};

	return (
		<Form {...form}>
			<form name="form" onSubmit={form.handleSubmit(handleSearch)}>
				<div className="relative">
					<FormField
						control={form.control}
						name="search"
						render={({ field }) => (
							<FormItem>
								<Input {...field} placeholder="Search" className="h-11 pr-11" />
							</FormItem>
						)}
					/>
					<Button
						type="submit"
						variant="ghost"
						className="absolute right-1 top-1"
						size="icon"
					>
						<SearchIcon className="text-primary" />
					</Button>
				</div>
			</form>
		</Form>
	);
};

export default SearchSOForm;
