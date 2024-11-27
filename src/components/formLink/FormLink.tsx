import { ReactNode } from "react";
import Link from "next/link";
import s from "./FormLink.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(s);

interface FormLinkProps{
title: string;
link: string;
children: ReactNode;
}

const FormLink = ({ title, link, children }: FormLinkProps) => {
  return (
    <div className={cx("form-link-container")}>
      <span className={cx("form-link-title")}>{title}</span>
      <Link className={cx("form-link")} href={`${link}`}>
        {children}
      </Link>
    </div>
  );
};

export default FormLink;