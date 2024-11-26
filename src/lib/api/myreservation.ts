import { customFetch } from "@/utils/customFetch";
import { GetMyReservations, PatchMyReservations, PostMyReservations } from "../../app/types/types";
import config from "@/constants/config";

const API_URL = config.API_URL;

// 내 예약 리스트 조회
export const getMyReservations = async (): Promise<GetMyReservations> => {
  const response = await customFetch(`${API_URL}/my-reservations`, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error(`내 예약 리스트 조회 실패: ${response.statusText}`);
  }

  const data: GetMyReservations = await response.json();
  return data;
};

// 내 예약 수정 (취소)
export const updateMyReservation = async (reservationId: number, updateData: PatchMyReservations) => {
  const response = await customFetch(`${API_URL}/my-reservations/${reservationId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updateData),
  });

  if (!response.ok) {
    throw new Error(`내 예약 수정 실패: ${response.statusText}`);
  }
};

// 내 예약 리뷰 작성
export const createMyReservationReview = async (reservationId: number, reviewData: PostMyReservations) => {
  const response = await customFetch(`${API_URL}/my-reservations/${reservationId}/reviews`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reviewData),
  });

  if (!response.ok) {
    throw new Error(`내 예약 리뷰 작성 실패: ${response.statusText}`);
  }
};
