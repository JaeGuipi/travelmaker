"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import API_URL from "@/constants/config";
import { PostActivity } from "@/types/activites/activitesTypes";

// 체험 등록
export const postActivity = async (activityData: PostActivity) => {
  try {
    const cookieStore = cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    console.log("전송 데이터:", activityData);

    const response = await fetch(`${API_URL}/activities`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(activityData),
    });

    if (!response.ok) {
      throw new Error("체험 등록 실패");
    }

    const data = await response.json();
    console.log("체험 등록 데이터", data);
    return data;
  } catch (error) {
    console.log("체험 등록 중 오류 발생: ", error);
  }

  revalidateTag("activity");
};

// 체험 이미지 URL 생성
export const uploadActivityImage = async (formData: FormData) => {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

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

  return data.activityImageUrl;
};
