import type { ChildrenNode } from "@lib/index"
import TopBarComponent from "./topbar"
import getAppData from "@lib/app-data"

const MainTemplate = async ({ children }: ChildrenNode) => {
	const appData = await getAppData()

	return (
		<>
			<div className="mx-auto mb-10 grid max-w-full gap-4">
				<TopBarComponent appData={appData} />
				<main className="mx-6 max-w-full sm:mx-2 md:mx-4">
					{children}
				</main>
			</div>
			<footer className="fixed bottom-0 w-full max-w-full bg-white text-center">
				&copy; Perumdam Tirta Satria 2024
			</footer>
		</>
	)
}

export default MainTemplate
