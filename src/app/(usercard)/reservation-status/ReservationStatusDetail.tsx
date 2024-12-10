"use client";

import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";
import { useEffect, useState } from "react";

type Props = {
  scheduleId: string | undefined;
  tapSatus: string;
  activityId: string;
};

const ReservationStatusDetail = ({ scheduleId, tapSatus, activityId }: Props) => {
  const [resdata, setResdata] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReservationDetails = async () => {
      try {
        const response = await fetch(
          `/api/my-activities/reservations?activityId=${activityId}&scheduleId=${scheduleId}&status=${tapSatus}`,
        );
        if (!response.ok) throw new Error("API 요청에 실패했습니다.");
        const data = await response.json();
        setResdata(data.data);
      } catch (error) {
        setError("데이터를 불러오는 중 오류가 발생했습니다.");
        console.error("API 에러:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReservationDetails();
  }, [activityId, scheduleId, tapSatus]);

  if (loading) return <LoadingSpinner />;
  if (error) return <div>{error}</div>;

  return (
    <>
      {resdata?.reservations?.map((res) => (
        <div key={res.id}>
          <h1>닉네임: {res.nickname}</h1>
          <h1>인원: {res.headCount}</h1>
          {tapSatus === "pending" && (
            <>
              <button>승인</button>
              <button>거절</button>
            </>
          )}
        </div>
      ))}
    </>
  );
};

export default ReservationStatusDetail;
