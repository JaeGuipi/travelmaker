"use client";

import React, { useState, createContext, useContext, ReactNode, useRef, useEffect } from "react";
import styles from "./Dropdown.module.scss";
import classNames from "classnames/bind";
import Image from "next/image";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";

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
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (e: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <DropdownContext.Provider value={{ isOpen, setIsOpen }}>
      <div className={styles.dropdown} ref={dropdownRef}>
        {children}
      </div>
    </DropdownContext.Provider>
  );
};

export const DropdownToggle: React.FC<{ children?: ReactNode; variant?: VariantType }> = ({
  children,
  variant = "default",
}) => {
  const context = useContext(DropdownContext);
  if (!context) {
    throw new Error("DropdownToggle은 Dropdown 내부에서 사용되어야 합니다.");
  }

  const { isOpen, setIsOpen } = context;

  return (
    <button onClick={() => setIsOpen((prev) => !prev)} className={cx("toggle", variant)}>
      {children}
      {variant === "kebab" && <Image src={"/icons/btn_kebab.svg"} width={15} height={15} alt="캐밥아이콘" />}
      {variant === "default" && (isOpen ? <IoIosArrowUp size={15} /> : <IoIosArrowDown size={15} />)}
    </button>
  );
};

//드롭다운 메뉴 컴포넌트
export const DropdownMenu: React.FC<{ children: ReactNode }> = ({ children }) => {
  const context = useContext(DropdownContext);
  if (!context) {
    throw new Error("DropdownMenu는 Dropdown 내부에서 사용되어야 합니다.");
  }

  const { isOpen } = context;

  if (!isOpen) return null;

  return <div className={styles.menu}>{children}</div>;
};

//드로다운 아이템 컴포넌트
export const DropdownItem: React.FC<{ children: ReactNode; onClick?: () => void }> = ({ children, onClick }) => {
  const context = useContext(DropdownContext);
  if (!context) {
    throw new Error("DropdownMenu는 Dropdown 내부에서 사용되어야 합니다.");
  }
  const { setIsOpen } = context;

  const handleClick = () => {
    if (onClick) onClick();
    if (setIsOpen) setIsOpen(false); //옵션을 누르면 닫히도록
  };
  return (
    <span onClick={handleClick} className={styles.item}>
      {children}
    </span>
  );
};

Dropdown.Toggle = DropdownToggle;
Dropdown.Menu = DropdownMenu;
Dropdown.Item = DropdownItem;

export default Dropdown;
