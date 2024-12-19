import API_URL from "@/constants/config";
import { MyReservation } from "@/types/myReservationsTypes/myReservationsTypes";
import MyReservationList from "@/app/(usercard)/my-reservation/MyReservationList/MyReservationList";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const MyReservationPage = async () => {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

 if (!accessToken) redirect("/login");

  const response = await fetch(`${API_URL}/my-reservations?size=6`, {
    headers: {
      Authorization: `Barer ${accessToken}`,
    },
  });

  if (!response.ok) {
    console.error("예약 데이터를 불러오는 데 실패했습니다.");
  }
  const myReservation = await response.json();
  const cursorId = myReservation.cursorId;
  const reservationList: MyReservation[] = myReservation.reservations;

  return <MyReservationList initialReservationList={reservationList} cursorId={cursorId} />;
};

export default MyReservationPage;
