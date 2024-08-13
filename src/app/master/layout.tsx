import MainTemplate from "@components/template";
import type { ChildrenNode } from "@lib/index";

const MasterLayout = ({ children }: ChildrenNode) => {
    return (
        <MainTemplate>
            {children}
        </MainTemplate>
    );
}

export default MasterLayout;