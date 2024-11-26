import { NextRequest, NextResponse } from "next/server";

// Google 토큰 검증
async function verifyGoogleToken(token: string) {
  try {
    const response = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${token}`);
    if (!response.ok) {
      return null;
    }
    return await response.json();
  } catch (error) {
    console.error("Google 토큰 검증 중 오류:", error);
    return null;
  }
}

// Kakao 토큰 검증
async function verifyKakaoToken(token: string) {
  try {
    const response = await fetch(`https://kapi.kakao.com/v2/user/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      return null;
    }
    return await response.json();
  } catch (error) {
    console.error("Kakao 토큰 검증 중 오류:", error);
    return null;
  }
}

const homeRedirectUri = "/";

// POST 요청 처리
export async function POST(request: NextRequest, { params }: { params: { provider: string } }) {
  const { provider } = params;
  const { redirectUri, token } = await request.json();

  // 필수 항목 확인
  if (!redirectUri || !token) {
    return NextResponse.json({ message: "필수 항목이 누락되었습니다." }, { status: 400 });
  }

  // 로그인 제공자별 토큰 검증: provider 값에 따라 각각의 검증 함수를 호출
  let userData;
  if (provider === "google") {
    userData = await verifyGoogleToken(token);
  } else if (provider === "kakao") {
    userData = await verifyKakaoToken(token);
  } else {
    return NextResponse.json({ message: "지원하지 않는 로그인 제공자입니다." }, { status: 400 });
  }

  // 토큰 검증 실패 처리
  if (userData.error || !userData.id) {
    return NextResponse.json({ message: "토큰이 유효하지 않습니다." }, { status: 401 });
  }

  // 로그인 성공 후 메인 화면으로 리디렉션
  return NextResponse.json(
    {
      message: "로그인 성공",
      redirectUri: redirectUri || homeRedirectUri,
      user: userData,
    },
    { status: 200 },
  );
}
