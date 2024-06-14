import type { ChildrenNode } from "@lib/index";
import TopBarComponent from "./topbar";

const MainTemplate = ({ children }: ChildrenNode) => {
    return (
        <div className="max-w-screen grid grid-cols-1 gap-2 mx-auto">
            <TopBarComponent />
            <div className="grid grid-cols-1 gap-4 ">
                <main className="lg:mx-2">
                    {children}
                </main>
            </div>
            <footer className="fixed bottom-0 w-full text-center">
                &copy; Perumdam Tirta Satria 2024
            </footer>
        </div>
    );
}

export default MainTemplate;