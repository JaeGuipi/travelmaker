"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { PostAuth } from "@/types/auth/authTypes";
import { SignUp } from "@/types/users/usersTypes";
import API_URL from "@/constants/config";

// 쿠키 저장 함수
const setCookie = (name: string, value: string, maxAge: number = 60 * 60 * 24 * 7) => {
  const cookieStore = cookies();
  cookieStore.set({
    name,
    value,
    maxAge,
    path: "/",
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  });
};

// 로그인
export const login = async (loginData: PostAuth) => {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    });

    if (!response.ok) {
      throw new Error("로그인 실패");
    }

    const data = await response.json();

    const accessTokenMaxAge: number = 60 * 60;
    const refreshTokenMaxAge: number = 60 * 60 * 24 * 14;

    setCookie("accessToken", data.accessToken, accessTokenMaxAge);
    setCookie("refreshToken", data.refreshToken, refreshTokenMaxAge);
  } catch (error) {
    console.log("로그인 중 오류 발생: ", error);
    throw new Error("로그인 실패");
  }

  revalidateTag("users");
};

// 로그아웃
export const logout = async () => {
  try {
    const cookieStore = cookies();
    cookieStore.delete("accessToken");
    cookieStore.delete("refreshToken");
  } catch (error) {
    console.error("로그아웃 중 오류 발생: ", error);
    throw new Error("로그아웃 실패");
  }

  revalidateTag("users");
};

// 회원가입
export const signUpUser = async (userData: SignUp) => {
  const response = await fetch(`${API_URL}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message);
  }

  return response.json();
};

// 내 정보 수정
export const updateUsers = async (data: {
  nickname?: string;
  profileImageUrl?: string | null;
  newPassword?: string;
}) => {
  try {
    const cookieStore = cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    const response = await fetch(`${API_URL}/users/me`, {
      method: "PATCH",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error("내 정보 수정 실패");
    }
  } catch (error) {
    console.error("내 정보 수정 중 오류 발생: ", error);
    throw new Error("내 정보 수정 실패");
  }

  revalidateTag("users");
};

// 프로필 이미지 URL 생성
export const uploadProfileImage = async (formData: FormData) => {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  const response = await fetch(`${API_URL}/users/me/image`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: formData,
  });

  if (!response.ok) {
    throw new Error("이미지 업로드 실패");
  }

  const data = await response.json();
  console.log("Upload successful:", data);

  revalidateTag("users");

  return data.profileImageUrl;
};
