// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { handleTokenRefresh, setAccessTokenCookie } from "./lib/auth-handlers";

// 보호 경로 지정
const protectedRoutes = ["/reservation-status", "/my-info", "/my-reservation", "/my-activities"];

export const loginRedirectUrl = (request: Request) => {
  return new URL("/login", request.url);
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. 모든 요청에 대해 토큰 상태 확인 및 재발급 시도
  const { isValidAccessToken, newAccessToken, hasRefreshToken } = await handleTokenRefresh(request);

  // 토큰 재발급이 발생한 경우 쿠키 설정
  const response = NextResponse.next();
  if (newAccessToken) {
    setAccessTokenCookie(response, newAccessToken);
  }

  // 2. 특정 경로 보호 로직: 보호된 경로에서 액세스, 리프레시 토큰 모두 없으면 로그인 페이지로 이동
  if (isProtectedRoute(pathname)) {
    // 보호된 경로인데 유효한 액세스 토큰 없음 AND 리프레시 토큰도 없으면 redirect
    if (!isValidAccessToken && !hasRefreshToken) {
      return NextResponse.redirect(loginRedirectUrl(request));
    }
    // 여기서 isValidAccessToken = false 이면서 refreshToken이 있을 경우엔 이미 handleTokenRefresh에서 재발급 시도했으므로,
    // 재발급 실패라면 결국 유효한 액세스 토큰이 없으므로 리다이렉트
    if (!isValidAccessToken) {
      return NextResponse.redirect(loginRedirectUrl(request));
    }
  }

  return response;
}

function isProtectedRoute(pathname: string): boolean {
  return protectedRoutes.some((route) => pathname.startsWith(route));
}
