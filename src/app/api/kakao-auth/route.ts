// app/api/kakao-auth/route.ts
import API_URL from "@/constants/config";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const code = url.searchParams.get("code");

    if (!code) {
      return NextResponse.json({ success: false, error: "Missing authorization code" }, { status: 400 });
    }

    // 백엔드 처리 로직
    const tokenResponse = await fetch(`${API_URL}/oauth/sign-in/kakao`, {
      method: "POST",
      body: new URLSearchParams({
        redirectUri: "http://localhost:3000/api/kakao-auth",
        token: code,
      }),
    });

    if (!tokenResponse.ok) {
      const errorDetails = await tokenResponse.json();
      return NextResponse.json(
        { success: false, error: errorDetails.message || "Authentication failed" },
        { status: errorDetails.status || 500 },
      );
    }

    const tokenData = await tokenResponse.json();
    return NextResponse.json({ success: true, data: tokenData }, { status: 200 });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
