// app/api/kakao-auth/route.ts

import API_URL from "@/constants/config";
import { NextRequest, NextResponse } from "next/server";

interface BackandRequest {
  token: string;
  redirectUri: string;
  nickname?: string;
}

export async function GET(req: NextRequest) {
  const url = req.nextUrl;
  //Setp 1: 카카오 code 추출
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state"); // state 매개변수 추출

  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  const redirectUri = `${BASE_URL}/api/kakao-auth`;
  try {
    if (!code) {
      return NextResponse.json({ success: false, error: "Missing authorization code" }, { status: 400 });
    }

    // Step 2: state에 따라 백엔드 엔드포인트 결정
    let backendEndpoint = `${API_URL}/oauth/sign-in/kakao`;
    let requestBody: BackandRequest = {
      token: `${code}`,
      redirectUri: redirectUri,
    }; // 기본값은 로그인

    if (state === "signup") {
      backendEndpoint = `${API_URL}/oauth/sign-up/kakao`;
      requestBody = {
        ...requestBody,
        nickname: "Kakko 사용자", // 닉네임은 필수가 아니므로 기본값 설정
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
      console.error("백엔드 인증 실패:", backendError.message);
      // 에러 메시지를 포함하여 리디렉션
      return NextResponse.redirect(`${BASE_URL}/signup?error=${encodeURIComponent(backendError.message)}`, 302);
    }

    const backendData = await backendResponse.json();
    const { accessToken, refreshToken } = backendData;

    if (!accessToken || !refreshToken) {
      console.error("백엔드에서 토큰이 누락되었습니다.");
      return NextResponse.redirect(`${BASE_URL}/error`, 302);
    }

    // Step 4: 쿠키 설정 및 리디렉션
    const response = NextResponse.redirect(BASE_URL, 302);
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
    return NextResponse.redirect(`${BASE_URL}/?error=server_error`, 302);
  }
}
