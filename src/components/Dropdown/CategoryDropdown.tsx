import { forwardRef, useEffect, useState } from "react";
import s from "./CategoryDropdown.module.scss";
import classNames from "classnames/bind";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";

const cx = classNames.bind(s);

interface CategoryDropdownProps {
  id: string;
  value: string;
  onChange: (value: string) => void;
}

const CategoryDropdown = forwardRef<HTMLDivElement, CategoryDropdownProps>(({ value, onChange }, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const options = ["문화 · 예술", "식음료", "스포츠", "투어", "관광", "웰빙"];

  const handleSelect = (value: string) => {
    onChange(value);
    setIsOpen(false);
  };

  useEffect(() => {
    if (value) {
      setIsOpen(false);
    }
  }, [value]);

  return (
    <div className={s.categoryDropdown} ref={ref}>
      <div
        className={cx("selectBox", isFocused ? "focused" : "")}
        tabIndex={0}
        onClick={() => setIsOpen(!isOpen)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      >
        <span className={cx("placeholder", (value || "카테고리") === "카테고리" ? "gray" : "")}>
          {value || "카테고리"}
        </span>
        {isOpen ? <IoIosArrowUp size={15} /> : <IoIosArrowDown size={15} />}
      </div>
      {isOpen && (
        <ul className={s.dropdownList}>
          {options.map((option) => (
            <li key={option} onClick={() => handleSelect(option)}>
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
});

CategoryDropdown.displayName = "CategoryDropdown";

export default CategoryDropdown;
