// components/SearchResults.tsx

"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Dropdown from "@/components/Dropdown/Dropdown";

interface DataItem {
  id: number;
  title: string;
  description: string;
}

interface DataResponse {
  cursorId: number | null;
  totalCount: number;
  activities: DataItem[];
}

interface SearchResultsProps {
  data: DataResponse;
  searchParams: {
    keyword: string;
    sort?: string;
    page?: string;
    size?: string;
    [key: string]: string | undefined;
  };
}

const SearchResults: React.FC<SearchResultsProps> = ({ data, searchParams }) => {
  const router = useRouter();
  const currentParams = useSearchParams();

  const { keyword, sort = "latest", page = "1", size = "20" } = searchParams;

  const handleSortChange = (newSort: string) => {
    const params = new URLSearchParams(currentParams.toString());
    params.set("sort", newSort);
    params.set("page", "1"); // 정렬 변경 시 페이지를 1로 초기화
    router.push(`/search?${params.toString()}`);
  };

  // 페이지네이션 등 다른 인터랙션도 비슷하게 처리

  return (
    <div>
      <div>
        <p>"{keyword}"의 검색결과</p>
        <Dropdown>
          <Dropdown.Toggle>정렬기준</Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => handleSortChange("latest")}>최신순</Dropdown.Item>
            <Dropdown.Item onClick={() => handleSortChange("most_reviewed")}>인기순</Dropdown.Item>
            <Dropdown.Item onClick={() => handleSortChange("price_asc")}>낮은 가격순</Dropdown.Item>
            <Dropdown.Item onClick={() => handleSortChange("price_desc")}>높은 가격순</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <div>
        {data.activities.length > 0 ? (
          data.activities.map((item) => (
            <div key={item.id}>
              <h2>{item.title}</h2>
              <p>{item.description}</p>
            </div>
          ))
        ) : (
          <p>검색 결과가 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
