"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

function logoutRequest() {
	return fetch("/api/proxy/v1/account/sessions/current", {
		method: "DELETE",
	}).then(async (res) => {
		if (!res.ok) {
			const body = await res.json().catch(() => ({}));
			throw new Error(body.message ?? "Gagal keluar");
		}
	});
}

function clearTokenCookie() {
	const secure = window.location.protocol === "https:" ? "; Secure" : "";
	// biome-ignore lint/suspicious/noDocumentCookie: Cookie Store API masih experimental, document.cookie adalah satu-satunya cara yang didukung browser
	document.cookie = `token=; Max-Age=0; path=/; SameSite=Lax${secure}`;
}

export function useLogout() {
	const router = useRouter();

	return useMutation({
		mutationFn: logoutRequest,
		onSettled: () => {
			// Clear the token cookie regardless of Appwrite response — prevent replay even if
			// session deletion fails (e.g. network blip / server error).
			clearTokenCookie();
			router.push("/login");
		},
	});
}
