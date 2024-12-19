// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { verifyToken, refreshAccessToken } from "./lib/auth";

// 해당하는 경로에 미들웨어 작동
const protectedRoutes = ["/reservation-status","/my-reservation", "/my-activities"];

const loginRedirectUrl = (request: Request) => {
  return new URL("/login", request.url);
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 보호된 경로가 아니라면 검사 없이 통과
  if (!isProtectedRoute(pathname)) {
    return NextResponse.next();
  }

  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;

  // 액세스 토큰 검증
  if (accessToken && verifyToken(accessToken)) {
    // 액세스 토큰 유효한 경우 바로 진행
    return NextResponse.next();
  }

  // 리프레시 토큰으로 액세스 토큰 재발급 시도
  if (refreshToken && verifyToken(refreshToken)) {
    const newAccessToken = await refreshAccessToken(refreshToken);
    if (newAccessToken) {
      // 새로운 액세스 토큰 세팅 후 진행
      const response = NextResponse.next();
      response.cookies.set("accessToken", newAccessToken, {
        httpOnly: true,
        secure: true,
        path: "/",
        maxAge: 60 * 60, // 1시간
      });
      return response;
    }
  }

  // 여기까지 왔다면 액세스 토큰, 리프레시 토큰 모두 유효하지 않으므로 로그인 페이지로 리다이렉트
  return NextResponse.redirect(loginRedirectUrl(request));
}

const isProtectedRoute = (pathname: string): boolean => {
  return protectedRoutes.some((route) => pathname.startsWith(route));
};
