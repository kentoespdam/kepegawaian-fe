import type { GajiBatchRootErrorLogs, GajiBatchRoot } from "@_types/penggajian/gaji_batch_root";
import TooltipBuilder from "@components/builder/tooltip";
import { Button } from "@components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@components/ui/popover";
import { TableCell } from "@components/ui/table";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@components/ui/tooltip";
import { getListData } from "@helpers/action";
import { cn } from "@lib/utils";
import { useQuery } from "@tanstack/react-query";

interface GajiBatchRootNotesProps {
    data: GajiBatchRoot;
}
const NotesErrorTooltip = (props: GajiBatchRootNotesProps) => {
    const notes = JSON.parse(props.data.notes);
    return (
        <TooltipProvider>
            <Tooltip delayDuration={100}>
                <TooltipTrigger asChild>
                    <Button variant="ghost">valid : {notes.valid}, error: {notes.error}</Button>
                </TooltipTrigger>
                <TooltipContent className="bg-white shadow-md border text-black">
                    <ul>
                        {props.data.errorLogs.map((log: GajiBatchRootErrorLogs) => (
                            <li key={log.id}>
                                {log.nipam}-{log.nama}: <span className="text-destructive">{log.notes}</span>
                            </li>
                        ))}
                    </ul>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}


const GajiBatchRootNotesCell = (props: GajiBatchRootNotesProps) => {
    const notes = JSON.parse(props.data.notes);
    return (
        <TableCell className={cn("border-x whitespace-nowrap", notes.error ? "text-destructive" : "text-primary")}>
            {notes.error > 0 ? <NotesErrorTooltip data={props.data} /> : <><Button variant="ghost">valid : {notes.valid}, error: {notes.error}</Button></>}
        </TableCell>
    );
}

export default GajiBatchRootNotesCell;