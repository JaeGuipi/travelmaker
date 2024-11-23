import { ReactNode } from "react";
import classNames from "classnames";
import s from "./FormButton.module.scss";

interface FormButtonProps {
  children: ReactNode;
  onClick?: () => void;
  type?: "button" | "reset" | "submit"; // 버튼 타입
  size?: "small" | "medium" | "large"; // 버튼 크기
  variant?: "fillButton" | "emptyButton"; // 버튼 스타일
  disabled?: boolean; // 비활성화 여부
}

const FormButton = ({
  children,
  type = "button",
  size = "medium",
  variant = "fillButton",
  disabled = false,
}: FormButtonProps) => {
  const buttonClass = classNames(s.formButton, s[size], s[variant], { [s.disabled]: disabled });

  return (
    <button className={buttonClass} type={type} disabled={disabled}>
      {children}
    </button>
  );
};

export default FormButton;
