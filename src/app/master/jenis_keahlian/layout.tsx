import CustomQueryProvider from "@components/providers/query";
import type { ChildrenNode } from "@lib/index";

const Layout = ({ children }: ChildrenNode) => {
    return (
        <CustomQueryProvider>
            {children}
        </CustomQueryProvider>
    );
}

export default Layout;