import { z } from "zod"
export const Prefs = z.object({
	roles: z.array(z.string()),
})

export type Prefs = z.infer<typeof Prefs>

export const User = z.object({
	$id: z.string(),
	$createdAt: z.string(),
	$updatedAt: z.string(),
	name: z.string(),
	registration: z.string(),
	status: z.boolean(),
	passwordUpdate: z.string(),
	email: z.string(),
	phone: z.string(),
	emailVerification: z.boolean(),
	phoneVerification: z.boolean(),
	prefs: Prefs,
})
export type User = z.infer<typeof User>
