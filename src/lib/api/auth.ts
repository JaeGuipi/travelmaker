"use server";

import { cookies } from "next/headers";
import { PostAuth } from "@/app/types/types";
import { API_URL } from "@/constants/config";

const setCookie = (name: string, value: string) => {
  const cookieStore = cookies();
  cookieStore.set({
    name,
    value,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 7, // 일주일 동안 유지
  });
};

export const loginUser = async ({ email, password }: PostAuth) => {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error("로그인 실패");
    }

    const data = await response.json();

    console.log("데이터", data);
    console.log("액세스", data.accessToken);
    console.log("리프레시", data.refreshToken);

    setCookie("accessToken", data.accessToken);
    setCookie("refreshToken", data.refreshToken);

    return { success: true, user: data.user };
  } catch (error) {
    console.error("로그인 오류 발생:", error);
    throw new Error("로그인 요청 실패");
  }
};

export const authTokens = async () => {
  const refreshToken = cookies().get("refreshToken");

  if (!refreshToken) {
    console.log("리프레시 토큰이 없습니다.");
    throw new Error("Refresh token is missing.");
  }

  console.log("현재 리프레시 토큰:", refreshToken);

  try {
    const response = await fetch(`${API_URL}/auth/tokens`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${refreshToken}`,
      },
    });

    if (!response.ok) {
      console.log("토큰 재발급 실패");
      throw new Error("Failed to refresh tokens");
    }

    // 성공적으로 응답을 받은 경우, JSON으로 파싱
    const { accessToken } = await response.json();

    console.log("새로운 액세스 토큰:", accessToken);
    //console.log("새로운 리프레시 토큰:", newRefreshToken);

    // 쿠키에 새로운 토큰들 저장
    setCookie("accessToken", accessToken);
    //setCookie("refreshToken", newRefreshToken);

    console.log("새로운 토큰 저장 완료");

    return { success: true, message: "refreshToken 요청 성공" };
  } catch (error) {
    console.error("refreshToken 에러 발생:", error);
    throw new Error("refreshToken 요청 실패");
  }
};
