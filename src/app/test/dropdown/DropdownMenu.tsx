"use client";

import React from "react";
import Dropdown from "@/components/Dropdown/Dropdown";

const DropdownMenu = () => {
  return (
    <>
      <div>
        <Dropdown>
          <Dropdown.Toggle variant="default">옵션</Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item>항목 1</Dropdown.Item>
            <Dropdown.Item onClick={() => alert("항목 2 선택")}>항목 2</Dropdown.Item>
            <Dropdown.Item onClick={() => alert("항목 3 선택")}>항목 3</Dropdown.Item>
            <Dropdown.Item onClick={() => alert("항목 4 선택")}>항목 4</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <div>
        <Dropdown>
          <Dropdown.Toggle variant="kebab" />
          <Dropdown.Menu>
            <Dropdown.Item>항목 1</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </>
  );
};

export default DropdownMenu;
