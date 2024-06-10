import { DEFAULT_MAIL_DOMAIN } from "@lib/utils"

export const validateEmail = (email: string) => {
	const re =
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	return re.test(String(email).toLowerCase())
}

export const userToEmail = (user: string) => {
	const validate = validateEmail(user)
	return validate ? user : `${user}@${DEFAULT_MAIL_DOMAIN}`
}
