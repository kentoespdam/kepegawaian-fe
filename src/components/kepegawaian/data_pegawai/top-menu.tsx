import TooltipBuilder from "@components/builder/tooltip";
import { Button } from "@components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@components/ui/dropdown-menu";
import Fieldset from "@components/ui/fieldset";
import { ButtonLink } from "@components/ui/link";
import { BookUserIcon, ChevronDownIcon, ContactIcon, UserPlusIcon } from "lucide-react";
import Link from "next/link";

const TopMenuDataPegawai = () => {
    return (
        <Fieldset title="Action" x-chunk="dashboard-05-chunk-4">
            <div className="flex gap-2">
                <TooltipBuilder text="Tambah Pegawai">
                    <ButtonLink
                        variant="outline"
                        href="/kepegawaian/add"
                        icon={<UserPlusIcon />}
                        size="icon"
                        className="rounded-lg" />
                </TooltipBuilder>

                <TooltipBuilder text="Data Pendukung">
                    <ButtonLink
                        variant="outline"
                        href="#"
                        icon={<BookUserIcon />}
                        size="icon"
                        className="rounded-lg" />
                </TooltipBuilder>

                <TooltipBuilder text="Data Kepegawaian">
                    <ButtonLink
                        variant="outline"
                        href="#"
                        icon={<ContactIcon />}
                        size="icon"
                        className="rounded-lg" />
                </TooltipBuilder>

                <DropdownMenu>
                    <TooltipBuilder text="Profil">
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="outline"
                                className="rounded-lg hover:bg-primary hover:text-primary-foreground justify-between">
                                <span>Profil</span>
                                <ChevronDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-80" />
                            </Button>
                        </DropdownMenuTrigger>
                    </TooltipBuilder>
                    <DropdownMenuContent align="end" className="rounded-lg">
                        <DropdownMenuLabel>Data Profil</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="hover:bg-primary hover:text-primary-foreground">
                            <Link href="#">Profil Pribadi</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="hover:bg-primary hover:text-primary-foreground">
                            <Link href="#">Profil Gaji</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="hover:bg-primary hover:text-primary-foreground">
                            <Link href="#">Upload Foto Karyawan</Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </Fieldset >
    );
}

export default TopMenuDataPegawai;