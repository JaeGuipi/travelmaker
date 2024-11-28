"use client";

import API_URL from "@/constants/config";
import { useEffect, useState } from "react";

export default function TokenTest() {
  const [data, setData] = useState<null | { id?: string; email?: string; nickname?: string }>(null);
  const [cookieValue, setCookieValue] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const cookies = document.cookie.split("; ").find((row) => row.startsWith("accessToken="));
    const accessToken = cookies ? cookies.split("=")[1] : null;
    setCookieValue(accessToken);
  }, []); // 쿠키를 읽고 cookieValue 상태 업데이트

  useEffect(() => {
    async function fetchData() {
      if (cookieValue) {
        setIsLoading(true);
        try {
          const response = await fetch(`${API_URL}/users/me`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${cookieValue}`,
            },
          });

          if (!response.ok) {
            throw new Error(`API 요청 실패: ${response.statusText}`);
          }

          const result = await response.json();
          setData(result);
        } catch (error) {
          console.error("데이터 요청 중 오류 발생:", error);
          setData(null);
        }
        setIsLoading(false);
      }
    }
    fetchData();
  }, [cookieValue]);

  return (
    <div>
      <h1>토큰 테스트 페이지</h1>
      {isLoading ? (
        <p>로딩 중...</p>
      ) : data ? (
        <>
          <p>{data.id}</p>
          <p>{data.email}</p>
          <p>{data.nickname}</p>
        </>
      ) : (
        <p>데이터를 불러올 수 없습니다.</p>
      )}
    </div>
  );
}
