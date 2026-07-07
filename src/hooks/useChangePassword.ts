"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

function changePassword({ oldPassword, newPassword }: { oldPassword: string; newPassword: string }) {
  return fetch("/api/proxy/v1/account/password", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password: newPassword, oldPassword }),
  }).then(async (res) => {
    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      throw new Error(body.message ?? "Gagal mengubah password");
    }
  });
}

export function useChangePassword() {
  return useMutation({
    mutationFn: changePassword,
    onSuccess: () => {
      toast.success("Password berhasil diganti");
    },
  });
}
