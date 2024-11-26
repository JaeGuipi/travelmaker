import { GetMyNotifications } from "@/app/types/notifications/notificationsTypes";
import { customFetch } from "@/utils/customFetch";
import { API_URL } from "@/constants/config";

// 내 알림 리스트 조회
export const getMyNotifications = async (size: number = 10, cursorId?: string): Promise<GetMyNotifications> => {
  const response = await customFetch(
    `${API_URL}/my-notifications?size=${size}${cursorId ? `&cursorId=${cursorId}` : ""}`,
    {
      method: "GET",
    },
  );

  if (!response.ok) {
    throw new Error(`내 알림 리스트 조회 실패: ${response.statusText}`);
  }

  const data: GetMyNotifications = await response.json();
  return data;
};

// 내 알림 리스트 조회
export const deleteMyNotifications = async (notificationId: number) => {
  const response = await customFetch(`${API_URL}/my-notifications/${notificationId}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error(`내 알림 삭제 실패: ${response.statusText}`);
  }

  const data = await response.json();
  return data;
};
