import { redirect } from "next/navigation";

export default async function GoogleCallback({ searchParams }: { searchParams: { [key: string]: string } }) {
  const code = searchParams.code;

  if (!code) {
    redirect("/error");
    return null; // 리디렉션 이후 코드 중단
  }

  try {
    const response = await fetch("http://localhost:3000/api/google-auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        code,
        redirectUri: "http://localhost:3000/oauth/google",
      }),
    });

    if (!response.ok) {
      redirect("/error");
      return null; // 리디렉션 이후 코드 중단
    }

    const data = await response.json();
    console.log("Google 로그인 성공:", JSON.stringify(data)); // JSON 직렬화 가능 여부 확인

    redirect("/");
    return null; // 리디렉션 이후 코드 중단
  } catch (error) {
    console.error("Google OAuth 처리 중 오류 발생:", error);
    redirect("/error");
    return null; // 리디렉션 이후 코드 중단
  }
}
