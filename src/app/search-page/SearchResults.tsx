"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Dropdown from "@/components/Dropdown/Dropdown";
import Image from "next/image";
import { GetActivities } from "@/types/activites/activitesTypes";
import Link from "next/link";
import s from "./SearchResults.module.scss";
import Pagination from "@/components/Button/Pagination";

interface SearchResultsProps {
  data: GetActivities;
  searchParams: {
    keyword?: string;
    sort?: string;
    page?: string;
    size?: string;
    [key: string]: string | undefined;
  };
}

const dropdownOptions = [
  { value: "latest", label: "최신순" },
  { value: "most_reviewed", label: "인기순" },
  { value: "price_asc", label: "낮은 가격순" },
  { value: "price_desc", label: "높은 가격순" },
];

const SearchResults: React.FC<SearchResultsProps> = ({ data, searchParams }) => {
  const router = useRouter();
  const currentParams = useSearchParams();

  const sortOptions: { [key: string]: string } = {
    latest: "최신순",
    most_reviewed: "인기순",
    price_asc: "낮은 가격순",
    price_desc: "높은 가격순",
  };

  const { keyword, sort = "latest", page = "1", size = "20" } = searchParams;

  const totalPage = Math.ceil(data.totalCount / Number(size));

  const handleSortChange = (newSort: string) => {
    const params = new URLSearchParams(currentParams.toString());
    params.set("sort", newSort);
    params.set("page", "1"); // 정렬 변경 시 페이지를 1로 초기화
    router.push(`/search-page?${params.toString()}`);
  };
  // 페이지네이션 등 다른 인터랙션도 비슷하게 처리
  const handlePageChange = (pageNumber: number) => {
    const params = new URLSearchParams(currentParams.toString());
    params.set("page", pageNumber.toString());
    router.push(`/search-page?${params.toString()}`);
  };
  return (
    <section>
      {data?.activities.length > 0 ? (
        <div className={s["search-wrap"]}>
          <div className={s["list-setup"]}>
            <p>&quot;{keyword}&quot;의 검색결과</p>
            <Dropdown>
              <Dropdown.Toggle>{sortOptions[sort]}</Dropdown.Toggle>
              <Dropdown.Menu>
                {dropdownOptions.map((options) => (
                  <Dropdown.Item key={options.value} onClick={() => handleSortChange(options.value)}>
                    {options.label}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <ul className={s["item-list"]}>
            {data.activities.map((activity) => (
              <li key={activity.id} className={s["item-box"]}>
                <Link href={`/activities/${activity.id}`}>
                  <Image
                    src={activity.bannerImageUrl}
                    width={283}
                    height={283}
                    className={s.itemImg}
                    alt="체험 이미지"
                  />
                  <div className={s.info}>
                    <p className={s.rating}>
                      <span className={s["rating-icon"]}>
                        <Image src="/icons/rating_star.svg" fill alt="평점 아이콘" />
                      </span>
                      {activity.rating}&nbsp;({activity.reviewCount})
                    </p>
                    <h4 className={s.title}>{activity.title}</h4>
                    <p className={s.price}>
                      ₩{activity.price}
                      <span> / 인</span>
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
          <Pagination currentPage={Number(page)} totalPages={totalPage} onPageChange={handlePageChange} />
        </div>
      ) : (
        <p>검색 결과가 없습니다.</p>
      )}
    </section>
  );
};

export default SearchResults;
