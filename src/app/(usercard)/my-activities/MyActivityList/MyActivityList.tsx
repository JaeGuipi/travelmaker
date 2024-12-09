"use client";
import MyActivityItem from "@/app/(usercard)/my-activities/MyActivityItem/MyActivityItem";
import { MyActivity } from "@/types/types";
import { useEffect, useRef, useState } from "react";
import NoList from "../../my-reservation/MyReservationList/NoList";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";
import s from "@/app/(usercard)/my-reservation/MyReservationList/MyReservationList.module.scss";
import ItemTitleLayout from "@/components/ItemTitleLayout/ItemTitleLayout";
import FormButton from "@/components/Button/FormButton";
import { useRouter } from "next/navigation";

const MyActivityList = ({ initialActivityList, cursorId }: { initialActivityList: MyActivity[]; cursorId: number }) => {
  const [activityList, setActivityList] = useState(initialActivityList);
  const [currentCursorId, setCurrentCursorId] = useState(cursorId);
  const [isLoading, setIsLoading] = useState(false);
  const observerRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter()

  useEffect(() => {
    if (activityList.length === 0) return;

    const loadMoreList = async () => {
      if (isLoading || currentCursorId === null) return;
      setIsLoading(true);
      try {
        const response = await fetch(`/api/my-activities?size=6&cursorId=${currentCursorId}`);
        const { activities: newActivities, cursorId: nextCursorId } = await response.json();

        setActivityList((prev) => [...prev, ...newActivities]);
        setCurrentCursorId(nextCursorId || null);
      } catch (error) {
        console.error("체험 리스트 불러오기 실패", error);
      } finally {
        setIsLoading(false);
      }
    };

    const observer = new IntersectionObserver((entries) => {
      const target = entries[0];
      if (target.isIntersecting && !isLoading) loadMoreList();
    });

    const refValue = observerRef.current;

    if (refValue) observer.observe(refValue);

    return () => {
      if (refValue) observer.unobserve(refValue);
    };
  }, [isLoading, currentCursorId, activityList]);

  if (activityList.length === 0) {
    return <NoList text="아직 등록한 체험이 없어요" />;
  }
  return (
    <div className={s["content-container"]}>
      <ItemTitleLayout title="내 체험관리">
        <FormButton onClick={() => router.push("/my-activities/register-activity")}>체험 등록하기</FormButton>
      </ItemTitleLayout>
      <div>
        {activityList.map((activity) => (
          <MyActivityItem key={activity.id} activity={activity}></MyActivityItem>
        ))}
        {currentCursorId !== null && <div ref={observerRef}>{isLoading && <LoadingSpinner />}</div>}
      </div>
    </div>
  );
};

export default MyActivityList;
