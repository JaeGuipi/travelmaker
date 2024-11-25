"use Client";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";
import styles from "./CustomInput.module.scss";
import classNames from "classnames/bind";
import Image from "next/image";
import { useState } from "react";

const cx = classNames.bind(styles);

interface CustomInputProps {
  id: string;
  label?: string;
  type: string;
  placeholder?: string;
  error?: FieldError;
  borderColor?: "default" | "yellow";
  iconType?: "search" | "password" | "date";
  register?: UseFormRegisterReturn;
}

const CustomInput = ({
  id,
  label,
  type,
  register,
  error,
  iconType,
  borderColor = "default",
  ...rest
}: CustomInputProps) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleClickVisible = () => {
    setIsVisible((prev) => !prev);
  };

  return (
    <>
      {label && (
        <label className={cx("label")} htmlFor={id}>
          {label}
        </label>
      )}
      <div className={cx("input-container")}>
        <input
          className={cx("input", {
            "input-error": error,
            "border-yellow": borderColor === "yellow",
          })}
          type={iconType === "password" && isVisible ? "text" : type}
          id={id}
          {...register}
          {...rest}
        />
        {iconType === "search" && (
          <button type="button" className={cx("input-img")}>
            <Image src={"/icons/btn_search.svg"} width={20} height={20} alt="Search Icon" />
          </button>
        )}
        {iconType === "date" && (
          <button type="button" className={cx("input-img")}>
            <Image src={"/icons/btn_calendar.svg"} width={20} height={20} alt="Search Icon" />
          </button>
        )}
        {type === "password" && (
          <button type="button" onClick={handleClickVisible} className={cx("input-img")}>
            <Image
              src={isVisible ? "/icons/btn_visibility_on.svg" : "/icons/btn_visibility_off.svg"}
              width={24}
              height={24}
              alt={isVisible ? "Hide Password" : "Show Password"}
            />
          </button>
        )}
      </div>
    </>
  );
};

export default CustomInput;
