"use client";

import FormButton from "@/components/Button/FormButton";
import Pagination from "@/components/Button/Pagination";
import { useState } from "react";

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 5;

  const handlePageChange = (page: number) => {
    console.log(`Page changed to: ${page}`);
    setCurrentPage(page);
  };

  return (
    <section style={{ padding: "1rem" }}>
      <div>
        <FormButton size="large">로그인 하기</FormButton>
        <FormButton size="large" variant="emptyButton">
          로그인 하기
        </FormButton>
        <FormButton size="large" disabled={true}>
          신청 불가
        </FormButton>

        <FormButton size="medium">로그인 하기</FormButton>
        <FormButton size="medium" variant="emptyButton">
          로그인 하기
        </FormButton>
        <FormButton size="medium" disabled={true}>
          신청 불가
        </FormButton>

        <FormButton size="small">로그인 하기</FormButton>
        <FormButton size="small">취소하기</FormButton>
        <FormButton size="small" variant="emptyButton">
          로그인 하기
        </FormButton>
        <FormButton size="small" disabled={true}>
          신청 불가
        </FormButton>
      </div>

      <div>
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      </div>
    </section>
  );
}
