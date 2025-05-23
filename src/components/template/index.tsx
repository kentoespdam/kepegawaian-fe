import type { ChildrenNode } from "@lib/index";
import { getUser } from "./action";
import TopBarComponent from "./topbar";

const MainTemplate = async ({ children }: ChildrenNode) => {
	const user = await getUser();
	return (
		<>
			<div className="max-w-full grid gap-4 mx-auto mb-10">
				<TopBarComponent user={user} />
				<main className="max-w-full mx-6 md:mx-4 sm:mx-2">{children}</main>
			</div>
			<footer className="max-w-full fixed bottom-0 w-full text-center bg-white">
				&copy; Perumdam Tirta Satria 2024
			</footer>
		</>
	);
};

export default MainTemplate;
