"use server"
import type { PegawaiDetail } from "@_types/pegawai"
import { getDataByIdEnc } from "@helpers/action"
import { encodeString } from "@helpers/number"
import { getCurrentUser } from "@lib/appwrite/user"

export const getAppData = async () => {
	const user = await getCurrentUser()
	const pegawai = await getDataByIdEnc<PegawaiDetail>({
		path: encodeString("pegawai"),
		id: encodeString(user.$id),
		isRoot: true,
		isString: true,
	})

	return {
		user,
		pegawai,
		theme: "system",
	} as const
}

export default getAppData
