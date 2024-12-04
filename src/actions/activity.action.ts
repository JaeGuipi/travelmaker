"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import API_URL from "@/constants/config";

const cookieStore = cookies();
const accessToken = cookieStore.get("accessToken")?.value;

// 체험 이미지 URL 생성
export const uploadActivityImage = async (formData: FormData) => {
  const response = await fetch(`${API_URL}/activities/image`, {
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

  return data.bannerImageUrl;
};
