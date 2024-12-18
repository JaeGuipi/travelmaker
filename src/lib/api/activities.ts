import { GetActivities } from "@/types/activites/activitesTypes";
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
      cache: "no-cache",
    });
    return await response.json();
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
};
