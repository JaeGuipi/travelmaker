"use server";

import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";
import API_URL from "@/constants/config";
import { PostActivity } from "@/types/activites/activitesTypes";

// 체험 등록
export const postActivity = async (activityData: PostActivity) => {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    throw new Error("인증 정보가 유효하지 않습니다.");
  }

  const response = await fetch(`${API_URL}/activities`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(activityData),
  });

  if (!response.ok) {
    const errorResponse = await response.json();
    return {
      success: false,
      message: errorResponse?.message || "체험 등록에 실패하였습니다.",
    };
  }

  revalidateTag("activity");
  return { success: true, message: "체험이 성공적으로 등록되었습니다." };
};

// 체험 수정
export const updateActivity = async (
  activityId: number,
  activityData: PostActivity,
): Promise<{ success: boolean; message: string }> => {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return { success: false, message: "인증 정보가 유효하지 않습니다." };
  }

  const response = await fetch(`${API_URL}/my-activities/${activityId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(activityData),
  });

  if (!response.ok) {
    const errorResponse = await response.json();
    return {
      success: false,
      message: errorResponse?.message || "체험 수정에 실패하였습니다.",
    };
  }

  revalidateTag("activity");
  return { success: true, message: "체험이 성공적으로 수정되었습니다." };
};

// 체험 삭제
export const deleteActivity = async (activityId: number) => {
  try {
    const cookieStore = cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    const response = await fetch(`${API_URL}/my-activities/${activityId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      return { status: response.status, message: errorData.message };
    }
    return { status: 204 };
  } catch (error) {
    if (error instanceof Error) {
      return { status: 500, message: error.message };
    }
  } finally {
    revalidateTag("activity");
  }
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
  return data.activityImageUrl;
};
