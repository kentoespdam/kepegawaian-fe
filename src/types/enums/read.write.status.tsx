import { z } from "zod";

export const READ_WRITE_STATUS = ["NONE","READ", "WRITE"] as const;

export const ReadWriteStatus = z.enum(READ_WRITE_STATUS);
export type ReadWriteStatus = z.infer<typeof ReadWriteStatus>;