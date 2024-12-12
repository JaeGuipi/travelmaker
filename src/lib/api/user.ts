"use server";

import { GetMe, PatchMe, PostImageResponse } from "@/types/users/usersTypes";
import API_URL from "@/constants/config";
import { customFetch } from "@/utils/customFetch";

// // 회원가입
// export const signUpUser = async (userData: SignUp) => {
//   const response = await fetch(`${API_URL}/users`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(userData),
//   });

//   if (!response.ok) {
//     const errorData = await response.json();
//     throw new Error(errorData.message);
//   }

//   return response.json();
// };

// 내 정보 조회
export const getMyInfo = async (): Promise<GetMe> => {
  const response = await customFetch(`${API_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`서버에서 내 정보 조회 실패: ${response.statusText}`);
  }

  return response.json() as Promise<GetMe>;
};

// 내 정보 수정
export const updateMyInfo = async (updateData: PatchMe) => {
  const response = await customFetch(`${API_URL}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updateData),
  });

  if (!response.ok) {
    throw new Error(`내 정보 수정 실패: ${response.statusText}`);
  }

  return response.json();
};

// 프로필 이미지 URL 생성
export const createProfileImageUrl = async (formData: FormData): Promise<PostImageResponse> => {
  // 서버 액션에서 FormData는 직접 처리할 수 없다.
  console.log(formData);

  const response = await customFetch(`${API_URL}/users/me/image`, {
    method: "POST",
    body: formData,
  });

  console.log(response);

  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(`프로필 이미지 URL 생성 실패: ${response.statusText} - ${errorMessage}`);
  }

  // return response.json() as Promise<PostImageResponse>;
  const data: PostImageResponse = await response.json();
  return data;
};
