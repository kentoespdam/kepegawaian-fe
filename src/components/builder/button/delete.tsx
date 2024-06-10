"use client";
import { Alert, AlertDescription } from "@components/ui/alert";
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@components/ui/alert-dialog";
import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import { DeleteIcon } from "lucide-react";
import React from "react";
import { useFormState } from "react-dom";

import TooltipBuilder from "../tooltip";
import { LoadingButton } from "../loading-button";

type ButtonDeleteBuilderProps = {
    id: number;
    href: string;
    msg: string;
    action: (
        _prevState: unknown,
        formData: FormData,
    ) => Promise<{
        success: boolean;
        error: {
            message: string;
        };
    }>;
};

const deleteText = "DELETE-";
const ButtonDeleteBuilder = (props: ButtonDeleteBuilderProps) => {
    const [open, setOpen] = React.useState(false);
    const [state, action] = useFormState(props.action, null);

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <TooltipBuilder
                text={props.msg}
                className="bg-destructive text-destructive-foreground"
            >
                <AlertDialogTrigger asChild>
                    <Button variant="ghost" size="icon" className="p-0 h-7 w-7">
                        <DeleteIcon
                            className="h-5 w-5 text-destructive"
                            aria-hidden="true"
                        />
                    </Button>
                </AlertDialogTrigger>
            </TooltipBuilder>
            <AlertDialogContent>
                <form action={action}>
                    {/* onSubmit={form.handleSubmit(doDelete)}> */}
                    <AlertDialogHeader>
                        <AlertDialogTitle>Yakin akan menghapus data?</AlertDialogTitle>
                        <AlertDialogDescription>
                            proses ini tidak bisa dibatalkan dan data yang terhapus tidak
                            dapat dikembalikan.
                            <br />
                            Ketik{" "}
                            <code className="font-normal bg-orange-300 text-gray-700 dark:text-gray-900 border px-1">
                                {`${deleteText}${props.id}`}
                            </code>
                            <Input
                                name="deleteRef"
                                placeholder="ketik disini"
                                className="mt-2"
                                autoComplete="off"
                            />
                        </AlertDialogDescription>
                        {state && !state.success ? (
                            <Alert variant="destructive" className="mt-2 p-2">
                                <AlertDescription>{state.error.message}</AlertDescription>
                            </Alert>
                        ) : null}
                    </AlertDialogHeader>
                    <AlertDialogFooter className="mt-2">
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <LoadingButton
                            variant="outline"
                            type="submit"
                            title="DELETE"
                            className="bg-destructive text-destructive-foreground"
                        />
                    </AlertDialogFooter>
                </form>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default ButtonDeleteBuilder;
