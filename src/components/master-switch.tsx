"use client";

import { cn } from "@/lib/utils";

interface MasterSwitchProps {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
}

/** Switch toggle untuk form berat (sanksi). */
export function MasterSwitch({ checked, onChange, label }: MasterSwitchProps) {
  return (
    <div className="flex items-center justify-between py-2">
      <span className="text-sm text-foreground">{label}</span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={cn(
          "relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full",
          "border-2 border-transparent transition-colors",
          "focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
        )}
        data-state={checked ? "checked" : "unchecked"}
      >
        <span
          className={cn(
            "pointer-events-none block size-5 rounded-full bg-white shadow-sm ring-0",
            "transition-transform data-[state=checked]:translate-x-5",
            "data-[state=unchecked]:translate-x-0.5",
          )}
          data-state={checked ? "checked" : "unchecked"}
        />
      </button>
    </div>
  );
}
