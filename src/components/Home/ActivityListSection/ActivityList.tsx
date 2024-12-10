"use client";

import { Activity, GetActivities } from "@/types/activites/activitesTypes";
import { getActivity } from "@/lib/api/activities";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import s from "./ActivityList.module.scss";
import classNames from "classnames/bind";
import CategoryList from "./CategoryList";
import AllItemList from "./AllItemList";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";

export const cx = classNames.bind(s);

const ActivityList: React.FC<GetActivities> = ({ activities }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("전체");
  const [size, setSize] = useState(0);
  const [filteredActivities, setFilteredActivities] = useState<Activity[]>(activities || []);
  const [loading, setLoading] = useState<boolean>(false);

  // 화면 크기에 따른 size 설정
  const isPC = useMediaQuery({ minWidth: 1200 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1200 });
  const isMobile = useMediaQuery({ maxWidth: 767 });

  // 화면 크기에 따라 초기 size 반환
  const getInitialSize = (isPC: boolean, isTablet: boolean, isMobile: boolean) => {
    if (isPC) return 8;
    if (isTablet) return 9;
    if (isMobile) return 4;
    return 8; // 기본값
  };

  // 초기 size 설정
  useEffect(() => {
    setSize(getInitialSize(isPC, isTablet, isMobile));
  }, [isPC, isTablet, isMobile]);

  // 카테고리 목록 조회
  const categories =
    activities && Array.isArray(activities)
      ? ["전체", ...new Set(activities.map((activity) => activity.category))]
      : ["전체"];

  const fetchFilteredActivities = async (newSize: number) => {
    try {
      // "전체" 카테고리는 params에 포함시키지 않고 요청
      const params = selectedCategory !== "전체" ? { category: selectedCategory, size: newSize } : { size: newSize };
      const data = await getActivity(params);
      setFilteredActivities(data.activities); // 필터링된 데이터 업데이트
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // 카테고리에 해당되는 리스트 조회
  useEffect(() => {
    if (size > 0) {
      fetchFilteredActivities(size);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory, size]);

  // 카테고리 클릭 핸들러
  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    setSize(getInitialSize(isPC, isTablet, isMobile)); // 카테고리 변경 시 size를 초기화
  };

  // "더보기" 클릭 시 호출
  const handleLoadMore = () => {
    const increment = isPC ? 12 : isTablet ? 8 : 4;
    setSize((prevSize) => prevSize + increment);
  };

  return (
    <section className={cx("allitem-section", "container")}>
      <h3 className={s.title}>🛼 마음에 드는 장소를 선택해보세요</h3>
      <CategoryList categories={categories} selectedCategory={selectedCategory} onCategoryClick={handleCategoryClick} />
      {loading ? <LoadingSpinner /> : <AllItemList activities={filteredActivities} onLoadMore={handleLoadMore} />}
    </section>
  );
};

export default ActivityList;
