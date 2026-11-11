import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "./auth";

export async function requireSession(callbackUrl: string) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    redirect(`/signin?callbackUrl=${encodeURIComponent(callbackUrl)}&protected=1`);
  }
  return session;
}
