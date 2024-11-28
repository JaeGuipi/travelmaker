import API_URL from "@/constants/config";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    // URL에서 쿼리스트링 추출
    const url = new URL(req.url);
    const code = url.searchParams.get("code"); // 쿼리스트링에서 'code' 가져오기
    const redirectUri = `http://localhost:3000/api/google-auth`;
    if (!code || !redirectUri) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
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
        client_secret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET || "",
        redirect_uri: redirectUri,
        grant_type: "authorization_code",
      }),
    });

    if (!tokenResponse.ok) {
      const errorDetails = await tokenResponse.json();
      console.error("Google 토큰 요청 실패:", errorDetails);
      return NextResponse.json({ error: "Failed to retrieve tokens" }, { status: 400 });
    }

    const tokenData = await tokenResponse.json();
    console.log("Token Data:", tokenData);
    const { id_token } = tokenData;

    // Step 2: 백엔드로 Google 인증 결과 전달
    const backendResponse = await fetch(`${API_URL}/oauth/sign-in/google`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token: `${id_token}`,
        redirectUri: redirectUri,
      }),
    });

    if (!backendResponse.ok) {
      const backendError = await backendResponse.text();
      console.error("백엔드 인증 실패:", backendError);
      return NextResponse.redirect("http://localhost:3000/error", 302);
    }

    const backendData = await backendResponse.json();
    const { accessToken, refreshToken } = backendData;

    if (!accessToken || !refreshToken) {
      console.error("백엔드에서 토큰이 누락되었습니다.");
      return NextResponse.redirect("http://localhost:3000/error", 302);
    }

    // Step 3: 쿠키 설정
    const response = NextResponse.redirect("http://localhost:3000/", 302);
    response.cookies.set("accessToken", accessToken, {
      httpOnly: true, // 클라이언트에서 사용 가능
      // secure: process.env.NODE_ENV === "production", // HTTPS에서만 사용
      sameSite: "lax",
      maxAge: 60 * 60, // 1시간
    });
    response.cookies.set("refreshToken", refreshToken, {
      httpOnly: true, // HttpOnly로 설정하여 JavaScript에서 접근 불가
      // secure: process.env.NODE_ENV === "production", // HTTPS에서만 사용
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 14, // 14일
    });

    return response;
  } catch (error) {
    console.error("OAuth 처리 중 오류 발생:", error);
    return NextResponse.redirect("/?error=server_error", 302);
  }
}
