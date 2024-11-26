import { NextResponse } from "next/server";

interface OAuthProviderConfig {
  tokenUrl: string;
  userInfoUrl: string;
  clientId: string;
  clientSecret: string;
  redirectUri: string;
}

interface OAuthConfig {
  [provider: string]: OAuthProviderConfig;
}

const OAUTH_CONFIG: OAuthConfig = {
  kakao: {
    tokenUrl: "https://kauth.kakao.com/oauth/token",
    userInfoUrl: "https://kapi.kakao.com/v2/user/me",
    clientId: process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID!,
    clientSecret: process.env.NEXT_PUBLIC_KAKAO_CLIENT_SECRET!,
    redirectUri: process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI_SIGN_UP!,
  },
  google: {
    tokenUrl: "https://oauth2.googleapis.com/token",
    userInfoUrl: "https://www.googleapis.com/oauth2/v2/userinfo",
    clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
    clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET!,
    redirectUri: process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI_SIGN_UP!,
  },
};

export async function POST(request: NextResponse, { params }: { params: { provider: string } }) {
  const { provider } = params;
  const config = OAUTH_CONFIG[provider];

  if (!config) {
    return NextResponse.json({ error: "지원하지 않는 로그인 제공자입니다." }, { status: 400 });
  }

  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.json({ error: "인증 코드가 누락되었습니다." }, { status: 400 });
  }

  // 토큰 요청
  const tokenResponse = await fetch(config.tokenUrl, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      client_id: config.clientId,
      client_secret: config.clientSecret,
      redirect_uri: config.redirectUri,
      code,
    }),
  });

  if (!tokenResponse.ok) {
    return NextResponse.json({ error: "액세스 토큰을 가져오는 데 실패했습니다." }, { status: 500 });
  }

  const { access_token } = await tokenResponse.json();

  const userInfoResponse = await fetch(config.userInfoUrl, {
    headers: { Authorization: `Bearer ${access_token}` },
  });

  if (!userInfoResponse.ok) {
    return NextResponse.json({ error: "유저 정보를 가져오는 데 실패했습니다." }, { status: 500 });
  }

  const userInfo = await userInfoResponse.json();

  const user = {
    id: userInfo.id,
    email: userInfo.kakao_account?.email || userInfo.email,
    name: userInfo.properties?.nickname || userInfo.name,
  };

  return NextResponse.json({ user });
}
