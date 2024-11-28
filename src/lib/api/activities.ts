import {
  GetActivities,
  PostActivity,
  PostActivityResponse,
  ActivityDetail,
  GetReviews,
  PostReservation,
  ScheduleList,
  PostReservationResponse,
} from "@/types/activites/activitesTypes";
import { PostImage, PostImageResponse } from "@/types/types";
import API_URL from "@/constants/config";

// 체험 리스트 조회
export const getActivity = async (params: { size?: number; category?: string } = {}): Promise<GetActivities> => {
  try {
    const query = new URLSearchParams({ method: "offset" });

    // params 객체에서 존재하는 키만 쿼리에 추가
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        query.append(key, String(value));
      }
    });

    const response = await fetch(`${API_URL}/activities?${query}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await response.json();
  } catch (error) {
    throw error;
  }
};

// 체험 리스트 등록
export const postActivity = async (activeData: PostActivity): Promise<PostActivityResponse> => {
  try {
    const response = await fetch(`${API_URL}/activities`, {
      method: "POST",
      body: JSON.stringify(activeData),
    });
    return await response.json();
  } catch (error) {
    throw error;
  }
};

// 체험 상세 조회
export const getActivityDetail = async (activityId: number): Promise<ActivityDetail> => {
  try {
    const response = await fetch(`${API_URL}/activities/${activityId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await response.json();
  } catch (error) {
    throw error;
  }
};

// 체험 예약 가능일 조회
export const getAvailableSchedule = async (activityId: number, year: string, month: string): Promise<ScheduleList> => {
  try {
    const response = await fetch(`${API_URL}/activities/${activityId}/available-schedule?year=${year}&month=${month}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await response.json();
  } catch (error) {
    throw error;
  }
};

// 체험 리뷰 조회
export const getActivityReview = async (activityId: number): Promise<GetReviews> => {
  try {
    const response = await fetch(`${API_URL}/activities/${activityId}/reviews`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await response.json();
  } catch (error) {
    throw error;
  }
};

// 체험 예약 신청
export const postReservation = async (
  activityId: number,
  reservationData: PostReservation,
): Promise<PostReservationResponse> => {
  try {
    const response = await fetch(`${API_URL}/activities/${activityId}/reservations`, {
      method: "POST",
      body: JSON.stringify(reservationData),
    });
    return await response.json();
  } catch (error) {
    throw error;
  }
};

// 체험 이미지 url 생성
export const createActivityImage = async ({ file }: PostImage): Promise<PostImageResponse> => {
  if (!file) throw new Error("이미지가 없습니다.");

  const formData = new FormData();
  formData.append("image", file);

  try {
    const response = await fetch(`${API_URL}/activities/image`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "이미지 업로드 실패");
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};
