"use server"
import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function getToken() {
  const sessionToken = (await cookies()).get("next-auth.session-token")?.value;

  const token = await decode({
    token: sessionToken,
    secret: process.env.AUTH_SECRET!,
  });
  
  return token?.token as string;
}
