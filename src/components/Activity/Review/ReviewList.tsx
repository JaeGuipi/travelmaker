"use client";

import { Review } from "@/types/activites/activitesTypes";
import { timeDiff } from "@/utils/timeDiff";
import { FaStar } from "react-icons/fa";
import Image from "next/image";
import s from "./ReviewList.module.scss";
import Pagination from "@/components/Button/Pagination";

interface ReviewListProps {
  activityId: number;
  reviews: Review[];
  totalCount: number;
  averageRating: number;
  page: number;
  size: number;
}

const ReviewList = ({ reviews, totalCount, averageRating, page, size }: ReviewListProps) => {
  const totalPage = Math.ceil(totalCount / size);

  const getSatisfactionText = (rating: number): string => {
    switch (true) {
      case rating >= 4:
        return "매우 만족";
      case rating >= 3:
        return "대체로 만족";
      case rating >= 2:
        return "보통";
      case rating >= 1:
        return "불만족";
      default:
        return "등록된 리뷰가 없습니다.";
    }
  };

  // 페이지네이션
  const handlePageChange = (pageNumber: number) => {
    const params = new URLSearchParams();
    params.set("page", pageNumber.toString());
    params.set("size", size.toString());
  };

  return (
    <section>
      <div className={s.ratingWrap}>
        <p className={s.rating}>{parseFloat((averageRating ?? 0).toFixed(1))}</p>
        <p className={s.reviewCount}>
          <span>{getSatisfactionText(averageRating)}</span>
          <span className={s.count}>
            <FaStar />
            {totalCount}개 후기
          </span>
        </p>
      </div>
      <ul className={s.reviewList}>
        {reviews.map((review) => (
          <li key={review.id}>
            <div className={s.profileImg}>
              <Image
                src={review.user.profileImageUrl ? `${review.user.profileImageUrl}` : "/images/profile.png"}
                fill
                alt="프로필"
              />
            </div>
            <div className={s.reviewInfo}>
              <p className={s.userInfo}>
                {review.user.nickname}
                <span>| {timeDiff(review.createdAt)}</span>
              </p>
              <p className={s.content}>{review.content}</p>
            </div>
          </li>
        ))}
      </ul>
      <div className={s.pagination}>
        <Pagination currentPage={Number(page)} totalPages={totalPage} onPageChange={handlePageChange} />
      </div>
    </section>
  );
};

export default ReviewList;
