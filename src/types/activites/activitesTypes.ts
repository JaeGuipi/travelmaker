import { Activity, Schedule } from "../types";

// 체험 리스트 조회
export interface GetActivities {
  totalCount?: number;
  activities: Activity[];
}

//체험 등록
export interface PostActivity {
  title: string;
  category: string;
  description: string;
  address: string;
  price: number;
  schedules: Schedule[];
  bannerImageUrl: string;
  subImageUrls: string[];
}

export type PostActivityResponse = Activity & {
  subImages: SubImage[];
  times: Schedule[];
};

export interface Time {
  endTime: string;
  startTime: string;
  id: number;
}

//체험 상세 조회
export type SubImage = {
  id: number;
  imageUrl: string;
};

export type ActivityDetail = Activity & {
  subImages: SubImage[];
  schedules: Schedule[];
};

//체험 예약 가능일 조회
export type DateSchedule = {
  date: string;
  times: Schedule[];
};

export type ScheduleList = DateSchedule[];

//체험 리뷰 조회
export interface Review {
  id: number;
  user: User;
  activityId: number;
  rating: number;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  profileImageUrl: string;
  nickname: string;
  id: number;
}

export interface GetReviews {
  averageRating: number;
  totalCount: number;
  reviews: Review[];
}

//체험 예약 신청
export interface PostReservation {
  scheduleId: number;
  headCount: number;
}

export interface PostReservationResponse {
  id: number;
  teamId: string;
  userId: number;
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
}

//체험 이미지 url 생성
export interface PostImageResponse {
  activityImageUrl: string;
}
