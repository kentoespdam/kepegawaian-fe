import type { ChildrenNode } from "@lib/index";
import TopBarComponent from "./topbar";

const MainTemplate = ({ children }: ChildrenNode) => {
    return (
        <div className="grid grid-cols-1 gap-2 mx-auto">
            <TopBarComponent />
            <div className="grid grid-cols-1 gap-4 sm:gap-4 px-4">
                <main className="max-w-full">{children}</main>
            </div>
            <footer className="fixed bottom-0 w-full text-center">
                &copy; Perumdam Tirta Satria
            </footer>
        </div>
    );
}

export default MainTemplate;