"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";

function loginRequest({ email, password }: { email: string; password: string }) {
	return fetch("/api/proxy/v1/account/sessions/email", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ email, password }),
	}).then(async (res) => {
		if (!res.ok) {
			const body = await res.json().catch(() => ({}));
			throw new Error(body.message ?? "Email atau password salah");
		}
	});
}

export function useLogin() {
	const router = useRouter();
	const searchParams = useSearchParams();

	return useMutation({
		mutationFn: loginRequest,
		onSuccess: () => {
			const next = searchParams.get("next") ?? "/";
			router.push(next);
			router.refresh();
		},
	});
}
