import { notFound } from "next/navigation";
import { type Action, PERMISSIONS } from "./permissions";

export interface AppwriteUser {
  $id: string;
  email: string;
  name: string;
  labels: string[];
}

export function getRoles(user: AppwriteUser): string[] {
  return user.labels;
}

export function can(roles: string[], action: Action, entity: string): boolean {
  for (const role of roles) {
    const perms = PERMISSIONS[role];
    if (!perms) continue;
    const actions = perms[entity] ?? perms["*"];
    if (actions?.includes(action)) return true;
  }
  return false;
}

export function forbidden(): never {
  notFound();
}
