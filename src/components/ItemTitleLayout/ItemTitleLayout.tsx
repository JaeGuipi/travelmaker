import { ReactNode } from "react";
import s from "./ItemTitleLayout.module.scss"

const ItemTitleLayout = ({title, children} :{title:string; children:ReactNode}) => {
  return (
    // <div className={s["title-container"]}>
      <div className={s["list-title-container"]}>
        <h2 className={s["list-title"]}>{title}</h2>
        {children}
      </div>
    // </div>
  );
}

export default ItemTitleLayout;