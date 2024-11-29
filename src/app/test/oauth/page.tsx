"use client";

import { useToast } from "@/hooks/useToast";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function LoginButton() {
  const { showError, showSuccess } = useToast();
  const searchParams = useSearchParams();

  useEffect(() => {
    const code = searchParams.get("code");

    if (code) {
      (async () => {
        try {
          const response = await fetch(`/api/kakao-auth?code=${code}`);
          const result = await response.json();

          if (!response.ok || !result.success) {
            showError(result.error || "로그인 실패");
            return;
          }

          showSuccess("로그인 성공!");
          window.location.href = "/"; // 성공 시 메인 페이지로 이동
        } catch (error) {
          console.error("API 호출 에러:", error);
          showError("서버와의 통신 중 문제가 발생했습니다.");
        }
      })();
    }
  }, [searchParams, showError, showSuccess]);

  const handleKakaoLogin = () => {
    const clientId = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID;
    const redirectUri = `http://localhost:3000/api/kakao-auth`;

    const authUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code`;
    window.location.href = authUrl; // 카카오로 리디렉션
  };

  return <button onClick={handleKakaoLogin}>카카오로 로그인</button>;
}
