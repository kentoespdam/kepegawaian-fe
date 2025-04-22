"use client";
import type { ChildrenNode } from "@lib/index";
import { useForm } from "react-hook-form";

const SearchFormComponent = ({ children }: ChildrenNode) => {
	return (
		<form id="search-form" method="get" onSubmit={(e) => e.preventDefault()}>
			{children}
		</form>
	);
};

export default SearchFormComponent;
