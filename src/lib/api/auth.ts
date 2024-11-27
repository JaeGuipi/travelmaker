"use server";

import { cookies } from "next/headers";
import { PostAuth } from "@/types/auth/authTypes";
import API_URL from "@/constants/config";

// 쿠키 저장 함수
const setCookie = (name: string, value: string) => {
  const cookieStore = cookies();
  cookieStore.set({
    name,
    value,
    maxAge: 60 * 60 * 24 * 7, // 일주일 동안 유지
    path: "/",
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  });
};

// 쿠키 삭제 함수
const deleteCookie = (cookieName: string) => {
  const cookieStore = cookies();
  cookieStore.set(cookieName, "", {
    maxAge: 0,
    path: "/",
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  });
};

// 로그인
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

// 로그아웃
export const logoutUser = async () => {
  try {
    deleteCookie("accessToken");
    deleteCookie("refreshToken");

    console.log("로그아웃 성공");
  } catch (error) {
    console.error("로그아웃 중 오류 발생:", error);
    throw new Error("로그아웃 실패");
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
