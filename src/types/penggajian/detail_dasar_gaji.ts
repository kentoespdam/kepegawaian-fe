import type { Golongan } from "@_types/master/golongan";
import type { BaseId } from "..";
import type { DasarGaji } from "./dasar_gaji";

export interface DetailDasarGaji extends BaseId {
	dasarGaji: DasarGaji;
	mkg: number;
	golongan: Golongan;
	nominal: number;
}
