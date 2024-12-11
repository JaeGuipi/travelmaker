import { ReactNode } from "react";
import Link from "next/link";
import s from "./AuthForm.module.scss";
import classNames from "classnames/bind";
import Image from "next/image";

const cx = classNames.bind(s);

interface FormLinkProps {
  title: string;
  link: string;
  linkTitle: string;
  children: ReactNode;
}

const AuthForm = ({ title, link, linkTitle, children }: FormLinkProps) => {
  return (
    <div className={cx("form-link-container")}>
      <h1 className={s.logo}>
        <Link href={"/"}>
          <Image src="/images/logo.png" width={210} height={38} alt="logo" />
        </Link>
      </h1>
      {children}
      <div className={cx("form-link-wrap")}>
        <span className={cx("form-link-title")}>{title}</span>
        <Link className={cx("form-link")} href={`/${link}`}>
          {linkTitle}
        </Link>
      </div>
    </div>
  );
};

export default AuthForm;
