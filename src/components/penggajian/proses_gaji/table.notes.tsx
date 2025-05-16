import type {
    GajiBatchRoot,
    GajiBatchRootErrorLogs,
} from "@_types/penggajian/gaji_batch_root";
import { Button } from "@components/ui/button";
import { TableCell } from "@components/ui/table";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@components/ui/tooltip";
import { cn } from "@lib/utils";

interface GajiBatchRootNotesProps {
	data: GajiBatchRoot;
}
const NotesErrorTooltip = (props: GajiBatchRootNotesProps) => {
	const notes = props.data.notes
		? JSON.parse(props.data.notes)
		: { valid: 0, error: 0 };
	return (
		<TooltipProvider>
			<Tooltip delayDuration={100}>
				<TooltipTrigger asChild>
					<Button variant="ghost">
						valid : {notes.valid}, error: {notes.error}
					</Button>
				</TooltipTrigger>
				<TooltipContent className="bg-white shadow-md border text-black">
					<ul>
						{props.data.errorLogs.map((log: GajiBatchRootErrorLogs) => (
							<li key={log.id}>
								{log.nipam}-{log.nama}:{" "}
								<span className="text-destructive">{log.notes}</span>
							</li>
						))}
					</ul>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
};

const GajiBatchRootNotesCell = (props: GajiBatchRootNotesProps) => {
	const notes = props.data.notes
		? JSON.parse(props.data.notes)
		: { valid: 0, error: 0 };
	return (
		<TableCell
			className={cn(
				"border-x whitespace-nowrap",
				notes.error ? "text-destructive" : "text-primary",
			)}
		>
			{notes.error > 0 ? (
				<NotesErrorTooltip data={props.data} />
			) : (
				<>
					<Button variant="ghost">
						valid : {notes.valid}, error: {notes.error}
					</Button>
				</>
			)}
		</TableCell>
	);
};

export default GajiBatchRootNotesCell;
