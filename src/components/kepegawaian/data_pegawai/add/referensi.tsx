"use client"
import type { ConditionalSchema } from "@_types/pegawai";
import Fieldset from "@components/ui/fieldset";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@components/ui/form";
import { Label } from "@components/ui/label";
import { RadioGroup, RadioGroupItem } from "@components/ui/radio-group";
import { useAddBiodataStore } from "@store/kepegawaian/biodata/add-store";
import type { UseFormReturn } from "react-hook-form";
import type { z } from "zod";

interface ReferensiPegawaiComponentProps {
    form: UseFormReturn<z.infer<typeof ConditionalSchema>>
}
const ReferensiPegawaiComponent = ({ form }: ReferensiPegawaiComponentProps) => {
    const store = useAddBiodataStore((state) => state)

    return (
        <Fieldset title="Referensi Profil">
            <div className="grid items-center gap-2">
                <FormField
                    control={form.control}
                    name="referensi"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Referensi Profil</FormLabel>
                            <FormControl>
                                <RadioGroup
                                    defaultValue={field.value}
                                    onValueChange={(value) => {
                                        field.onChange(value)
                                        store.setReferensi(value)
                                    }}
                                    className="flex justify-start gap-4"
                                >
                                    {["biodata", "pegawai"].map(item => (
                                        <div key={item} className="flex items-center space-x-2">
                                            <RadioGroupItem value={item} id={item} />
                                            <Label htmlFor={item} className="cursor-pointer">{item}</Label>
                                        </div>
                                    ))}
                                </RadioGroup>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
            </div>
        </Fieldset>
    )


    // return (
    //     <Fieldset title="Referensi Profil">
    //         <div className="grid items-center gap-2">
    //             <Label htmlFor="referensiProfil">
    //                 Referensi Profil Karyawan <span className="text-red-500">*</span>
    //             </Label>
    //             <RadioGroup
    //                 name="referensiProfil"
    //                 defaultValue={store.referensi} className="flex flex-row w-full"
    //                 onValueChange={(value) => store.setReferensi(value)}>
    //                 <div className="flex items-center space-x-2">
    //                     <RadioGroupItem value="biodata" id="biodata" />
    //                     <Label htmlFor="biodata" className="cursor-pointer">Biodata</Label>
    //                 </div>
    //                 <div className="flex items-center space-x-2">
    //                     <RadioGroupItem value="pegawai" id="pegawai" />
    //                     <Label htmlFor="pegawai" className="cursor-pointer">Pegawai</Label>
    //                 </div>
    //                 {/* <div className="flex items-center space-x-2">
    //                     <RadioGroupItem value="eksis" id="eksis" />
    //                     <Label htmlFor="eksis" className="cursor-pointer">Ambil Eksisting Biodata</Label>
    //                 </div> */}
    //             </RadioGroup>
    //         </div>
    //     </Fieldset>
    // );
}

export default ReferensiPegawaiComponent;