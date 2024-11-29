import Image from "next/image";
import Link from "next/link";
import classNames from "classnames/bind";
import s from "./Header.module.scss";
import CustomInput from "@/components/Input/CustomInput";
import { getMyInfo } from "@/lib/api/user";
import User from "@/components/Layout/Header/User";

export const cx = classNames.bind(s);

const Header = async () => {
  let user = null;

  try {
    user = await getMyInfo();
  } catch (error) {
    console.error("유저 정보 요청 실패", error);
  }

  return (
    <header className={cx("headerContainer", "container")}>
      <Link href={"/"} className={s.logo}>
        <Image src={"/images/logo.png"} fill alt="TRAVEL MAKER" />
      </Link>

      <Link href={"/search-page"} className={s.search}>
        <CustomInput
          id="search"
          type="text"
          iconType="search"
          borderColor="yellow"
          placeholder="무엇을 체험하고 싶으신가요?"
        />
      </Link>
      <User user={user} />
    </header>
  );
};

export default Header;
