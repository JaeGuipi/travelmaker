// middleware.ts

import { NextRequest, NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode";
import API_URL from "./constants/config";

// 보호된 경로 설정
const protectedRoutes = ["/", "/reservation-status"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 토큰이 있으면 로그인, 회원가입 홈으로 리다이렉트
  // const token = request.cookies.get("accessToken")?.value;
  // const RoutesRedirect = ["/login", "/signup"];
  // if (token && RoutesRedirect.includes(request.nextUrl.pathname)) {
  //   return NextResponse.redirect(new URL("/", request.url));
  // }

  // 보호된 경로에만 미들웨어 적용
  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    const accessToken = request.cookies.get("accessToken")?.value;
    const refreshToken = request.cookies.get("refreshToken")?.value;

    // 액세스 토큰 유효성 검사
    let isAccessTokenValid = false;

    if (accessToken) {
      isAccessTokenValid = verifyToken(accessToken);
    }

    if (isAccessTokenValid) {
      // 액세스 토큰이 유효한 경우 그대로 진행
      return NextResponse.next();
    } else if (refreshToken) {
      // 액세스 토큰이 없거나 만료되었고 리프레시 토큰이 있는 경우
      const isRefreshTokenValid = verifyToken(refreshToken);

      if (isRefreshTokenValid) {
        // 리프레시 토큰으로 새로운 액세스 토큰 발급
        const newAccessToken = await refreshAccessToken(refreshToken);

        if (newAccessToken) {
          // 새로운 액세스 토큰을 쿠키에 저장
          const response = NextResponse.next();
          response.cookies.set("accessToken", newAccessToken, {
            httpOnly: true,
            secure: true,
            path: "/",
            maxAge: 60 * 60, // 1시간 (초 단위)
          });

          return response;
        } else {
          // 토큰 갱신 실패 시 로그인 페이지로 리디렉션
          // return NextResponse.redirect(new URL("/test/login", request.url));
        }
      } else {
        // 리프레시 토큰이 만료된 경우 로그인 페이지로 리디렉션
        // return NextResponse.redirect(new URL("/test/login", request.url));
      }
    } else {
      // 리프레시 토큰이 없는 경우 로그인 페이지로 리디렉션
      // return NextResponse.redirect(new URL("/test/login", request.url));
    }
  }

  // 보호된 경로가 아닌 경우 그대로 진행
  return NextResponse.next();
}

//토큰 디코딩을 통한 검사
function verifyToken(token: string): boolean {
  try {
    const decoded: { exp?: number } = jwtDecode(token);
    const expirationTime = decoded.exp;
    const currentTime = Math.floor(Date.now() / 1000);
    if (expirationTime && expirationTime > currentTime) {
      return true; // 토큰이 유효함
    } else {
      return false; // 토큰이 만료됨
    }
  } catch (error) {
    console.error("토큰 검증 중 오류 발생:", error);
    return false;
  }
}

async function refreshAccessToken(refreshToken: string): Promise<string | null> {
  try {
    // 리프레시 토큰을 사용하여 새로운 액세스 토큰 발급
    const response = await fetch(`${API_URL}/auth/tokens`, {
      method: "POST", // 또는 실제 API의 메서드에 맞게 변경
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${refreshToken}`, // 헤더에 리프레시 토큰 포함
      },
      // body는 필요하지 않음
    });

    if (response.ok) {
      const data = await response.json();
      return data.accessToken; // 새로운 액세스 토큰 반환
    } else {
      console.error("토큰 재발급 실패:", response.statusText);
      return null;
    }
  } catch (error) {
    console.error("토큰 재발급 중 오류 발생:", error);
    return null;
  }
}

// 미들웨어 적용 경로 설정 (선택 사항)
// export const config = {
//   matcher: ["/login", "/signup", "/dashboard/:path*", "/profile/:path*", "/settings/:path*"],
// };
