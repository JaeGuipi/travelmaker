import config from "@/constants/config";

// 체험 리스트에 필요한 매개변수 인터페이스 정의
export interface FetchActivitiesParams {
  method: string;
  category?: string;
  keyword?: string;
  sort?: string;
  page?: number;
  size?: number;
}

// 체험 리스트 조회
export const getActivities = async (params: FetchActivitiesParams) => {
  const { category = "", keyword = "", sort = "", page = 1, size = 20 } = params;

  const queryParams = new URLSearchParams({
    method: "offset",
    category: category || "",
    keyword: keyword || "",
    sort: sort ? sort.toString() : "",
    page: page.toString(),
    size: size.toString(),
  });

  try {
    const response = await fetch(`${config.API_URL}/activities?${queryParams.toString()}`, {
      method: "GET",
    });
    return await response.json();
  } catch (error) {
    throw error;
  }
};

// 체험 리스트 등록
export const postActivities = async () => {
  try {
    const response = await fetch(`${config.API_URL}/activities`, {
      method: "POST",
      body: JSON.stringify({ title, category, description, address, price, schedules, bannerImageUrl, subImageUrls }),
    });
    return await response.json();
  } catch (error) {
    throw error;
  }
};
// 체험 상세 조회
// 체험 예약 가능일 조회
// 체험 리뷰 조회
// 체험 예약 신청
// 체험 이미지 url 생성
