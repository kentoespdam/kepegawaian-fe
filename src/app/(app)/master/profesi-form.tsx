"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/lib/api/client";

// — Schema co-located —

const profesiSchema = z.object({
  nama: z.string().min(1, "Nama wajib diisi"),
  detail: z.string().min(1, "Detail wajib diisi"),
  resiko: z.string().min(1, "Resiko wajib diisi"),
  organisasiId: z.coerce.number().optional(),
  jabatanId: z.coerce.number().optional(),
  gradeId: z.coerce.number().optional(),
});

type ProfesiFormValues = z.infer<typeof profesiSchema>;

// — Props (compatible with EntityFormModal) —

interface ProfesiFormProps {
  editing: Record<string, unknown> | null;
  onCancel: () => void;
  error: string | null;
  setError: (e: string | null) => void;
  isSubmitting: boolean;
  submit: (data: Record<string, unknown>) => Promise<void>;
}

export function ProfesiForm({ editing, onCancel, error, setError, isSubmitting, submit }: ProfesiFormProps) {
  // — FK source queries —

  const orgQ = useQuery({
    queryKey: ["organisasi", "list"],
    queryFn: () => api.listAll<Record<string, unknown>>("organisasi"),
    staleTime: 300_000,
  });
  const jabQ = useQuery({
    queryKey: ["jabatan", "list"],
    queryFn: () => api.listAll<Record<string, unknown>>("jabatan"),
    staleTime: 300_000,
  });
  const gradeQ = useQuery({
    queryKey: ["grade", "list"],
    queryFn: () => api.listAll<Record<string, unknown>>("grade"),
    staleTime: 300_000,
  });

  const orgData = orgQ.data as Record<string, unknown>[] | undefined;
  const jabData = jabQ.data as Record<string, unknown>[] | undefined;
  const gradeData = gradeQ.data as Record<string, unknown>[] | undefined;

  const orgOpts = useMemo(
    () => (orgData ?? []).map((i) => ({ value: String(i.id), label: String(i.nama ?? "") })),
    [orgData],
  );
  const jabOpts = useMemo(
    () => (jabData ?? []).map((i) => ({ value: String(i.id), label: String(i.nama ?? "") })),
    [jabData],
  );
  const gradeOpts = useMemo(
    () => (gradeData ?? []).map((i) => ({ value: String(i.id), label: String(i.nama ?? "") })),
    [gradeData],
  );

  // — Form —

  const {
    register,
    handleSubmit: rhfSubmit,
    setValue,
    watch,
    formState: { errors: rhfErrors },
  } = useForm<ProfesiFormValues>({
    // ponytail: Zod v4 vs hookform — cast diperlukan
    resolver: zodResolver(profesiSchema as never),
    defaultValues: {
      nama: String(editing?.nama ?? ""),
      detail: String(editing?.detail ?? ""),
      resiko: String(editing?.resiko ?? ""),
      organisasiId: Number(editing?.organisasiId ?? 0) || undefined,
      jabatanId: Number(editing?.jabatanId ?? 0) || undefined,
      gradeId: Number(editing?.gradeId ?? 0) || undefined,
    },
  });

  // — Submit handler —

  const onFormSubmit = async (values: ProfesiFormValues) => {
    setError(null);
    try {
      const payload: Record<string, unknown> = {
        nama: values.nama,
        detail: values.detail,
        resiko: values.resiko,
        organisasiId: values.organisasiId || undefined,
        jabatanId: values.jabatanId || undefined,
        gradeId: values.gradeId || undefined,
      };
      await submit(payload);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Terjadi kesalahan");
    }
  };

  // — Render helpers —

  const fieldError = (name: keyof ProfesiFormValues) => {
    const e = rhfErrors[name];
    return e ? <p className="text-xs text-destructive">{String(e.message ?? "")}</p> : null;
  };

  return (
    <form onSubmit={rhfSubmit(onFormSubmit)} className="flex flex-col gap-0">
      <div className="flex-1 overflow-y-auto px-4 pb-4">
        <h3 className="mb-3 mt-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Identitas</h3>
        <div className="space-y-3">
          <div className="space-y-1.5">
            <Label className="text-sm font-medium">
              Nama <span className="text-destructive">*</span>
            </Label>
            <Input
              {...register("nama")}
              className="h-11"
              placeholder="Nama profesi"
              aria-invalid={!!rhfErrors.nama}
            />
            {fieldError("nama")}
          </div>
          <div className="space-y-1.5">
            <Label className="text-sm font-medium">Organisasi</Label>
            <Select
              value={String(watch("organisasiId") ?? "")}
              onValueChange={(v) => setValue("organisasiId", Number(v) || undefined, { shouldValidate: true })}
            >
              <SelectTrigger className="h-11 w-full">
                <SelectValue placeholder="Pilih organisasi" />
              </SelectTrigger>
              <SelectContent>
                {orgOpts.map((o) => (
                  <SelectItem key={o.value} value={o.value}>
                    {o.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {fieldError("organisasiId")}
          </div>
          <div className="space-y-1.5">
            <Label className="text-sm font-medium">Jabatan</Label>
            <Select
              value={String(watch("jabatanId") ?? "")}
              onValueChange={(v) => setValue("jabatanId", Number(v) || undefined, { shouldValidate: true })}
            >
              <SelectTrigger className="h-11 w-full">
                <SelectValue placeholder="Pilih jabatan" />
              </SelectTrigger>
              <SelectContent>
                {jabOpts.map((o) => (
                  <SelectItem key={o.value} value={o.value}>
                    {o.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {fieldError("jabatanId")}
          </div>
          <div className="space-y-1.5">
            <Label className="text-sm font-medium">Grade</Label>
            <Select
              value={String(watch("gradeId") ?? "")}
              onValueChange={(v) => setValue("gradeId", Number(v) || undefined, { shouldValidate: true })}
            >
              <SelectTrigger className="h-11 w-full">
                <SelectValue placeholder="Pilih grade" />
              </SelectTrigger>
              <SelectContent>
                {gradeOpts.map((o) => (
                  <SelectItem key={o.value} value={o.value}>
                    {o.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {fieldError("gradeId")}
          </div>
        </div>

        <h3 className="mb-3 mt-6 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Detail</h3>
        <div className="space-y-3">
          <div className="space-y-1.5">
            <Label className="text-sm font-medium">
              Detail <span className="text-destructive">*</span>
            </Label>
            <Textarea
              {...register("detail")}
              className="min-h-24"
              placeholder="Detail profesi"
              aria-invalid={!!rhfErrors.detail}
            />
            {fieldError("detail")}
          </div>
          <div className="space-y-1.5">
            <Label className="text-sm font-medium">
              Resiko <span className="text-destructive">*</span>
            </Label>
            <Textarea
              {...register("resiko")}
              className="min-h-24"
              placeholder="Resiko profesi"
              aria-invalid={!!rhfErrors.resiko}
            />
            {fieldError("resiko")}
          </div>
        </div>

        {error && <p className="mt-3 text-sm text-destructive">{error}</p>}
      </div>

      <div className="sticky bottom-0 flex items-center justify-end gap-2 border-t border-border bg-popover p-4">
        <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
          Batal
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting && <Loader2 className="mr-1.5 size-4 animate-spin" />}
          {isSubmitting ? "Menyimpan\u2026" : "Simpan"}
        </Button>
      </div>
    </form>
  );
}
