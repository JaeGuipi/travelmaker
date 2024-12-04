"use client";
import { useState, useEffect, useRef } from "react";
import { MyReservation } from "@/types/types";
import classNames from "classnames/bind";
import s from "./MyReservationList.module.scss";
import MyReservationItem from "../MyReservationItem/MyReservationItem";
import Image from "next/image";
import Dropdown, { DropdownToggle, DropdownMenu, DropdownItem } from "../Dropdown/Dropdown";

const cx = classNames.bind(s);

const MyReservationList = ({
  initialReservations,
  cursorId,
}: {
  initialReservations: MyReservation[];
  cursorId: number;
}) => {
  const [reservationList, setReservationList] = useState(initialReservations);
  const [currentCursorId, setCurrentCursorId] = useState(cursorId);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("예약 상태");
  const [reservationStatus, setReservationStatus] = useState("");
  const observerRef = useRef<HTMLDivElement | null>(null);

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
  }, [isLoading, currentCursorId, reservationList]);

  if (reservationList.length === 0) {
    return (
      <div className={cx("no-list")}>
        <Image src="/images/no-list.png" width={110} height={149} alt="" />
        <p className={cx("no-list-notice")}>아직 등록한 체험이 없어요</p>
      </div>
    );
  }

  return (
    <>
      <div className={cx("dropdown-container")}>
        <Dropdown>
          <DropdownToggle>{selectedStatus}</DropdownToggle>
          <DropdownMenu>
            <DropdownItem
              onClick={() => {
                console.log("온클릭");
                orderedList("pending");
                setSelectedStatus("예약 완료");
              }}
            >
              예약 완료
            </DropdownItem>
            <DropdownItem
              onClick={() => {
                orderedList("canceled");
                setSelectedStatus("예약 취소");
              }}
            >
              예약 취소
            </DropdownItem>
            <DropdownItem
              onClick={() => {
                orderedList("confirmed");
                setSelectedStatus("예약 승인");
              }}
            >
              예약 승인
            </DropdownItem>
            <DropdownItem
              onClick={() => {
                orderedList("declined");
                setSelectedStatus("예약 거절");
              }}
            >
              예약 거절
            </DropdownItem>
            <DropdownItem
              onClick={() => {
                orderedList("completed");
                setSelectedStatus("체험 완료");
              }}
            >
              체험 완료
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
      <div className={cx("list-container")}>
        {reservationList.map((reservation) => (
          <MyReservationItem key={reservation?.id} reservation={reservation} onDelete={handleDeleteItem} />
        ))}
        {currentCursorId !== null && <div ref={observerRef}>{isLoading && <p>Loading...</p>}</div>}
      </div>
    </>
  );
};

export default MyReservationList;
