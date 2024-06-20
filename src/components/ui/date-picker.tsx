"use client"

import { useState } from "react";
import DatePicker, { type DateValueType } from "react-tailwindcss-datepicker";

type DatePickerComponent = {
    id: string
    required?: boolean
}
const DatePickerComponent = ({ id, required=false }: DatePickerComponent) => {
    const [value, setValue] = useState<DateValueType>({
        startDate: null,
        endDate: null
    })

    const handleValueChange = (newValue: DateValueType) => {
        // console.log(newValue?.startDate)
        setValue(newValue)
    }

    return (
        <>
            <input type="hidden"
                id={id}
                name={id}
                defaultValue={value?.startDate ? String(value.startDate) : ""}
                required={required}
            />
            <DatePicker
                useRange={false}
                asSingle={true}
                value={value}
                onChange={handleValueChange}
                primaryColor="emerald"
                inputClassName="h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            />
        </>
    );
}

export default DatePickerComponent;