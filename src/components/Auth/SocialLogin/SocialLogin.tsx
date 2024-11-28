import Image from "next/image";
import Link from "next/link";
import s from "./SocialLogin.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(s);

const SocialLogin = () => {
  return (
    <div className={cx("social-login-container")}>
      <div className={cx("divider")}>
        <span className={cx("divider-title")}>SNS 계정으로 로그인하기</span>
      </div>
      <div className={cx("link-container")}>
        <Link href="/">
          <Image src="/images/logo_google.svg" fill alt="구글 로그인" />
        </Link>
        <Link href="/">
          <Image src="/images/logo_kakao.svg" fill alt="카카오 로그인" />
        </Link>
      </div>
    </div>
  );
};

export default SocialLogin;
