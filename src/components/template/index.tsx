import type { ChildrenNode } from "@lib/index";
import TopBarComponent from "./topbar";

const MainTemplate = ({ children }: ChildrenNode) => {
    return (
        <div className="grid grid-cols-1 gap-2 mx-auto">
            <TopBarComponent />
            <div className="grid grid-cols-1 gap-4 sm:gap-2 px-4 sm:px-2">
                <main className="max-w-full lg:mx-2">{children}</main>
            </div>
            <footer className="fixed bottom-0 w-full text-center">
                &copy; Perumdam Tirta Satria 2024
            </footer>
        </div>
    );
}

export default MainTemplate;