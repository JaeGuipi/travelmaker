// lib/auth-handlers.ts
import { NextRequest, NextResponse } from "next/server";
import { verifyToken, refreshAccessToken } from "./auth";

interface TokenCheckResult {
  isValidAccessToken: boolean;
  newAccessToken?: string;
  hasRefreshToken: boolean;
}

export async function handleTokenRefresh(request: NextRequest): Promise<TokenCheckResult> {
  const accessToken = request.cookies.get("accessToken")?.value ?? undefined;
  const refreshToken = request.cookies.get("refreshToken")?.value ?? undefined;

  let isValidAccessToken = false;
  let newAccessToken: string | undefined;

  // 액세스 토큰 검증
  if (accessToken && verifyToken(accessToken)) {
    isValidAccessToken = true;
  } else if (refreshToken && verifyToken(refreshToken)) {
    // 리프레시 토큰 유효하면 새로운 액세스 토큰 발급
    newAccessToken = (await refreshAccessToken(refreshToken)) ?? undefined;
    if (newAccessToken) {
      isValidAccessToken = true; // 새로운 액세스 토큰 발급 성공
    }
  }

  return {
    isValidAccessToken,
    newAccessToken,
    hasRefreshToken: !!refreshToken,
  };
}

export function setAccessTokenCookie(response: NextResponse, newAccessToken: string) {
  response.cookies.set("accessToken", newAccessToken, {
    httpOnly: true,
    secure: true,
    path: "/",
    maxAge: 60 * 60, // 1시간
  });
}
