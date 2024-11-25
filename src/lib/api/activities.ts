import { GetMyActivities, PostActivites } from "@/app/types/types";
import { API_URL } from "@/constants/config";

// 체험 리스트 조회
export const getActivity = async (): Promise<GetMyActivities> => {
  try {
    const response = await fetch(`${API_URL}/activities?method=offset`, {
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
export const postActivity = async (activeData: PostActivites) => {
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
export const getActivityDetail = async (): Promise<GetMyActivities> => {
  try {
    const response = await fetch(`${API_URL}/activities?method=offset`, {
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
// 체험 리뷰 조회
// 체험 예약 신청
// 체험 이미지 url 생성
