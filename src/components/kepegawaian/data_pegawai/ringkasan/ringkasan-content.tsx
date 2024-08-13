interface InformasiUmumContentProps {
    field: string
    value?: string
}
const RingkasanContent = (props: InformasiUmumContentProps) => {
    return (
        <div className="w-full grid grid-cols-2 items-top gap-1 text-[.775rem]">
            <div className="border-l-4 border-l-primary pl-1 flex justify-between">
                <span>{props.field}</span> <span>:</span>
            </div>
            <div>{props.value ?? ""}</div>
        </div>
    )
}

export default RingkasanContent