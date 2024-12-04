import s from "./ItemLayout.module.scss";
import classNames from "classnames/bind";
import Image from "next/image";
import { ReactNode } from "react";

const cx = classNames.bind(s);

const ItemLayout = ({ children, src, alt }: { children: ReactNode; src: string; alt: string }) => {
  return (
    <div className={cx("item-container")}>
      <div className={cx("img-container")}>
        <Image src={src} width={204} height={204} alt={alt} className={s.img} />
      </div>
      {children}
    </div>
  );
};

export default ItemLayout
