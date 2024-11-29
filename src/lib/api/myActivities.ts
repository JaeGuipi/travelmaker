import {
  PatchMyActivities,
  PatchMyActivitiesByReservations,
  getMyActivitiesQuery,
  getMyActivitiesByDashboardQuery,
  getMyActivitiesByScheduleQuery,
  getMyActivitiesByReservationsQuery,
  updateReservationStatusQuery,
} from "@/types/myActivitiesTypes/myActivitiesTypes";
import { customFetch } from "@/utils/customFetch";

const BASE_PATH = "/my-activities";

//내 체험리스트 조회
export const getMyActivities = async (query: getMyActivitiesQuery) => {
  const queryString = `?cusorId=${query.cursorId}&size=${query.size}`;

  return customFetch(`${BASE_PATH}${queryString}`);
};

//내 체험 월별 예약 현황 조회
export const getMyActivitiesByDashboard = async (query: getMyActivitiesByDashboardQuery) => {
  const queryString = `?year=${query.year}&month=${query.month}`;
  return customFetch(`/${BASE_PATH}/${query.activityId}/reservation-dashboard${queryString}`);
};

//내 체험 날짜별 스케쥴 조회
export const getMyActivitiesBySchedule = async (query: getMyActivitiesByScheduleQuery) => {
  const queryString = `?date=${query.date}`;
  return customFetch(`/${BASE_PATH}/${query.activityId}/reserved-schedule${queryString}`);
};

//내 체험 예약 시간대별 예약 내역 조회
export const getMyActivitiesByReservations = async (query: getMyActivitiesByReservationsQuery) => {
  const queryString = `?scheduleId=${query.scheduleId}&status=${query.status}`;
  return customFetch(`/${BASE_PATH}/${query.activityId}/${queryString}`);
};

//내 체험 예약 상태(승인,거절) 업데이트
export const updateReservationStatus = async (
  query: updateReservationStatusQuery,
  body: PatchMyActivitiesByReservations,
) => {
  return customFetch(`${BASE_PATH}/${query.activityId}/reservations/${query.reservationId}`, {
    method: "PATCH",
    body: JSON.stringify(body),
  });
};

//내 체험 삭제
export const deleteMyActivities = async (activityId: string) => {
  return customFetch(`${BASE_PATH}/${activityId}`, {
    method: "DELETE",
  });
};

// 내 체험 수정
export const updateMyActivities = async (activityId: string, body: PatchMyActivities) => {
  return customFetch(`${BASE_PATH}/${activityId}`, {
    method: "PATCH",
    body: JSON.stringify(body),
  });
};
