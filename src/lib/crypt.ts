import Cryptr from "cryptr";

export const newCrypter = new Cryptr(`${process.env.AUTH_SECRET}`);