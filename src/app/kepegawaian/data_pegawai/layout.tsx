import CustomQueryProvider from "@components/providers/query";
import type { ChildrenNode } from "@lib/index";

const Layout = ({ children }: ChildrenNode) => {
    return (
        <CustomQueryProvider>
            <div dir="ltr" data-aria-orientation="horizontal">
                {children}
            </div>
        </CustomQueryProvider>
    );
}

export default Layout;