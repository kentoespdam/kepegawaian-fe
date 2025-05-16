import MainTemplate from "@components/template";
import type { ChildrenNode } from "@lib/index";
import { Toaster } from "sonner";

const MasterLayout = ({ children }: ChildrenNode) => {
	return (
		<MainTemplate>
			{children}
			<Toaster richColors />
		</MainTemplate>
	);
};

export default MasterLayout;
