import React from "react";
import API_URL from "@/constants/config";
import SearchBar from "@/components/SearchBar";
import SearchResults from "./SearchResults";
import { GetActivities } from "@/types/activites/activitesTypes";
import classNames from "classnames/bind";
import styles from "./page.module.scss";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "트래블 메이커 : 검색",
};

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

  // 쿼리스트링 생성
  const queryParams = new URLSearchParams({
    method: "offset",
    keyword,
    sort,
    page,
    size,
  } as Record<string, string>);

  // API 호출
  const res = await fetch(`${API_URL}/activities?${queryParams.toString()}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store", //차후 지울 예정
  });

  if (!res.ok) {
    console.error("Fetch error:", res.statusText);
    throw new Error("데이터를 가져오는데 실패했습니다.");
  }

  const data: GetActivities = await res.json();

  return (
    <main className={cx("container", "mainbox")}>
      <div className={cx("searchbar")}>
        <SearchBar />
      </div>
      {!keyword ? <div>검색어를 입력해주세요.</div> : <SearchResults data={data} searchParams={searchParams} />}
    </main>
  );
}
