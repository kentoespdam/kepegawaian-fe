"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MasterSwitch } from "@/components/master-switch";
import { useResource } from "@/hooks/useResource";
import {
  sanksiSchema,
  SWITCH_LABELS,
  sanksiDefaults,
  type SanksiFormValues,
} from "./sanksi-schema";

// — Props (compatible with EntityFormModal) —

interface SanksiFormProps {
  editing: Record<string, unknown> | null;
  onCancel: () => void;
  error: string | null;
  setError: (e: string | null) => void;
  isSubmitting: boolean;
  submit: (data: Record<string, unknown>) => Promise<void>;
}

export function SanksiForm({ editing, onCancel, error, setError, isSubmitting, submit }: SanksiFormProps) {
  const { listAll: jenisSpList } = useResource<Record<string, unknown>[]>("jenis-sp");

  const jenisSpOpts = useMemo(
    () =>
      (jenisSpList.data ?? []).map((i: Record<string, unknown>) => ({
        value: String(i.id),
        label: String(i.nama ?? ""),
      })),
    [jenisSpList.data],
  );

  const {
    register,
    handleSubmit: rhfSubmit,
    setValue,
    watch,
    formState: { errors: rhfErrors },
  } = useForm<SanksiFormValues>({
    resolver: zodResolver(sanksiSchema as never),
    defaultValues: sanksiDefaults(editing),
  });

  const watchPotTkk = watch("potTkk");

  const onFormSubmit = async (values: SanksiFormValues) => {
    setError(null);
    try {
      const payload: Record<string, unknown> = {
        kode: values.kode,
        keterangan: values.keterangan,
        jenisSpId: values.jenisSpId,
        potTkk: values.potTkk,
        isPendingPangkat: values.isPendingPangkat,
        isPendingGaji: values.isPendingGaji,
        isTurunPangkat: values.isTurunPangkat,
        isTurunJabatan: values.isTurunJabatan,
        isSuspension: values.isSuspension,
        isTerminateDh: values.isTerminateDh,
        isTerminateTh: values.isTerminateTh,
      };
      if (values.potTkk && values.jmlPotTkk !== undefined) {
        payload.jmlPotTkk = values.jmlPotTkk;
      }
      await submit(payload);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Terjadi kesalahan");
    }
  };

  const fieldError = (name: keyof SanksiFormValues) => {
    const e = rhfErrors[name];
    return e ? <p className="text-xs text-destructive">{String(e.message ?? "")}</p> : null;
  };

  return (
    <form onSubmit={rhfSubmit(onFormSubmit)} className="flex flex-col gap-0">
      <div className="flex-1 overflow-y-auto px-4 pb-4">
        {/* IDENTITAS */}
        <div className="mb-4">
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Identitas</h3>
          <div className="space-y-3">
            <div className="space-y-1.5">
              <Label className="text-sm font-medium">
                Kode <span className="text-destructive">*</span>
              </Label>
              <Input {...register("kode")} className="h-11" placeholder="Kode sanksi" aria-invalid={!!rhfErrors.kode} />
              {fieldError("kode")}
            </div>
            <div className="space-y-1.5">
              <Label className="text-sm font-medium">
                Keterangan <span className="text-destructive">*</span>
              </Label>
              <Input
                {...register("keterangan")}
                className="h-11"
                placeholder="Keterangan sanksi"
                aria-invalid={!!rhfErrors.keterangan}
              />
              {fieldError("keterangan")}
            </div>
            <div className="space-y-1.5">
              <Label className="text-sm font-medium">
                Jenis SP <span className="text-destructive">*</span>
              </Label>
              <Select
                value={String(watch("jenisSpId") ?? "")}
                onValueChange={(v) => setValue("jenisSpId", Number(v), { shouldValidate: true })}
              >
                <SelectTrigger className="h-11 w-full" aria-invalid={!!rhfErrors.jenisSpId}>
                  <SelectValue placeholder="Pilih jenis SP" />
                </SelectTrigger>
                <SelectContent>
                  {jenisSpOpts.map((o) => (
                    <SelectItem key={o.value} value={o.value}>
                      {o.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {fieldError("jenisSpId")}
            </div>
          </div>
        </div>

        {/* KONSEKUENSI SANKSI */}
        <div>
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Konsekuensi Sanksi
          </h3>
          <div className="divide-y divide-border rounded-lg border border-border">
            {SWITCH_LABELS.map((sw) => (
              <div key={sw.field}>
                <MasterSwitch
                  checked={Boolean(watch(sw.field))}
                  onChange={(v) => setValue(sw.field, v, { shouldValidate: true })}
                  label={sw.label}
                />
                {sw.field === "potTkk" && watchPotTkk && (
                  <div className="ml-4 pb-2">
                    <Input
                      type="number"
                      {...register("jmlPotTkk")}
                      className="h-11 tabular-nums"
                      placeholder="Jumlah potong TKK"
                      aria-invalid={!!rhfErrors.jmlPotTkk}
                    />
                    {fieldError("jmlPotTkk")}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {(error || rhfErrors.root?.message) && (
          <p className="mt-3 text-sm text-destructive">{error || rhfErrors.root?.message}</p>
        )}
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
