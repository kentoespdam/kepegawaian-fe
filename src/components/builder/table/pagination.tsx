"use client";

import { Button } from "@components/ui/button";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
} from "@components/ui/pagination";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@components/ui/select";
import { Separator } from "@components/ui/separator";
import type { Pageable } from "@_types/index";
import {
    ChevronFirstIcon,
    ChevronLastIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
} from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type PaginationBuilderProps = {
    data: Pageable<unknown> | null;
};

const PaginationBuilder = ({ data }: PaginationBuilderProps) => {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();

    const handleSearch = (key: string, value: unknown) => {
        const params = new URLSearchParams(searchParams);
        params.has(key) ? params.set(key, String(value)) : params.append(key, String(value));
        router.push(`${pathname}?${params.toString()}`);
    };

    const navigateToPage = (pageNumber: number) => {
        handleSearch("page", pageNumber);
    };

    const {
        number = 0,
        numberOfElements = 0,
        totalElements = 0,
        totalPages = 0,
        first = true,
        last = true
    } = data ?? {};

    return (
        <>
            <Separator />
            <div className="flex flex-row justify-end items-center px-2 gap-2">
                <div className="flex flex-row text-sm items-center gap-2">
                    <div className="text-nowrap">Row per page</div>
                    <Select onValueChange={(value) => handleSearch("size", value)}>
                        <SelectTrigger className="border-0">
                            <SelectValue placeholder={data?.size ?? 10} />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="10">10</SelectItem>
                            <SelectItem value="25">25</SelectItem>
                            <SelectItem value="50">50</SelectItem>
                            <SelectItem value="100">100</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="text-sm">
                    {numberOfElements > 0 ? number + 1 : number}-{numberOfElements} of {totalElements}
                </div>
                <div>
                    <Pagination>
                        <PaginationContent>
                            <PaginationItem>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => navigateToPage(0)}
                                    disabled={first}
                                >
                                    <ChevronFirstIcon className="h-5 w-5" />
                                </Button>
                            </PaginationItem>
                            <PaginationItem>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => navigateToPage(number - 1)}
                                    disabled={first}
                                >
                                    <ChevronLeftIcon className="h-5 w-5" />
                                </Button>
                            </PaginationItem>
                            <PaginationItem>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => navigateToPage(number + 1)}
                                    disabled={last}
                                >
                                    <ChevronRightIcon className="h-5 w-5" />
                                </Button>
                            </PaginationItem>
                            <PaginationItem>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => navigateToPage(totalPages)}
                                    disabled={last}
                                >
                                    <ChevronLastIcon className="h-5 w-5" />
                                </Button>
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            </div>
        </>
    );
};

export default PaginationBuilder;
