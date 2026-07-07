"use client";

import { Loader2 } from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useResource } from "@/hooks/useResource";

const SWITCH_LABELS: { field: string; label: string }[] = [
  { field: "potTkk", label: "Potong TKK" },
  { field: "isPendingPangkat", label: "Tunda kenaikan pangkat" },
  { field: "isPendingGaji", label: "Tunda kenaikan gaji berkala" },
  { field: "isTurunPangkat", label: "Turunkan pangkat" },
  { field: "isTurunJabatan", label: "Turunkan jabatan" },
  { field: "isSuspension", label: "Skorsing (suspension)" },
  { field: "isTerminateDh", label: "PHK dengan hormat" },
  { field: "isTerminateTh", label: "PHK tidak dengan hormat" },
];

function Switch({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <div className="flex items-center justify-between py-2">
      <span className="text-sm text-foreground">{label}</span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className="relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input"
        data-state={checked ? "checked" : "unchecked"}
      >
        <span
          className="pointer-events-none block size-5 rounded-full bg-white shadow-sm ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0.5"
          data-state={checked ? "checked" : "unchecked"}
        />
      </button>
    </div>
  );
}

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
        value: String(i.$id),
        label: String(i.nama ?? ""),
      })),
    [jenisSpList.data],
  );

  const [kode, setKode] = useState(String(editing?.kode ?? ""));
  const [keterangan, setKeterangan] = useState(String(editing?.keterangan ?? ""));
  const [jenisSpId, setJenisSpId] = useState(String(editing?.jenisSpId ?? ""));
  const [switches, setSwitches] = useState<Record<string, boolean>>(() => {
    const s: Record<string, boolean> = {};
    for (const sw of SWITCH_LABELS) s[sw.field] = Boolean((editing as Record<string, unknown>)?.[sw.field] ?? false);
    return s;
  });
  const [jmlPotTkk, setJmlPotTkk] = useState(String((editing as Record<string, unknown>)?.jmlPotTkk ?? ""));
  const [localError, setLocalError] = useState<string | null>(null);

  const displayError = error || localError;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);

    const collected: Record<string, unknown> = {
      kode: kode.trim(),
      keterangan: keterangan.trim(),
      jenisSpId,
      ...switches,
    };
    if (switches.potTkk && jmlPotTkk) collected.jmlPotTkk = Number(jmlPotTkk);

    if (!collected.kode) {
      setLocalError("Kode wajib diisi");
      return;
    }
    if (!collected.keterangan) {
      setLocalError("Keterangan wajib diisi");
      return;
    }
    if (!collected.jenisSpId) {
      setLocalError("Jenis SP wajib dipilih");
      return;
    }
    if (switches.potTkk && !jmlPotTkk) {
      setLocalError("Jumlah potong TKK wajib diisi");
      return;
    }

    try {
      await submit(collected);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Terjadi kesalahan");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-0">
      <div className="flex-1 overflow-y-auto px-4 pb-4">
        {/* ponytail: section IDENTITAS */}
        <div className="mb-4">
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Identitas</h3>
          <div className="space-y-3">
            <div className="space-y-1.5">
              <Label className="text-sm font-medium">
                Kode <span className="text-destructive">*</span>
              </Label>
              <Input
                value={kode}
                onChange={(e) => setKode(e.target.value)}
                className="h-11"
                placeholder="Kode sanksi"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-sm font-medium">
                Keterangan <span className="text-destructive">*</span>
              </Label>
              <Input
                value={keterangan}
                onChange={(e) => setKeterangan(e.target.value)}
                className="h-11"
                placeholder="Keterangan sanksi"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-sm font-medium">
                Jenis SP <span className="text-destructive">*</span>
              </Label>
              <Select value={jenisSpId} onValueChange={(v) => setJenisSpId(v ?? "")}>
                <SelectTrigger className="h-11 w-full">
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
            </div>
          </div>
        </div>

        {/* ponytail: section KONSEKUENSI SANKSI */}
        <div>
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Konsekuensi Sanksi
          </h3>
          <div className="divide-y divide-border rounded-lg border border-border">
            {SWITCH_LABELS.map((sw) => (
              <div key={sw.field} className={sw.field === "potTkk" ? "" : ""}>
                <Switch
                  checked={switches[sw.field] ?? false}
                  onChange={(v) => setSwitches((p) => ({ ...p, [sw.field]: v }))}
                  label={sw.label}
                />
                {sw.field === "potTkk" && switches.potTkk && (
                  <div className="ml-4 pb-2">
                    <Input
                      type="number"
                      value={jmlPotTkk}
                      onChange={(e) => setJmlPotTkk(e.target.value)}
                      className="h-11 tabular-nums"
                      placeholder="Jumlah potong TKK"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {displayError && <p className="mt-3 text-sm text-destructive">{displayError}</p>}
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
