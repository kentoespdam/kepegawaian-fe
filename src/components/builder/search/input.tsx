"use client"
import { Input } from "@components/ui/input"
import { useRouter, useSearchParams } from "next/navigation"
import { ChangeEvent } from "react"
import { useDebouncedCallback } from "use-debounce"
import { BaseSearchProps } from "./component"

const InputSearchComponent = ({ col, value }: BaseSearchProps) => {
    const searchParams = useSearchParams()
    const search = new URLSearchParams(searchParams)
    const { replace } = useRouter()
    const doChange = useDebouncedCallback((e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.value) search.delete(col.id)
        else search.set(col.id, e.target.value)
        replace(`${location.pathname}?${search.toString()}`)
    }, 500)

    if (!col.search) return null
    return <Input
        type="text"
        placeholder="Cari..."
        className="w-full"
        name={col.id}
        onChange={doChange}
    />
}

export default InputSearchComponent