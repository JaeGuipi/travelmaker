"use server";

import API_URL from "@/constants/config";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

// 내 예약 리뷰 작성
export const postReview = async (formData: FormData) => {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  const reservationId = formData.get("reservationId");
  const rating = Number(formData.get("rating"));
  const content = formData.get("content");

    const response = await fetch(`${API_URL}/my-reservations/${reservationId}/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ rating, content }),
    });

    if (!response.ok) {
      if (response.status === 409) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
      throw new Error("리뷰 등록 실패")
    }
    revalidateTag("reservation")
};
