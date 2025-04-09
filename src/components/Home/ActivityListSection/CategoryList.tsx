import React from "react";
import classNames from "classnames/bind";
import s from "./CategoryList.module.scss";

export const cx = classNames.bind(s);

interface CategoryListProps {
  categories: string[];
  selectedCategory: string;
  onCategoryClick: (category: string) => void;
}

const categoryVideoMap: Record<string, string> = {
  전체: "/icons/category/cate_all.webm",
  "문화 · 예술": "/icons/category/cate_culture.webm",
  식음료: "/icons/category/cate_food.webm",
  스포츠: "/icons/category/cate_sports.webm",
  투어: "/icons/category/cate_tour.webm",
  관광: "/icons/category/cate_bus.webm",
  웰빙: "/icons/category/cate_wellbeing.webm",
};

const CategoryList: React.FC<CategoryListProps> = ({ categories, selectedCategory, onCategoryClick }) => {
  return (
    <ul className={s.category}>
      {categories.map((category) => (
        <li
          key={category}
          onClick={() => onCategoryClick(category)}
          className={cx({ selected: selectedCategory === category })}
        >
          {categoryVideoMap[category] && (
            <video width={56} height={56} autoPlay muted loop playsInline>
              <source src={`${categoryVideoMap[category]}`} type="video/webm" />
              {/* MP4 백업 (투명도 없음) */}
              <source src={`${categoryVideoMap[category].replace(".webm", ".mp4")}`} type="video/mp4" />
            </video>
          )}
          <span>{category}</span>
        </li>
      ))}
    </ul>
  );
};

export default CategoryList;
