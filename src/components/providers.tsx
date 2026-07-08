"use client";

import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { ApiError } from "@/lib/api/client";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

/** Dedup flag — prevents multiple toasts when several queries fail 401 simultaneously. */
let sessionExpiredHandled = false;

function handleSessionExpired() {
  if (sessionExpiredHandled) return;
  sessionExpiredHandled = true;

  toast.error("Sesi berakhir, silakan masuk kembali");

  const next = encodeURIComponent(window.location.pathname + window.location.search);
  setTimeout(() => {
    window.location.href = `/login?next=${next}`;
  }, 2000);
}

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        queryCache: new QueryCache({
          onError: (error) => {
            if (error instanceof ApiError && error.status === 401) {
              handleSessionExpired();
            }
          },
        }),
        mutationCache: new MutationCache({
          onError: (error) => {
            if (error instanceof ApiError && error.status === 401) {
              handleSessionExpired();
            }
          },
        }),
        defaultOptions: {
          queries: { gcTime: 300_000, staleTime: 30_000, retry: 1 },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
