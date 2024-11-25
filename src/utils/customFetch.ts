// utils/customFetch.ts
export const customFetch = async (input: RequestInfo, init?: RequestInit) => {
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");

  const defaultHeaders = {
    "Content-Type": "application/json",
    ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
    ...(refreshToken && { "x-refresh-token": refreshToken }),
  };

  const customInit = {
    ...init,
    headers: {
      ...defaultHeaders,
      ...(init?.headers || {}),
    },
  };

  return fetch(input, customInit);
};
