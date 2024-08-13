import { LoadingButtonClient } from "@components/builder/loading-button-client";
import { buttonVariants } from "@components/ui/button";
import { cn } from "@lib/utils";
import { SaveIcon } from "lucide-react";
import Link from "next/link";

const PegawaiActionComponent = ({ pending }: { pending: boolean }) => {
    return (
        <div className="w-full flex justify-end gap-2">
            <Link href="/kepegawaian/data_pegawai" className={cn(buttonVariants({
                variant: "destructive"
            }))} >
                Cancel
            </Link>
            <LoadingButtonClient type="submit" title="Save" pending={pending} icon={<SaveIcon />} />
        </div>
    );
}

export default PegawaiActionComponent;