"use client";
import { useState, useEffect, useRef } from "react";
import { MyReservation } from "@/types/types";
import s from "./MyReservationList.module.scss";
import MyReservationItem from "../MyReservationItem/MyReservationItem";
import Dropdown, { DropdownToggle, DropdownMenu, DropdownItem } from "../../../../components/Dropdown/Dropdown";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";
import NoList from "./NoList";
import ItemTitleLayout from "@/components/ItemTitleLayout/ItemTitleLayout";

const MyReservationList = ({
  initialReservationList,
  cursorId,
}: {
  initialReservationList: MyReservation[];
  cursorId: number;
}) => {
  const [reservationList, setReservationList] = useState(initialReservationList);
  const [currentCursorId, setCurrentCursorId] = useState(cursorId);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("예약 상태");
  const [reservationStatus, setReservationStatus] = useState("");
  const observerRef = useRef<HTMLDivElement | null>(null);

  const dropdownItems = [
    { key: "pending", label: "예약 완료" },
    { key: "canceled", label: "예약 취소" },
    { key: "confirmed", label: "예약 승인" },
    { key: "declined", label: "예약 거절" },
    { key: "completed", label: "체험 완료" },
  ];

  const handleDeleteItem = async (id: number) => {
    const response = await fetch(`/api/my-reservations/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: "canceled" }),
    });
    if (response.ok) {
      setReservationList((prev) => prev.filter((reservation) => reservation.id !== id));
    }
  };

  const orderedList = async (status: string) => {
    if (isLoading) return;
    setIsLoading(true);
    setReservationStatus(status);
    try {
      const response = await fetch(`/api/my-reservations?size=6&status=${status}`);
      console.log("요청 URL:", response);
      const { reservations: newReservations, cursorId: nextCursorId } = await response.json();
      setReservationList([...newReservations]);
      setCurrentCursorId(nextCursorId || null);
    } catch (error) {
      console.error(`${status}내역 리스트 불러오기 실패`, error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (reservationList.length === 0) return;

    const loadMoreList = async () => {
      if (isLoading || currentCursorId === null) return;
      setIsLoading(true);
      try {
        const response = await fetch(
          `/api/my-reservations?size=6&cursorId=${currentCursorId}${
            reservationStatus ? `&status=${reservationStatus}` : ""
          }`,
        );
        const { reservations: newReservations, cursorId: nextCursorId } = await response.json();

        setReservationList((prev) => [...prev, ...newReservations]);
        setCurrentCursorId(nextCursorId || null);
      } catch (error) {
        console.error("예약내역 리스트 불러오기 실패", error);
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
  }, [isLoading, currentCursorId, reservationList, reservationStatus]);

  if (reservationList.length === 0) {
    return <NoList text="아직 등록한 체험이 없어요" />;
  }

  return (
    <>
      <div className={s["content-container"]}>
        <ItemTitleLayout title="예약 내역">
          <div className={s["dropdown-container"]}>
            <Dropdown>
              <DropdownToggle>{selectedStatus}</DropdownToggle>
              <DropdownMenu>
                {dropdownItems.map(({ key, label }) => (
                  <DropdownItem
                    key={key}
                    onClick={() => {
                      orderedList(key);
                      setSelectedStatus(label);
                    }}
                  >
                    {label}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </div>
        </ItemTitleLayout>
        <div>
          {reservationList.map((reservation) => (
            <MyReservationItem key={reservation?.id} reservation={reservation} onDelete={handleDeleteItem} />
          ))}
          {currentCursorId !== null && <div ref={observerRef}>{isLoading && <LoadingSpinner />}</div>}
        </div>
      </div>
    </>
  );
};

export default MyReservationList;
