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
    cache: "no-store", // 최신 데이터 가져오기 Next.js 14버전은 자동 캐시가 디폴트여서 no-store로 설정. 이렇게 안하면 캐시로 인해 데이터가 안바뀌는 경우가 생김
  };

  return await fetch(input, customInit);
};
