"use client";

import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/lib/api/client";

interface ProfesiFormProps {
  editing: Record<string, unknown> | null;
  onCancel: () => void;
  error: string | null;
  setError: (e: string | null) => void;
  isSubmitting: boolean;
  submit: (data: Record<string, unknown>) => Promise<void>;
}

export function ProfesiForm({ editing, onCancel, error, setError, isSubmitting, submit }: ProfesiFormProps) {
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

  const [nama, setNama] = useState(String(editing?.nama ?? ""));
  const [organisasiId, setOrganisasiId] = useState(String(editing?.organisasiId ?? ""));
  const [jabatanId, setJabatanId] = useState(String(editing?.jabatanId ?? ""));
  const [gradeId, setGradeId] = useState(String(editing?.gradeId ?? ""));
  const [detail, setDetail] = useState(String(editing?.detail ?? ""));
  const [resiko, setResiko] = useState(String(editing?.resiko ?? ""));
  const [localError, setLocalError] = useState<string | null>(null);
  const displayError = error || localError;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);
    if (!nama.trim()) {
      setLocalError("Nama wajib diisi");
      return;
    }
    if (!detail.trim()) {
      setLocalError("Detail wajib diisi");
      return;
    }
    if (!resiko.trim()) {
      setLocalError("Resiko wajib diisi");
      return;
    }
    setError(null);
    submit({
      nama: nama.trim(),
      detail: detail.trim(),
      resiko: resiko.trim(),
      organisasiId: organisasiId || undefined,
      jabatanId: jabatanId || undefined,
      gradeId: gradeId || undefined,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-0">
      <div className="flex-1 overflow-y-auto px-4 pb-4">
        <h3 className="mb-3 mt-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Identitas</h3>
        <div className="space-y-3">
          <div className="space-y-1.5">
            <Label className="text-sm font-medium">
              Nama <span className="text-destructive">*</span>
            </Label>
            <Input value={nama} onChange={(e) => setNama(e.target.value)} className="h-11" placeholder="Nama profesi" />
          </div>
          <div className="space-y-1.5">
            <Label className="text-sm font-medium">Organisasi</Label>
            <Select value={organisasiId} onValueChange={(v) => setOrganisasiId(v ?? "")}>
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
          </div>
          <div className="space-y-1.5">
            <Label className="text-sm font-medium">Jabatan</Label>
            <Select value={jabatanId} onValueChange={(v) => setJabatanId(v ?? "")}>
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
          </div>
          <div className="space-y-1.5">
            <Label className="text-sm font-medium">Grade</Label>
            <Select value={gradeId} onValueChange={(v) => setGradeId(v ?? "")}>
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
          </div>
        </div>

        <h3 className="mb-3 mt-6 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Detail</h3>
        <div className="space-y-3">
          <div className="space-y-1.5">
            <Label className="text-sm font-medium">
              Detail <span className="text-destructive">*</span>
            </Label>
            <Textarea
              value={detail}
              onChange={(e) => setDetail(e.target.value)}
              className="min-h-24"
              placeholder="Detail profesi"
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-sm font-medium">
              Resiko <span className="text-destructive">*</span>
            </Label>
            <Textarea
              value={resiko}
              onChange={(e) => setResiko(e.target.value)}
              className="min-h-24"
              placeholder="Resiko profesi"
            />
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
