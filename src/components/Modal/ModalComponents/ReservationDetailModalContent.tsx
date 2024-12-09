"use client";

import { useEffect, useState } from "react";

type Props = {
  activityId: string;
  date: string;
};

const ReservationDetailModalContent = ({ activityId, date }: Props) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // 🔥 모달이 열리면 데이터 fetch
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/my-activities/reserved-schedule?activityId=${activityId}&date=${date}`);
        if (!res.ok) throw new Error(`Failed to fetch reservation detail: ${res.statusText}`);
        const result = await res.json();
        setData(result);
      } catch (error) {
        setError("데이터를 불러오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [activityId, date]);

  if (loading) return <div>로딩 중...</div>;

  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>{date}의 예약 세부 정보</h2>
      {data ? (
        <ul>
          {data.map((item: any, index: number) => (
            <li key={index}>
              {item.scheduleId} - {item.startTime}
            </li>
          ))}
        </ul>
      ) : (
        <p>예약 데이터가 없습니다.</p>
      )}
    </div>
  );
};

export default ReservationDetailModalContent;
