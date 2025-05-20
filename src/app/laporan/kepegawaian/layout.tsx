import MainTemplate from "@components/template";
import type { ChildrenNode } from "@lib/index";

const DashboardLayout = ({ children }: ChildrenNode) => {
	return <MainTemplate>{children}</MainTemplate>;
};

export default DashboardLayout;
