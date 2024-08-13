import { JenisKelamin } from "@_types/enums/jenisKelamin";
import { Label } from "@components/ui/label";
import { RadioGroup, RadioGroupItem } from "@components/ui/radio-group";

const RadioJenisKelamin = () => {
    return (
        <>
            <Label htmlFor="jenisKelamin">Jenis Kelamin</Label>
            <RadioGroup
                name="jenisKelamin"
                defaultValue={JenisKelamin.Values.LAKI_LAKI}
                className="flex justify-start gap-8"
            >
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value={JenisKelamin.Values.LAKI_LAKI} id="laki-laki" />
                    <Label htmlFor="laki-laki" className="cursor-pointer">Laki - Laki</Label>
                </div>

                <div className="flex items-center space-x-2">
                    <RadioGroupItem value={JenisKelamin.Values.PEREMPUAN} id="perempuan" />
                    <Label htmlFor="perempuan" className="cursor-pointer">Perempuan</Label>
                </div>
            </RadioGroup>
        </>
    );
}

export default RadioJenisKelamin;