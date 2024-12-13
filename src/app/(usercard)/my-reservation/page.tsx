import API_URL from "@/constants/config";
import { MyReservation } from "@/types/myReservationsTypes/myReservationsTypes";
import MyReservationList from "@/app/(usercard)/my-reservation/MyReservationList/MyReservationList";
import { customFetch } from "@/utils/customFetch";

const MyReservationPage = async () => {
  const response = await customFetch(`${API_URL}/my-reservations?size=6`);

  if (!response.ok) {
    console.error("예약 데이터를 불러오는 데 실패했습니다.");
  }
  const myReservation = await response.json();
  const cursorId = myReservation.cursorId;
  const reservationList: MyReservation[] = myReservation.reservations;

  return <MyReservationList initialReservationList={reservationList} cursorId={cursorId} />;
};

export default MyReservationPage;
