import { PostReservation } from "@/types/activites/activitesTypes";
// import { revalidateTag } from "next/cache";
import API_URL from "@/constants/config";

// 체험 예약 신청
export async function postReservation(activityId: number, reservationData: PostReservation) {
  await fetch(`${API_URL}/activities/${activityId}/reservations`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reservationData),
  });

  // revalidateTag("reservation"); // 내 체험 예약 조회
}
