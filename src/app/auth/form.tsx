"use client"

import AlertBuilder from "@components/builder/alert";
import { LoadingButton } from "@components/builder/loading-button";
import { Input } from "@components/ui/input";
import { redirect } from "next/navigation";
import { useFormState } from "react-dom";
import { doLogin } from "./action";

const LoginForm = () => {
    const [state, action] = useFormState(doLogin, null);
    if (state?.isAuth) redirect(decodeURIComponent(state.callbackUrl));

    return (
        <>
            {state && !state.isAuth ? (
                <AlertBuilder variant="destructive" message={state.message} />
            ) : state !== null ? (
                <AlertBuilder message={JSON.stringify(state.message)} />
            ) : null}
            <form className="space-y-4 md:space-y-6" action={action}>
                <div>
                    <label
                        htmlFor="username"
                        className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Username
                    </label>
                    <Input
                        type="text"
                        name="username"
                        id="username"
                        className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                        placeholder="name@company.com"
                        required
                    />
                </div>
                <div>
                    <label
                        htmlFor="password"
                        className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Password
                    </label>
                    <Input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="••••••••"
                        className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                        required
                    />
                </div>
                <LoadingButton variant="outline" title="LOGIN" className="w-full" />
            </form>
        </>
    );
}

export default LoginForm;