// components/SearchBar.tsx

"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import CustomInput from "./Input/CustomInput";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const currentParams = useSearchParams();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const params = new URLSearchParams(currentParams.toString());
      params.set("keyword", searchQuery);
      params.set("page", "1"); // 새로운 검색 시 페이지를 1로 초기화
      router.push(`/search-page?${params.toString()}`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CustomInput
        id="search"
        type="text"
        iconType="search"
        borderColor="yellow"
        placeholder="무엇을 체험하고 싶으신가요?"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </form>
  );
};

export default SearchBar;
