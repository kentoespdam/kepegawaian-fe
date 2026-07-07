export interface Prefs {
  roles: string[];
}

export interface AppwriteUser {
  $id: string;
  email: string;
  name: string;
  labels: string[];
  prefs: Prefs;
}

export type Action = "view" | "create" | "update" | "delete";
