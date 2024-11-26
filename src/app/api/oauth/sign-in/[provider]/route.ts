import { NextRequest, NextResponse } from "next/server";

// Google 토큰 검증
async function verifyGoogleToken(token: string) {
  const response = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${token}`);
  const data = await response.json();
  return !data.error; // 유효한 토큰이면 true, 아니면 false
}

// Kakao 토큰 검증
async function verifyKakaoToken(token: string) {
  const response = await fetch(`https://kapi.kakao.com/v2/user/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return data.id ? true : false; // 유효한 사용자 정보가 있으면 true
}

// POST 요청 처리
export async function POST(request: NextRequest, { params }: { params: { provider: string } }) {
  const { provider } = params;
  const { redirectUri, token } = await request.json();

  // 필수 항목 확인
  if (!redirectUri || !token) {
    return NextResponse.json({ message: "필수 항목이 누락되었습니다." }, { status: 400 });
  }

  // 제공자별 토큰 검증
  let isValidToken = false;
  if (provider === "google") {
    isValidToken = await verifyGoogleToken(token);
  } else if (provider === "kakao") {
    isValidToken = await verifyKakaoToken(token);
  } else {
    return NextResponse.json({ message: "지원하지 않는 로그인 제공자입니다." }, { status: 400 });
  }

  // 토큰 검증 실패
  if (!isValidToken) {
    return NextResponse.json({ message: "토큰이 유효하지 않습니다." }, { status: 401 });
  }

  // 로그인 성공 후 리디렉션 URI 반환
  return NextResponse.json(
    {
      message: "로그인 성공",
      redirectUri:
        redirectUri ||
        (provider === "google"
          ? process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI_SIGN_IN
          : process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI_SIGN_IN),
    },
    { status: 200 },
  );
}
