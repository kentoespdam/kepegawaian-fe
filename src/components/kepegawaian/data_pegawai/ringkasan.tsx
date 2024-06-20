import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@components/ui/card";
import Fieldset from "@components/ui/fieldset";
import { Input } from "@components/ui/input";
import { Label } from "@components/ui/label";
import { Table, TableBody, TableCell, TableRow } from "@components/ui/table";

const RingkasanBiodata = () => {
    return (
        <Card>
            <CardHeader className="px-7">
                <CardTitle>Daftar Biodata</CardTitle>
            </CardHeader>
            <CardContent>
                <Fieldset title="Informasi Umum">
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell className="w-1/4">NIPAM</TableCell>
                                <TableCell className="w-3/4">: 123456789</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="w-1/4">Nama Lengkap</TableCell>
                                <TableCell className="w-3/4">: Bagus Sudrajat</TableCell>
                            </TableRow>
                            
                        </TableBody>
                    </Table>
                </Fieldset>
            </CardContent>
        </Card>
    );
}

export default RingkasanBiodata;