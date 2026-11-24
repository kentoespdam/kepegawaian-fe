import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function SoPageSkeleton() {
	return (
		<div className="p-6 space-y-4">
			<div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
				<div className="space-y-2">
					<Skeleton className="h-8 w-64" />
					<Skeleton className="h-4 w-96" />
				</div>
				<div className="flex items-center gap-2">
					<Skeleton className="h-9 w-48" />
				</div>
			</div>

			<Card className="overflow-hidden border">
				<CardHeader className="py-3 px-4 border-b bg-muted/30">
					<div className="flex items-center justify-between">
						<Skeleton className="h-8 w-56" />
						<div className="flex items-center gap-2">
							<Skeleton className="h-8 w-8" />
							<Skeleton className="h-8 w-8" />
							<Skeleton className="h-8 w-8" />
							<Skeleton className="h-8 w-8" />
						</div>
					</div>
				</CardHeader>
				<CardContent className="p-0">
					<div className="h-[700px] w-full flex items-center justify-center bg-muted/10">
						<div className="flex flex-col items-center gap-3 text-muted-foreground">
							<Skeleton className="h-28 w-60 rounded-xl" />
							<div className="flex gap-4">
								<Skeleton className="h-28 w-56 rounded-xl" />
								<Skeleton className="h-28 w-56 rounded-xl" />
							</div>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
