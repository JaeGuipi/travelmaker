"use client";

export default function OAuthLoginButton() {
  const handleLogin = () => {
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

    const redirectUri = "http://localhost:3000/oauth/google"; // Google/Kakao에서 설정한 리디렉션 URI
    const authUrl = `https://accounts.google.com/o/oauth2/auth?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=email profile`;
    window.location.href = authUrl; // OAuth 프로바이더로 리디렉션
  };

  return <button onClick={handleLogin}>r구글로 로그인</button>;
}
