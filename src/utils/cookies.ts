"use server";

import { cookies } from "next/headers";

export async function setCookie({
  key,
  value,
  httpOnly = true,
  sameSite = "lax",
  maxAge = 60 * 60 * 24 * 7,
}: {
  key: string;
  value: string;
  httpOnly?: boolean;
  sameSite?: "lax" | "strict" | "none";
  maxAge?: number;
}) {
  const cookie = await cookies();
  cookie.set(key, value, {
    secure: true,
    httpOnly,
    sameSite,
    maxAge,
  });
}

export async function getCookie(name: string) {
  const cookie = await cookies();
  return cookie.get(name)?.value;
}

export async function deleteCookie(name: string) {
  const cookie = await cookies();
  cookie.delete(name);
}
