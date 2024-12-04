"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { PostAuth } from "@/types/auth/authTypes";
import API_URL from "@/constants/config";

const cookieStore = cookies();
const accessToken = cookieStore.get("accessToken")?.value;

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

    setCookie("accessToken", data.accessToken);
    setCookie("refreshToken", data.refreshToken);
  } catch (error) {
    console.log("로그인 중 오류 발생: ", error);
    throw new Error("로그인 실패");
  }

  revalidateTag("users");
};

// 로그아웃
export const logout = async () => {
  try {
    cookieStore.delete("accessToken");
    cookieStore.delete("refreshToken");
  } catch (error) {
    console.error("로그아웃 중 오류 발생: ", error);
    throw new Error("로그아웃 실패");
  }

  revalidateTag("users");
};

// 내 정보 수정
export const updateUsers = async (data: { profileImageUrl?: string; nickname?: string; newPassword?: string }) => {
  try {
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

  return data.profileImageUrl;
};

// export const authTokens = async () => {
//   const refreshToken = cookies().get("refreshToken")?.value;

//   if (!refreshToken) {
//     console.error("refreshToken이 없습니다.");
//     throw new Error("인증되지 않은 사용자");
//   }

//   try {
//     const response = await fetch(`${API_URL}/auth/tokens`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${refreshToken}`,
//       },
//     });

//     if (!response.ok) {
//       console.error("refreshToken 재발급 에러 발생");
//       throw new Error("refreshToken 재발급 실패");
//     }

//     const { accessToken } = await response.json();
//     setCookie("accessToken", accessToken);

//     return { success: true, message: "refreshToken 요청 성공" };
//   } catch (error) {
//     console.error("refreshToken 에러 발생: ", error);
//     throw new Error("refreshToken 요청 실패");
//   }
// };
