"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export interface FormField {
  name: string;
  label: string;
  type?: "text" | "email" | "password" | "number" | "textarea";
  placeholder?: string;
  required?: boolean;
}

interface CrudFormProps {
  schema: z.ZodType;
  fields: FormField[];
  defaultValues?: Record<string, unknown>;
  onSubmit: (data: Record<string, unknown>) => Promise<void>;
  onCancel?: () => void;
  submitLabel?: string;
  isSubmitting?: boolean;
  error?: string | null;
}

export function CrudForm({
  schema,
  fields,
  defaultValues,
  onSubmit,
  onCancel,
  submitLabel = "Simpan",
  isSubmitting: externalSubmitting,
  error,
}: CrudFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Record<string, unknown>>({
    resolver: zodResolver(schema as never),
    defaultValues,
  });

  const submitting = externalSubmitting ?? isSubmitting;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {fields.map((field) => (
        <div key={field.name} className="space-y-1.5">
          <Label htmlFor={field.name} className="text-sm font-medium">
            {field.label}
            {field.required && <span className="ml-0.5 text-destructive">*</span>}
          </Label>
          {field.type === "textarea" ? (
            <textarea
              id={field.name}
              {...register(field.name)}
              className="h-20 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-2 text-base transition-colors outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive md:text-sm"
              placeholder={field.placeholder}
            />
          ) : (
            <Input
              id={field.name}
              type={field.type ?? "text"}
              {...register(field.name)}
              placeholder={field.placeholder}
              aria-invalid={!!errors[field.name]}
              className="h-11"
            />
          )}
          {errors[field.name] && (
            <p className="text-xs text-destructive">{String(errors[field.name]?.message ?? "")}</p>
          )}
        </div>
      ))}

      {error && <p className="text-sm text-destructive">{error}</p>}

      <div className="flex items-center justify-end gap-2 pt-2">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel} disabled={submitting}>
            Batal
          </Button>
        )}
        <Button type="submit" disabled={submitting}>
          {submitting && <Loader2 className="mr-1.5 size-4 animate-spin" />}
          {submitting ? "Menyimpan…" : submitLabel}
        </Button>
      </div>
    </form>
  );
}
