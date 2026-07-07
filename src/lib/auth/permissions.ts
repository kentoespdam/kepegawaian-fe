export type Action = "view" | "create" | "update" | "delete";

const ALL: Action[] = ["view", "create", "update", "delete"];
const VIEW: Action[] = ["view"];

// ponytail: seed default role — rilis 1, user isi matriks per-label nanti
export const PERMISSIONS: Record<string, Record<string, Action[]>> = {
  admin: { "*": ALL },
  viewer: { "*": VIEW },
};
