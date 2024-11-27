//apps
export interface PostOauthApps {
  appKey: string;
  provider: "google" | "kakao";
}

//간편 회원가입
export interface PostOauthSignUp {
  nickname: string;
  redirectUrl: string;
  token: string;
}

//간편 로그인
export interface PostOauthSignIn {
  redirectUrl: string;
  token: string;
}

export interface OAuthProviderConfig {
  tokenUrl: string;
  userInfoUrl: string;
  clientId: string;
  clientSecret: string;
  redirectUri: string;
}

export interface OAuthConfig {
  [provider: string]: OAuthProviderConfig;
}
