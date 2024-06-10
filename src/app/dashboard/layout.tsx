import MainTemplate from "@components/template";
import { ChildrenNode } from "@lib/index";

const DashboardLayout = ({ children }: ChildrenNode) => {
    return (
        <MainTemplate>
            {children}
        </MainTemplate>
    );
}

export default DashboardLayout;