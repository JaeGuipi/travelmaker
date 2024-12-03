"use client";

import { UseFormRegisterReturn } from "react-hook-form";
import styles from "./CustomInput.module.scss";
import classNames from "classnames/bind";
import Image from "next/image";
import { useState, forwardRef } from "react";

const cx = classNames.bind(styles);

interface CustomInputProps {
  id: string;
  label?: string;
  type: string;
  placeholder?: string;
  errors?: string;
  borderColor?: "default" | "yellow";
  iconType?: "search" | "password" | "date";
  register?: UseFormRegisterReturn;
  readOnly?: boolean;
}

const CustomInput = forwardRef<HTMLInputElement, CustomInputProps>(
  ({ id, label, type, value, register, errors, iconType, borderColor = "default", readOnly = false, ...rest }, ref) => {
    const [isVisible, setIsVisible] = useState(false);

    const handleClickVisible = () => {
      setIsVisible((prev) => !prev);
    };

    return (
      <div>
        {label && (
          <label className={cx("label")} htmlFor={id}>
            {label}
          </label>
        )}
        <div className={cx("input-container")}>
          <input
            className={cx("input", {
              "input-error": errors,
              "border-yellow": borderColor === "yellow",
              "input-readOnly": readOnly,
            })}
            type={iconType === "password" && isVisible ? "text" : type}
            value={value}
            id={id}
            ref={ref}
            readOnly={readOnly}
            {...register}
            {...rest}
          />
          {errors && (
            <span className={cx("error-text")} role="alert">
              {errors}
            </span>
          )}
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
      </div>
    );
  },
);
CustomInput.displayName = "CustomInput";

export default CustomInput;
