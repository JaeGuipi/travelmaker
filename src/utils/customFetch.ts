import { cookies } from "next/headers";

export const customFetch = async (input: RequestInfo | URL, init?: RequestInit) => {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  const defaultHeaders: HeadersInit = {
    ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
  };

  const customInit: RequestInit = {
    ...init,
    headers: {
      ...defaultHeaders,
      ...(init?.headers || {}),
    },
    cache: "no-cache",
  };

  return await fetch(input, customInit);
};
