import CustomQueryProvider from "@components/providers/query";
import { ChildrenNode } from "@lib/index";

const Layout = ({ children }: ChildrenNode) => {
    return (
        <CustomQueryProvider>
            {children}
        </CustomQueryProvider>
    );
}

export default Layout;