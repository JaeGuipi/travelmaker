//내 체험 수정
export interface PatchMyActivities {
  title: string;
  category: string;
  description: string;
  price: number;
  address: string;
  bannerImageUrl: string;
  subImageIdsToRemove: [];
  subImageUrlsToAdd: [];
  scheduleIdsToRemove: [];
  schedulesToAdd: [];
}

//내 체험 예약 상태(승인,거절)업데이트
export type PatchMyActivitiesByReservations = {
  status: "pending" | "confirm" | "decline";
};

export interface getMyActivitiesQuery {
  cursorId: string;
  size: number;
}

export interface getMyActivitiesByDashboardQuery {
  activityId: string;
  year: string;
  month: string;
}

// 예약 상태에 대한 타입 정의
interface ReservationStatus {
  completed: number;
  confirmed: number;
  pending: number;
}

export interface ResponsReservationMonthData {
  date: string;
  reservations: ReservationStatus; // 예약 상태
}

export interface ResponsReservedSchduleData {
  scheduleId: number;
  startTime: string;
  endTime: string;
  count: {
    declined: number;
    confirmed: number;
    pending: number;
  };
}

export interface getMyActivitiesByScheduleQuery {
  activityId: string;
  date: string;
}

export interface getMyActivitiesByReservationsQuery {
  activityId: string;
  scheduleId: string;
  status: "declined" | "pending" | "confirmed";
}

export interface updateReservationStatusQuery {
  activityId: string;
  reservationId: string;
}

interface Reservation {
  id: number; // 예약의 고유 ID
  nickname: string; // 사용자의 닉네임
  userId: number; // 사용자의 고유 ID
  teamId: string; // 팀 ID
  activityId: number; // 활동 ID
  scheduleId: number; // 일정 ID
  status: string; // 예약 상태 (예: pending, confirmed, declined 등)
  reviewSubmitted: boolean; // 리뷰 제출 여부
  totalPrice: number; // 총 가격
  headCount: number; // 인원 수
  date: string; // 예약 날짜 (YYYY-MM-DD 형식의 문자열)
  startTime: string; // 시작 시간 (HH:MM 형식의 문자열)
  endTime: string; // 종료 시간 (HH:MM 형식의 문자열)
  createdAt: string; // 생성 시간 (ISO 8601 형식의 날짜 문자열)
  updatedAt: string; // 수정 시간 (ISO 8601 형식의 날짜 문자열)
}

export interface ReservationResponse {
  cursorId: number; // 다음 페이지의 커서 ID
  totalCount: number; // 총 예약 수
  reservations: Reservation[]; // 예약 목록 (Reservation 배열)
}
