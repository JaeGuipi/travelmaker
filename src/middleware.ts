import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const protectedRoutes = ["/mypage", "/dashboard", "/profile"];

  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    const response = await handleAuthentication(request);
    return response;
  }

  return NextResponse.next();
}

const handleAuthentication = async (request: NextRequest): Promise<NextResponse> => {
  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;

  let response = NextResponse.next();

  const isAccessTokenValid = await tokenVerify(accessToken);

  if (!isAccessTokenValid) {
    const newTokens = await refreshAccessToken(refreshToken);

    if (newTokens) {
      const { newAccessToken, newRefreshToken } = newTokens;

      response.cookies.set("accessToken", newAccessToken, {
        httpOnly: true,
        secure: true,
        path: "/",
        maxAge: 60 * 60,
      });

      response.cookies.set("refreshToken", newRefreshToken, {
        httpOnly: true,
        secure: true,
        path: "/",
        maxAge: 7 * 24 * 60 * 60,
      });

      response.headers.set("Authorization", `Bearer ${newAccessToken}`);
    } else {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  } else {
    response.headers.set("Authorization", `Bearer ${accessToken}`);
  }

  return response;
};

const tokenVerify = async (token: string | undefined): Promise<boolean> => {
  // 토큰 검증 로직 구현
};

const refreshAccessToken = async (
  refreshToken: string | undefined,
): Promise<{ newAccessToken: string; newRefreshToken: string } | null> => {
  // 토큰 갱신 로직 구현
};
