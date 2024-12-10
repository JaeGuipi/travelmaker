import Image from "next/image";
import s from "./MyReservationList.module.scss"

const NoList = ({text}:{text:string}) => {
  return (
    <div className={s["no-list"]}>
      <Image src="/images/no-list.png" width={110} height={149} alt="" />
      <p className={s["no-list-notice"]}>{text}</p>
    </div>
  );
}

export default NoList;