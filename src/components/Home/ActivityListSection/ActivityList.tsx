"use client";

import { GetActivities } from "@/types/activites/activitesTypes";
import { getActivity } from "@/lib/api/activities";
import { Activity } from "@/types/types";
import { useEffect, useState } from "react";
import s from "./ActivityList.module.scss";
import classNames from "classnames/bind";
import CategoryList from "./CategoryList";
import AllItemList from "./AllItemList";

export const cx = classNames.bind(s);

const ActivityList: React.FC<GetActivities> = ({ activities, totalCount }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("전체");
  const [filteredActivities, setFilteredActivities] = useState<Activity[]>(activities || []);
  const [loading, setLoading] = useState<boolean>(false);

  // 카테고리 목록 조회
  const categories =
    activities && Array.isArray(activities)
      ? ["전체", ...new Set(activities.map((activity) => activity.category))]
      : ["전체"];

  // 카테고리에 해당되는 리스트 조회
  useEffect(() => {
    const fetchFilteredActivities = async () => {
      try {
        // "전체" 카테고리는 params에 포함시키지 않고 요청
        const params = selectedCategory !== "전체" ? { category: selectedCategory, size: 8 } : { size: 8 };
        const data = await getActivity(params);
        setFilteredActivities(data.activities); // 필터링된 데이터 업데이트
      } catch (error) {
        throw error;
      } finally {
        setLoading(false);
      }
    };

    // 카테고리가 변경되었을 때만 데이터를 요청
    if (selectedCategory) {
      fetchFilteredActivities();
    }
  }, [selectedCategory]);

  // 카테고리 클릭 핸들러
  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <section className={cx("allitem-section", "container")}>
      <h3 className={s.title}>🛼 마음에 드는 장소를 선택해보세요</h3>
      <CategoryList categories={categories} selectedCategory={selectedCategory} onCategoryClick={handleCategoryClick} />
      {loading ? <div>Loading...</div> : <AllItemList activities={filteredActivities} totalCount={totalCount} />}
    </section>
  );
};

export default ActivityList;
