import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { verifySession } from "@/lib/auth";
import { ChangePasswordForm } from "./change-password-form";

export default async function ProfilPage() {
  const user = await verifySession();
  const roles = user.prefs.roles;

  return (
    <div className="mx-auto max-w-lg space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Informasi Akun</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Nama</span>
            <p className="text-sm text-foreground">{user.name}</p>
          </div>
          <div className="space-y-1">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Email</span>
            <p className="text-sm text-foreground">{user.email}</p>
          </div>
          {roles.length > 0 && (
            <div className="space-y-1">
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Peran</span>
              <div className="flex flex-wrap gap-1.5">
                {roles.map((role) => (
                  <span
                    key={role}
                    className="inline-flex items-center rounded-md bg-muted px-2 py-0.5 text-xs font-medium text-foreground"
                  >
                    {role}
                  </span>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Ganti Password</CardTitle>
          <CardDescription>Minimal 6 karakter, harus berbeda dari password lama</CardDescription>
        </CardHeader>
        <CardContent>
          <ChangePasswordForm />
        </CardContent>
      </Card>
    </div>
  );
}
