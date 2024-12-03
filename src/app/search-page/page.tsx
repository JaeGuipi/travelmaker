// app/search/page.tsx

import React from "react";
import API_URL from "@/constants/config";
import SearchBar from "@/components/SearchBar";
import SearchResults from "./SearchResults";
import { GetMyActivities } from "@/types/types";
import classNames from "classnames/bind";
import styles from "./page.module.scss";

const cx = classNames.bind(styles);
interface SearchParams {
  keyword?: string;
  sort?: string;
  page?: string;
  size?: string;
  [key: string]: string | undefined;
}

interface SearchPageProps {
  searchParams: SearchParams;
}

export default async function Page({ searchParams }: SearchPageProps) {
  const { keyword, sort = "latest", page = "1", size = "20" } = searchParams;

  // 검색어가 없는 경우 처리
  if (!keyword) {
    return (
      <main>
        <SearchBar />
        <div>검색어를 입력해주세요.</div>
      </main>
    );
  }

  // 쿼리스트링 생성
  const queryParams = new URLSearchParams({
    method: "offset",
    keyword,
    sort,
    page,
    size,
  });

  // API 호출
  const res = await fetch(`${API_URL}/activities?${queryParams.toString()}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  if (!res.ok) {
    console.error("Fetch error:", res.statusText);
    throw new Error("데이터를 가져오는데 실패했습니다.");
  }

  const data: GetMyActivities = await res.json();

  return (
    <main className={cx("container", "mainbox")}>
      <div className={cx("searchbar")}>
        <SearchBar />
      </div>
      <SearchResults data={data} searchParams={searchParams} />
    </main>
  );
}
