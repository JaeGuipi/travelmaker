import React from "react";
import s from "./TotalPrice.module.scss";

interface TotalPriceProps {
  price: number;
  count: number;
}

const TotalPrice: React.FC<TotalPriceProps> = ({ price, count }) => {
  const totalPrice = price * count;
  return (
    <div className={s.total}>
      <h4 className={s.title}>총 합계</h4>
      <p className={s["total-price"]}>
        ₩ {totalPrice.toLocaleString()}
        <span className={s.count}>&nbsp;/ {count}명</span>
      </p>
    </div>
  );
};

export default TotalPrice;
