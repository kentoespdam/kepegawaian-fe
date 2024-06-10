import { ChildrenNode } from "@lib/index";
import TopBarComponent from "./topbar";

const MainTemplate = ({ children }: ChildrenNode) => {
    return (
        <div className="grid grid-cols-1 gap-2 mx-auto">
            <TopBarComponent />
            <main className="max-w-full">{children}</main>
            <footer className="fixed bottom-0 w-full text-center">
                &copy; Perumdam Tirta Satria
            </footer>
        </div>
    );
}

export default MainTemplate;