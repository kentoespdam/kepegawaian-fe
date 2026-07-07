"use client";

interface DataTableToolbarProps {
  children?: React.ReactNode;
}

export function DataTableToolbar({ children }: DataTableToolbarProps) {
  return (
    <div className="flex items-center justify-between gap-4 py-3">
      <div className="flex flex-1 items-center gap-3">{children}</div>
    </div>
  );
}
