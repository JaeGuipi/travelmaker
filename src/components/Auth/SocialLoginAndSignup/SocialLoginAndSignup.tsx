"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import s from "./SocialLoginAndSignup.module.scss";
import classNames from "classnames/bind";
import { useToast } from "@/hooks/useToast";

type Props = {
  type: "login" | "signup";
};

const cx = classNames.bind(s);

const SocialLoginAndSignup = ({ type = "login" }: Props) => {
  const searchParams = useSearchParams();
  const { showError } = useToast();

  const title = type === "login" ? "SNS 계정으로 로그인하기" : "SNS 계정으로 회원가입하기";

  const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
  const googleRedirectUri = `http://localhost:3000/api/google-auth`;
  const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${googleClientId}&redirect_uri=${googleRedirectUri}&response_type=code&scope=https://www.googleapis.com/auth/userinfo.email&state=${type}`;

  const kakaoclientId = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID;
  const kakaoredirectUri = `http://localhost:3000/api/kakao-auth`;
  const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${kakaoclientId}&redirect_uri=${kakaoredirectUri}&response_type=code&state=${type}`;

  // 에러 메시지 확인
  useEffect(() => {
    const error = searchParams.get("error");
    if (error) {
      showError(`${error} 로그인으로 이동해서 진행해주세요.`);
    }
  }, [searchParams]);

  return (
    <div className={cx("social-login-container")}>
      <div className={cx("divider")}>
        <span className={cx("divider-title")}>{title}</span>
      </div>
      <div className={cx("link-container")}>
        <Link href={googleAuthUrl}>
          <Image src="/images/logo_google.png" alt="구글 버튼" width={72} height={72} />
        </Link>
        <Link href={kakaoAuthUrl}>
          <Image src="/images/logo_kakao.png" alt="카카오 버튼" width={72} height={72} />
        </Link>
      </div>
    </div>
  );
};

export default SocialLoginAndSignup;
