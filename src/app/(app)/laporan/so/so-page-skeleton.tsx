import { Skeleton } from "@/components/ui/skeleton";

export function SoChartSkeleton() {
	return (
		<section
			aria-label="Memuat struktur organisasi"
			aria-busy="true"
			className="overflow-hidden rounded-xl border bg-background"
		>
			<div className="flex flex-wrap items-center justify-between gap-4 border-b p-4">
				<Skeleton className="h-11 w-full max-w-sm" />
				<Skeleton className="h-11 w-40" />
			</div>
			<div className="flex h-160 flex-col items-center gap-8 bg-muted/30 px-4 py-12">
				<Skeleton className="h-40 w-full max-w-72 rounded-lg" />
				<div className="h-8 w-px bg-border" />
				<div className="flex w-full max-w-2xl gap-4">
					<Skeleton className="h-40 min-w-0 flex-1 rounded-lg" />
					<Skeleton className="h-40 min-w-0 flex-1 rounded-lg" />
				</div>
			</div>
		</section>
	);
}

export function SoPageSkeleton() {
	return (
		<div className="min-w-0 space-y-6 p-4 md:p-6">
			<div className="flex flex-col justify-between gap-6 xl:flex-row xl:items-end">
				<div className="min-w-0 space-y-2">
					<Skeleton className="h-8 w-64 max-w-full" />
					<Skeleton className="h-6 w-96 max-w-full" />
				</div>
				<div className="w-full space-y-2 sm:max-w-sm xl:w-80">
					<Skeleton className="h-6 w-36" />
					<Skeleton className="h-11 w-full" />
				</div>
			</div>
			<SoChartSkeleton />
		</div>
	);
}
