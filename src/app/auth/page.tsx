import logo from "@public/images/logo_pdam_40x40.png";
import Image from "next/image";
import Link from "next/link";
import LoginForm from "./form.index";
import { cookies } from "next/headers";

const AuthPage = () => {
	let callbackUrl = (cookies().get("callback_url")?.value as string) ?? "";
	callbackUrl = callbackUrl.replace("undefined", "");

	return (
		<section className="bg-gray-50 dark:bg-gray-900">
			<div className="mx-auto flex flex-col items-center justify-center px-3 py-8 md:h-screen lg:py-0">
				<Link
					href="#"
					className="mb-6 flex items-center text-2xl font-semibold text-gray-900 dark:text-white"
				>
					<Image
						className="mr-2 h-8 w-8"
						src={logo}
						width={40}
						height={40}
						alt="logo"
					/>
					Perumdam Tirta Satria
				</Link>
				<div className="w-full rounded-lg bg-white shadow dark:border dark:border-gray-700 dark:bg-gray-800 sm:max-w-md md:mt-0 xl:p-0">
					<div className="space-y-4 p-6 sm:p-8 md:space-y-6">
						<h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl">
							Sign in to your account
						</h1>
						<LoginForm callbackUrl={callbackUrl} />
					</div>
				</div>
			</div>
		</section>
	);
};

export default AuthPage;
