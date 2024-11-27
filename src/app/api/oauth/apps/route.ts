import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { appKey, provider } = await request.json();

    // 필수 항목 확인
    if (!appKey || !provider) {
      return NextResponse.json({ message: "필수 항목이 누락되었습니다." }, { status: 400 });
    }

    // provider 값 검증
    if (provider !== "google" && provider !== "kakao") {
      return NextResponse.json({ message: 'provider는 "google" 또는 "kakao"여야 합니다.' }, { status: 400 });
    }

    // 성공 응답
    return NextResponse.json(
      {
        message: `${provider} 앱이 등록/수정되었습니다.`,
        app: {
          provider,
          appKey,
        },
      },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "서버 오류가 발생했습니다." }, { status: 500 });
  }
}
