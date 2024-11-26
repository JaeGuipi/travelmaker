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

    setCookie("accessToken", data.accessToken);
    setCookie("refreshToken", data.refreshToken);

    return { success: true, user: data.user };
  } catch (error) {
    console.error("로그인 오류 발생:", error);
    throw new Error("로그인 요청 실패");
  }
};

export const authTokens = async () => {
  const refreshToken = cookies().get("refreshToken")?.value;

  if (!refreshToken) {
    console.error("refreshToken이 없습니다.");
    throw new Error("인증되지 않은 사용자");
  }

  try {
    const response = await fetch(`${API_URL}/auth/tokens`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${refreshToken}`,
      },
    });

    if (!response.ok) {
      console.error("refreshToken 재발급 에러 발생");
      throw new Error("refreshToken 재발급 실패");
    }

    const { accessToken } = await response.json();
    setCookie("accessToken", accessToken);

    return { success: true, message: "refreshToken 요청 성공" };
  } catch (error) {
    console.error("refreshToken 에러 발생: ", error);
    throw new Error("refreshToken 요청 실패");
  }
};
