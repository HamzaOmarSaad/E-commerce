"use server"
import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function getToken() {
  const sessionToken = (await cookies()).get(process.env.NEXT_PUBLIC_TOKEN_NAME!)?.value;

  const token = await decode({
    token: sessionToken,
    secret: process.env.AUTH_SECRET!,
  });
  
  return token?.token as string;
}
