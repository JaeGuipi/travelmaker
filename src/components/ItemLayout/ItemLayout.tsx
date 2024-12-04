import s from "./ItemLayout.module.scss";
import Image from "next/image";
import { ReactNode } from "react";

const ItemLayout = ({ children, src, alt }: { children: ReactNode; src: string; alt: string }) => {
  return (
    <div className={s["item-container"]}>
      <div className={s["img-container"]}>
        <Image src={src} width={204} height={204} alt={alt} className={s.img} />
      </div>
      {children}
    </div>
  );
};

export default ItemLayout
