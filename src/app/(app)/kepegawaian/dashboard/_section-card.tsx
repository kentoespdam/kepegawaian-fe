export function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
	return (
		<div className="rounded-lg border bg-card shadow-sm">
			<div className="border-b border-border px-5 py-3">
				<h3 className="text-sm font-semibold text-foreground">{title}</h3>
			</div>
			<div className="px-5 py-4">{children}</div>
		</div>
	);
}
