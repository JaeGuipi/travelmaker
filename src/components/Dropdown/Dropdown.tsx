"use client";

import React, { useState, createContext, useContext, ReactNode } from "react";
import styles from "./Dropdown.module.scss";
import classNames from "classnames/bind";
import Image from "next/image";
import kebab from "@/../public/icons/btn_kebab.svg";
import { IoMdArrowDropdown } from "react-icons/io";

const cx = classNames.bind(styles);

interface DropdownContextProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

type VariantType = "kebab" | "default";

const DropdownContext = createContext<DropdownContextProps | undefined>(undefined);

interface DropdownProps {
  children: ReactNode;
}

//드롭다운 컴포넌트
const Dropdown: React.FC<DropdownProps> & {
  Toggle: typeof DropdownToggle;
  Menu: typeof DropdownMenu;
  Item: typeof DropdownItem;
} = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DropdownContext.Provider value={{ isOpen, setIsOpen }}>
      <div className={styles.dropdown}>{children}</div>
    </DropdownContext.Provider>
  );
};

//드롭다운 토글 컴포넌트
const DropdownToggle: React.FC<{ children?: ReactNode; variant?: VariantType }> = ({
  children,
  variant = "defalut",
}) => {
  const context = useContext(DropdownContext);
  if (!context) {
    throw new Error("DropdownToggle은 Dropdown 내부에서 사용되어야 합니다.");
  }

  const { setIsOpen } = context;

  return (
    <button onClick={() => setIsOpen((prev) => !prev)} className={cx("toggle", variant)}>
      {children}
      {variant === "kebab" && <Image src={kebab} alt="캐밥아이콘" />}
      {variant === "default" && <IoMdArrowDropdown size={20} />}
    </button>
  );
};

//드롭다운 메뉴 컴포넌트
const DropdownMenu: React.FC<{ children: ReactNode }> = ({ children }) => {
  const context = useContext(DropdownContext);
  if (!context) {
    throw new Error("DropdownMenu는 Dropdown 내부에서 사용되어야 합니다.");
  }

  const { isOpen } = context;

  if (!isOpen) return null;

  return <div className={styles.menu}>{children}</div>;
};

//드로다운 아이템 컴포넌트
const DropdownItem: React.FC<{ children: ReactNode; onClick?: () => void }> = ({ children, onClick }) => {
  return (
    <span onClick={onClick} className={styles.item}>
      {children}
    </span>
  );
};

Dropdown.Toggle = DropdownToggle;
Dropdown.Menu = DropdownMenu;
Dropdown.Item = DropdownItem;

export default Dropdown;
