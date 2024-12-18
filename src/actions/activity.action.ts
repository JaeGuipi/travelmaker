"use server";

import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";
import API_URL from "@/constants/config";
import { PostActivity } from "@/types/activites/activitesTypes";

// 체험 등록
export const postActivity = async (activityData: PostActivity) => {
  try {
    const cookieStore = cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

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
      throw new Error(errorResponse?.message || "체험 등록 실패");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("체험 등록 중 오류 발생: ", error);
    throw error;
  } finally {
    revalidateTag("activity");
  }
};

// 체험 수정
export const updateActivity = async (activityId: number, activityData: PostActivity) => {
  try {
    const cookieStore = cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

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
      const errorMessage = errorResponse?.message || "체험 수정 실패";
      throw new Error(errorMessage);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("체험 수정 중 오류 발생: ", error);
    throw error;
  } finally {
    revalidateTag("activity");
  }
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
