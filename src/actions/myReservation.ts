"use server";

import API_URL from "@/constants/config";
import { cookies } from "next/headers";

// 내 예약 리뷰 작성
export const postReview = async (formData: FormData) => {
const cookieStore = cookies();
const accessToken = cookieStore.get("accessToken")?.value;

const reservationId = formData.get("reservationId")

const response = await fetch(`${API_URL}/my-reservations/${reservationId}/reviews`, {
  method: "POST",
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
  body: formData,
})
console.log(response);
if (!response.ok) {
  throw new Error("리뷰 등록 실패")
}
}

