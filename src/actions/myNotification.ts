"use server";

import API_URL from "@/constants/config";
import { cookies } from "next/headers";

// 알림 삭제
export const deleteNotification = async (notificationId: number) => {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  try {
    const response = await fetch(`${API_URL}/my-notifications/${notificationId}`, {
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
