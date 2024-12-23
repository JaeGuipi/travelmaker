"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import CustomInput from "../../Input/CustomInput";

const SearchBar = () => {
  const router = useRouter();
  const currentParams = useSearchParams();

  const keywordFromQuery = currentParams.get("keyword");

  const [searchQuery, setSearchQuery] = useState<string>(keywordFromQuery ?? "");

  useEffect(() => {
    // keyword가 없으면 검색창 비우기
    if (!keywordFromQuery) {
      setSearchQuery("");
    } else {
      setSearchQuery(keywordFromQuery);
    }
  }, [keywordFromQuery]);

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
