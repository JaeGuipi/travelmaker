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
