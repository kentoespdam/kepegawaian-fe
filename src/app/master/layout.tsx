import MainTemplate from "@components/template";
import { ChildrenNode } from "@lib/index";

const MasterLayout = ({ children }: ChildrenNode) => {
    return (
        <MainTemplate>
            {children}
        </MainTemplate>
    );
}

export default MasterLayout;