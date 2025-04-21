import MainTemplate from "@components/template";
import type { ChildrenNode } from "@lib/index";


const Layout = ({ children }: ChildrenNode) => {
    return (
        <MainTemplate>
            {children}
        </MainTemplate>
    );
}

export default Layout;