// import API_URL from "@/constants/config";
import s from "./page.module.scss";
import classNames from "classnames/bind";
// import { MyReservation } from "@/types/types";
// import MyReservationList from "@/components/MyReservationList/MyReservationList";
// import { customFetch } from "@/utils/customFetch";

const cx = classNames.bind(s);

const MyReservationPage = async () => {

  // const response = await customFetch(`${API_URL}/my-reservations?size=6`, {
  // });

  // if (!response.ok) {
  //   console.error("예약 데이터를 불러오는 데 실패했습니다.");
  // }
  // const myReservation = await response.json();
  // const cursorId = myReservation.cursorId;
  // const reservationList: MyReservation[] = myReservation.reservations;

  return (
    // <section className={cx("container", "reservation")}>
      <div className={s.reservation}>
        <div className={cx("list-title-container")}>
          <h2 className={cx("list-title")}>예약 내역</h2>
        </div>
        {/* <MyReservationList initialReservations={reservationList} cursorId={cursorId} /> */}
      </div>
    // </section>
  );
};

export default MyReservationPage;
