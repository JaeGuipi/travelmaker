import API_URL from "@/constants/config";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { code, redirectUri } = await req.json();

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
    const { id_token } = tokenData;
    //나중에 Step 2를 이용하기 위해선 id_token과 같이 access_token을 전달해주기

    // Step 2: (선택) Google 사용자 정보 요청
    // const userInfoResponse = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
    //   method: "GET",
    //   headers: {
    //     Authorization: `Bearer ${access_token}`,
    //   },
    // });

    // if (!userInfoResponse.ok) {
    //   const errorDetails = await userInfoResponse.json();
    //   console.error("사용자 정보 요청 실패:", errorDetails);
    //   return NextResponse.json({ error: "Failed to retrieve user info" }, { status: 400 });
    // }

    // const userInfo = await userInfoResponse.json();

    // Step 3: 백엔드로 Google 인증 결과 전달
    const backendResponse = await fetch(`${API_URL}/oauth/sign-in/google`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: id_token,
        redirectUri: "http://localhost:3000/oauth/google",
      }),
    });

    const backendResponseText = await backendResponse.text();
    console.log("Backend Response Text:", backendResponseText);

    if (!backendResponse.ok) {
      return NextResponse.json(
        { error: "Failed to forward data to backend", details: backendResponseText },
        { status: 400 },
      );
    }

    let backendData;
    try {
      backendData = JSON.parse(backendResponseText);
    } catch (error) {
      console.error(`백엔드 응답 JSON 파싱 실패:${error}`, backendResponseText);
      return NextResponse.json({ error: "Invalid response from backend" }, { status: 500 });
    }

    return NextResponse.json(backendData, { status: 200 });
  } catch (error) {
    console.error("OAuth 처리 중 오류 발생:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
