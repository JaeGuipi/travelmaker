import React from "react";
import classNames from "classnames";
import s from "./Pagination.module.scss";
import { FaCaretLeft } from "react-icons/fa6";
import { FaCaretRight } from "react-icons/fa6";

interface PaginationProps {
  currentPage: number; // 현재 페이지 상태
  totalPages: number; // 전체 페이지 수
  onPageChange: (page: number) => void; // 페이지 변경 핸들러
}

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  const handlePageClick = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <div className={s.pagination}>
      <button className={s.pageButton} onClick={() => handlePageClick(currentPage - 1)} disabled={currentPage === 1}>
        <FaCaretLeft />
      </button>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          className={classNames(s.pageNumber, { [s.active]: page === currentPage })}
          onClick={() => handlePageClick(page)}
        >
          {page}
        </button>
      ))}

      <button
        className={s.pageButton}
        onClick={() => handlePageClick(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <FaCaretRight />
      </button>
    </div>
  );
};

export default Pagination;
