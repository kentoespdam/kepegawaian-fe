import { DEFAULT_MAIL_DOMAIN } from "@lib/utils";

/**
 * Validates an email address.
 *
 * @param {string} email - The email address to validate.
 * @returns {boolean} - True if the email is valid, false otherwise.
 */
export const validateEmail = (email: string): boolean =>
	email.includes("@") && email.split("@").length === 2;

/**
 * Converts a user string to an email address.
 *
 * @param {string} user - The user string to convert.
 * @returns {string} - The email address corresponding to the user string, or the original user string if it is already a valid email address.
 */
export const userToEmail = (user: string): string =>
	validateEmail(user) ? user : `${user}@${DEFAULT_MAIL_DOMAIN}`;
