"use client";
import MyActivityItem from "@/app/(usercard)/my-activities/MyActivityItem/MyActivityItem";
import { Activity } from "@/types/activites/activitesTypes";
import { useEffect, useRef, useState } from "react";
import NoList from "@/app/(usercard)/my-reservation/MyReservationList/NoList";
import s from "@/app/(usercard)/my-reservation/MyReservationList/MyReservationList.module.scss";
import ItemTitleLayout from "@/app/(usercard)/my-reservation/ItemTitleLayout/ItemTitleLayout";
import FormButton from "@/components/Button/FormButton";
import { useRouter } from "next/navigation";
import { deleteActivity } from "@/actions/activity.action";
import { useToast } from "@/hooks/useToast";
import toastMessages from "@/lib/toastMessage";
import ConfirmModal from "@/components/Modal/ModalComponents/ConfirmModal";
import useModalStore from "@/store/useModalStore";

const MyActivityList = ({ initialActivityList, cursorId }: { initialActivityList: Activity[]; cursorId: number }) => {
  const [activityList, setActivityList] = useState(initialActivityList);
  const [currentCursorId, setCurrentCursorId] = useState(cursorId);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedId, setSeletedId] = useState<number | null>(null);
  const observerRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  const { notify, showError } = useToast();
  const { toggleModal } = useModalStore();
  const confirmModal = "delete";

  const handleDeleteItem = async () => {
    if (selectedId === null) return;
    const response = await deleteActivity(selectedId);
    if (response?.status === 204) {
      setActivityList((prev) => prev.filter((activity) => activity.id !== selectedId));
      notify(toastMessages.success.deleteActivity);
      setSeletedId(null);
    } else showError(response?.message);
  };

  const openDeleteModal = (id: number) => {
    setSeletedId(id);
    toggleModal(confirmModal);
  };

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

  return (
    <div className={s["content-container"]}>
      <ItemTitleLayout title="내 체험관리">
        <FormButton onClick={() => router.push("/my-activities/register")}>체험 등록하기</FormButton>
      </ItemTitleLayout>
      {activityList.length === 0 ? (
        <NoList text="아직 등록한 체험이 없어요" />
      ) : (
        activityList.map((activity) => (
          <MyActivityItem
            key={activity.id}
            activity={activity}
            onDelete={() => openDeleteModal(activity.id)}
          ></MyActivityItem>
        ))
      )}
      <ConfirmModal modalKey={confirmModal} text="체험을 삭제하시겠어요?" onCancel={handleDeleteItem} id={selectedId} />
    </div>
  );
};

export default MyActivityList;
