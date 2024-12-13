import API_URL from "@/constants/config";
import { NextRequest, NextResponse } from "next/server";

interface BackandRequest {
  token: string;
  redirectUri: string;
  nickname?: string;
}

export async function GET(req: NextRequest) {
  const url = req.nextUrl;
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state"); // state 매개변수 추출
  const redirectUri = `http://localhost:3000/api/google-auth`;
  try {
    if (!code || !redirectUri) {
      return NextResponse.json({ error: "필수 필드가 누락되었습니다." }, { status: 400 });
    }

    // Step 1: Google 토큰 엔드포인트에 요청
    const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        code,
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "",
        client_secret: process.env.GOOGLE_CLIENT_SECRET || "",
        redirect_uri: redirectUri,
        grant_type: "authorization_code",
      }),
    });

    if (!tokenResponse.ok) {
      const errorDetails = await tokenResponse.json();
      console.error("Google 토큰 요청 실패:", errorDetails);
      return NextResponse.json({ error: "토큰을 가져오지 못했습니다." }, { status: 400 });
    }

    const tokenData = await tokenResponse.json();
    const { id_token } = tokenData;

    // Step 2: state에 따라 백엔드 엔드포인트 결정
    let backendEndpoint = `${API_URL}/oauth/sign-in/google`;
    let requestBody: BackandRequest = {
      token: `${id_token}`,
      redirectUri: redirectUri,
    }; // 기본값은 로그인

    if (state === "signup") {
      backendEndpoint = `${API_URL}/oauth/sign-up/google`;
      requestBody = {
        ...requestBody,
        nickname: "Google 사용자", // 닉네임은 필수가 아니므로 기본값 설정
      };
    }

    // Step 3: 백엔드로 Google ID 토큰 전송
    const backendResponse = await fetch(backendEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    });

    if (!backendResponse.ok) {
      const backendError = await backendResponse.json();
      console.error("백엔드 인증 실패:", backendError);
      // 에러 메시지를 포함하여 리디렉션
      return NextResponse.redirect(
        `http://localhost:3000/signup?error=${encodeURIComponent(backendError.message)}`,
        302,
      );
    }

    const backendData = await backendResponse.json();
    const { accessToken, refreshToken } = backendData;

    if (!accessToken || !refreshToken) {
      console.error("백엔드에서 토큰이 누락되었습니다.");
      return NextResponse.redirect("http://localhost:3000/error", 302);
    }

    // Step 4: 쿠키 설정 및 리디렉션
    const response = NextResponse.redirect("http://localhost:3000/", 302);
    response.cookies.set("accessToken", accessToken, {
      httpOnly: true,
      sameSite: "lax",
      maxAge: 60 * 60, // 1시간
    });
    response.cookies.set("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 14, // 14일
    });

    return response;
  } catch (error) {
    console.error("OAuth 처리 중 오류 발생:", error);
    return NextResponse.redirect("http://localhost:3000/?error=server_error", 302);
  }
}
