import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";

const APPWRITE_URL = process.env.APPWRITE_URL ?? "";
const APPWRITE_PROJECT = process.env.APPWRITE_PROJECT_ID ?? "";
const SESSION_COOKIE = `a_session_${APPWRITE_PROJECT}`;

interface AppwriteUser {
  $id: string;
  email: string;
  name: string;
  labels: string[];
}

export const verifySession = cache(async (): Promise<AppwriteUser> => {
  const cookieStore = await cookies();
  const session = cookieStore.get(SESSION_COOKIE)?.value;

  if (!session) {
    redirect("/login");
  }

  const res = await fetch(`https://${APPWRITE_URL}/v1/account`, {
    headers: {
      "X-Appwrite-Project": APPWRITE_PROJECT,
      Cookie: `${SESSION_COOKIE}=${session}`,
    },
  });

  if (!res.ok) {
    redirect("/login");
  }

  return res.json();
});
