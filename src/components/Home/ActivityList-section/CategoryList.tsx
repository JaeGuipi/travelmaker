import React from "react";
import classNames from "classnames/bind";
import s from "./CategoryList.module.scss";
import Image from "next/image";

export const cx = classNames.bind(s);

interface CategoryListProps {
  categories: string[];
  selectedCategory: string;
  onCategoryClick: (category: string) => void;
}

const categoryGifMap: Record<string, string> = {
  전체: "/icons/category/cate_all.gif",
  문화: "/icons/category/cate_culture.gif",
  식음료: "/icons/category/cate_food.gif",
  스포츠: "/icons/category/cate_sports.gif",
  투어: "/icons/category/cate_tour.gif",
  관광: "/icons/category/cate_bus.gif",
  웰빙: "/icons/category/cate_wellbeing.gif",
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
          {categoryGifMap[category] && (
            <Image src={categoryGifMap[category]} width={56} height={56} unoptimized alt={category} />
          )}
          <span>{category}</span>
        </li>
      ))}
    </ul>
  );
};

export default CategoryList;
