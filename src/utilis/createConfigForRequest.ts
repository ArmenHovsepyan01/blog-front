import { getSession } from "next-auth/react";

export async function createConfigForRequest(): Promise<Object> {
  const session = await getSession();

  const token = session?.user.access_token;

  if (!token) return {};

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
}
