"use client";

import { useState } from "react";
import s from "./ModalTabs.module.scss";

type TabType = "pending" | "confirmed" | "declined";

interface TabProps {
  tabs: { key: TabType; label: string }[];
  onChange: (activeTab: TabType) => void;
}

export default function ModalTabs({ tabs, onChange }: TabProps) {
  const [activeTab, setActiveTab] = useState<TabType>(tabs[0].key);

  const handleTabClick = (key: TabType) => {
    setActiveTab(key);
    onChange(key);
  };

  return (
    <div className={s.tapwarp}>
      {tabs.map((tab) => (
        <button
          key={tab.key}
          className={`${s.tapbutton} ${activeTab === tab.key ? s.active : ""}`}
          onClick={() => handleTabClick(tab.key)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
