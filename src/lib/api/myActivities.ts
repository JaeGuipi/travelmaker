import {API_URL} from "@/constants/config";

import {
  PatchMyActivities,
  PatchMyActivitiesByReservations,
  getMyActivitiesByDashboardQuery,
  getMyActivitiesByScheduleQuery,
  getMyActivitiesByReservationsQuery,
  updateReservationStatusQuery,
} from "@/app/types/myActivitiesTypes/myActivitiesTypes";


const BASE_PATH = "/my-activities";

const fetchData = async (endpoint: string, options: RequestInit = {}) => {
  const response = await fetch(`${API_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  });
  if (!response.ok) {
    const errorDetails = await response.json().catch(() => {});
    throw new Error(`API 요청 실패: ${response.statusText}, ${JSON.stringify(errorDetails)}`);
  }
  return response.json();
};

//내 체험리스트 조회
export const getMyActivities = async () => fetchData(`${BASE_PATH}`);

//내 체험 월별 예약 현황 조회
export const getMyActivitiesByDashboard = async (query: getMyActivitiesByDashboardQuery) => {
  const queryString = `?year=${query.year}&month=${query.month}`;
  return fetchData(`/${BASE_PATH}/${query.activityId}/reservation-dashboard${queryString}`);
};

//내 체험 날짜별 스케쥴 조회
export const getMyActivitiesBySchedule = async (query: getMyActivitiesByScheduleQuery) => {
  const queryString = `?date=${query.date}`;
  return fetchData(`/${BASE_PATH}/${query.activityId}/reserved-schedule${queryString}`);
};

//내 체험 예약 시간대별 예약 내역 조회
export const getMyActivitiesByReservations = async (query: getMyActivitiesByReservationsQuery) => {
  const queryString = `?scheduleId=${query.scheduleId}&status=${query.status}`;
  return fetchData(`/${BASE_PATH}/${query.activityId}/${queryString}`);
};

//내 체험 예약 상태(승인,거절) 업데이트
export const updateReservationStatus = async (
  query: updateReservationStatusQuery,
  body: PatchMyActivitiesByReservations,
) => {
  return fetchData(`${BASE_PATH}/${query.activityId}/reservations/${query.reservationId}`, {
    method: "PATCH",
    body: JSON.stringify(body),
  });
};

//내 체험 삭제
export const deleteMyActivities = async (activityId: string) => {
  return fetchData(`${BASE_PATH}/${activityId}`, {
    method: "DELETE",
  });
};

// 내 체험 수정
export const updateMyActivities = async (activityId: string, body: PatchMyActivities) => {
  return fetchData(`${BASE_PATH}/${activityId}`, {
    method: "PATCH",
    body: JSON.stringify(body),
  });
};
