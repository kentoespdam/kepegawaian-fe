import { Suspense } from "react";
import { LoginForm } from "./login-form";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen">
      <div className="hidden w-[45%] flex-col items-center justify-center gap-4 bg-linear-to-b from-primary-dark to-primary p-8 text-center text-primary-foreground md:flex">
        <div className="relative size-full overflow-hidden rounded-2xl opacity-30">
          <div className="absolute inset-0 animate-water bg-[radial-gradient(ellipse_at_30%_50%,rgba(255,255,255,0.3)_0%,transparent_60%),radial-gradient(ellipse_at_70%_30%,rgba(255,255,255,0.2)_0%,transparent_50%),radial-gradient(ellipse_at_50%_70%,rgba(255,255,255,0.15)_0%,transparent_40%)] bg-size-[200%_200%]" />
        </div>
        <div className="relative z-10">
          <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-primary-foreground/20 text-2xl font-bold text-primary-foreground">
            T
          </div>
          <h1 className="text-2xl font-semibold">PERUMDAM TIRTA SATRIA</h1>
          <p className="mt-2 text-lg text-primary-foreground/80">Sistem Kepegawaian</p>
          <p className="mt-1 text-sm text-primary-foreground/60 italic">&ldquo;Melayani dengan Sepenuh Hati&rdquo;</p>
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center p-6">
        <div className="w-full max-w-sm">
          <div className="mb-8 text-center md:hidden">
            <div className="mx-auto mb-3 flex size-12 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
              T
            </div>
            <h1 className="text-lg font-semibold text-foreground">PERUMDAM TIRTA SATRIA</h1>
            <p className="text-sm text-muted-foreground">Sistem Kepegawaian</p>
          </div>

          <Suspense fallback={null}>
            <LoginForm />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
