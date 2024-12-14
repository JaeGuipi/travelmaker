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
  className?: string;
}

const FormButton = ({
  children,
  onClick,
  type = "button",
  size = "medium",
  variant = "fillButton",
  disabled = false,
  className,
}: FormButtonProps) => {
  const buttonClass = classNames(s.formButton, s[size], s[variant], { [s.disabled]: disabled }, className);

  return (
    <button className={buttonClass} type={type} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

export default FormButton;
