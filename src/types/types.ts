//체험 등록
export type Schedule = {
  id: number;
  date: string;
  startTime: string;
  endTime: string;
};

export interface PostActivites {
  title: string;
  category: string;
  description: string;
  address: string;
  price: number;
  schedules: Schedule[];
}

//MyActivities
//내체험리스트 조회
export type Activity = {
  id: number;
  userId: number;
  title: string;
  description: string;
  category: string;
  price: number;
  address: string;
  bannerImageUrl: string;
  rating: number;
  reviewCount: number;
  createdAt: string;
  updatedAt: string;
};

export interface GetMyActivities {
  cursorId: number;
  totalCount: number;
  activities: Activity[];
}

//내 체험 월별 예약 현황 조회
export type Reservation = {
  completed: number;
  confirmed: number;
  pending: number;
};

export interface GetMyActivitiesByDashbord {
  date: string;
  reservations: Reservation[];
}

export type GetMyActivitiesByIdResponse = GetMyActivitiesByDashbord[];

//내 체험 날짜별 예약 정보가 있는 스케쥴 조회
export type Count = {
  declined: number;
  confirmed: number;
  pending: number;
};

export interface GetMyActivitiesBySchedule {
  scheduleId: number;
  startTime: string;
  endTime: string;
  count: Count;
}

export type GetMyActivitiesByScheduleResponse = GetMyActivitiesBySchedule[];

//내 체험 예약 시간대별 예약 내역 조회
export type ActivityReservation = {
  id: number;
  nickname: string;
  userId: number;
  teamId: string;
  activityId: number;
  scheduleId: number;
  status: string;
  reviewSubmitted: boolean;
  totalPrice: number;
  headCount: number;
  date: string;
  startTime: string;
  endTime: string;
  createdAt: string;
  updatedAt: string;
};

export interface GetMyActivitiesByReservations {
  cursorId: number;
  totalCount: number;
  reservations: ActivityReservation[];
}

// //내 체험 예약 상태(승인,거절)업데이트
// export type PatchMyActivitiesByReservations = {
//   status: "pending" | "confirm" | "decline";
// };

// //내 체험 수정
// export interface PatchMyActivities {
//   title: string;
//   category: string;
//   description: string;
//   price: number;
//   address: string;
//   bannerImageUrl: string;
//   subImageIdsToRemove: [];
//   subImageUrlsToAdd: [];
//   scheduleIdsToRemove: [];
//   schedulesToAdd: [];
// }

//MyReservations
//내 예약 리스트 조회
export type MyReservation = {
  id: number;
  teamId: string;
  userId: number;
  activity: MyActivity;
  scheduleId: number;
  status: string;
  reviewSubmitted: boolean;
  totalPrice: number;
  headCount: number;
  date: string;
  startTime: string;
  endTime: string;
  createdAt: string;
  updatedAt: string;
};

export type MyActivity = {
  bannerImageUrl: string;
  title: string;
  id: number;
};

export interface GetMyReservations {
  cursorId: number;
  reservations: MyReservation[];
  totalCount: number;
}

//내 예약 수정(취소)
export type PatchMyReservations = {
  status: "cancle";
};

//내 예약 리뷰 작성
export interface PostMyReservations {
  rating: number;
  content: string;
}

//체험 이미지 url 생성
export interface PostImage {
  file: File;
}

export interface PostImageResponse {
  profileImageUrl: string;
}
