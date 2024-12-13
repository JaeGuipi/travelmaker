// HeadCountSelector.tsx
import React from "react";
import s from "./HeadCountSelector.module.scss";

interface HeadCountSelectorProps {
  count: number;
  onIncrease: () => void;
  onDecrease: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  minCount: number;
  maxCount: number;
}

const HeadCountSelector: React.FC<HeadCountSelectorProps> = ({
  count,
  onIncrease,
  onDecrease,
  onChange,
  minCount,
  maxCount,
}) => {
  return (
    <div className={s.headCount}>
      <h4 className={s["sub-title"]}>참여 인원수</h4>
      <div className={s["headCount-input"]}>
        <button className={s.miuns} onClick={onDecrease} disabled={count === minCount}>
          -
        </button>
        <input
          type="number"
          value={count}
          onChange={onChange}
          aria-label="Counter Input"
          min={minCount}
          max={maxCount}
        />
        <button className={s.plus} onClick={onIncrease} disabled={count === maxCount}>
          +
        </button>
      </div>
    </div>
  );
};

export default HeadCountSelector;
