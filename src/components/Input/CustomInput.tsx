"use client";

import { UseFormRegisterReturn } from "react-hook-form";
import s from "./CustomInput.module.scss";
import classNames from "classnames/bind";
import Image from "next/image";
import { useState, forwardRef, ChangeEventHandler } from "react";

const cx = classNames.bind(s);

interface CustomInputProps {
  id?: string;
  label?: string;
  type: string;
  value?: string;
  placeholder?: string;
  isTextArea?: boolean;
  errors?: string;
  borderColor?: "default" | "yellow";
  iconType?: "search" | "password" | "date";
  register?: UseFormRegisterReturn;
  required?: boolean;
  readOnly?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
}

const CustomInput = forwardRef<HTMLInputElement, CustomInputProps>(
  (
    {
      id,
      label,
      type,
      value,
      register,
      errors,
      isTextArea,
      iconType,
      borderColor = "default",
      required = false,
      readOnly = false,
      ...rest
    },
    ref,
  ) => {
    const [isVisible, setIsVisible] = useState(false);

    const handleClickVisible = () => {
      setIsVisible((prev) => !prev);
    };

    return (
      <div>
        {label && (
          <label className={cx("label")} htmlFor={id}>
            {label} {required ? <span className={styles.required}>*</span> : ""}
          </label>
        )}
        <div className={s["input-container"]}>
          {isTextArea ? (
            <textarea
              className={cx("textarea", {
                "input-error": errors,
                "border-yellow": borderColor === "yellow",
                "input-readOnly": readOnly,
              })}
              value={value}
              id={id}
              ref={ref as React.Ref<HTMLTextAreaElement>}
              readOnly={readOnly}
              {...register}
              {...rest}
            />
          ) : (
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
          )}
          {errors && (
            <span className={s["error-text"]} role="alert">
              {errors}
            </span>
          )}
          {iconType === "search" && (
            <button type="submit" className={s["input-img"]}>
              <Image src={"/icons/btn_search.svg"} width={20} height={20} alt="Search Icon" />
            </button>
          )}
          {iconType === "date" && (
            <button type="button" className={s["input-img"]}>
              <Image src={"/icons/btn_calendar.svg"} width={20} height={20} alt="Search Icon" />
            </button>
          )}
          {type === "password" && (
            <button type="button" onClick={handleClickVisible} className={s["input-img"]}>
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
