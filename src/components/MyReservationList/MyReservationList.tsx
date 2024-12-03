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
  const observerRef = useRef<HTMLDivElement | null>(null);

const handleDelete = (id: number) => {
  setReservationList((prev) => prev.filter((reservation) => reservation.id !== id))
  //삭제(수정) patch 보내기
  
}

  useEffect(() => {
    if (reservationList.length === 0) return;

    const loadMoreList = async () => {
      if (isLoading || currentCursorId === null) return;
      setIsLoading(true);
      try {
        const response = await fetch(`/api/my-reservations?size=4&cursorId=${currentCursorId}`);
        const { reservations: newReservations, cursorId: nextCursorId } = await response.json();

        setReservationList((prev) => [...prev, ...newReservations]);
        setCurrentCursorId(nextCursorId || null);
      } catch (err) {
        console.error("예약내역리스트 불러오기 실패", err);
      } finally {
        setIsLoading(false);
      }

      console.log(reservationList);
    };

    const observer = new IntersectionObserver((entries) => {
      const target = entries[0];
      if (target.isIntersecting && !isLoading) {
        loadMoreList();
      }
    });
    const refValue = observerRef.current;

    if (refValue) {
      observer.observe(refValue);
    }

    return () => {
      if (refValue) {
        observer.unobserve(refValue);
      }
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
          <DropdownToggle>예약 상태</DropdownToggle>
          <DropdownMenu>
            <DropdownItem>예약 신청</DropdownItem>
            <DropdownItem>예약 취소</DropdownItem>
            <DropdownItem>예약 승인</DropdownItem>
            <DropdownItem>예약 거절</DropdownItem>
            <DropdownItem>체험 완료</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
      <div className={cx("list-container")}>
        {reservationList.map((reservation) => (
          <MyReservationItem key={reservation?.id} reservation={reservation} onDelete={handleDelete} />
        ))}
        {currentCursorId !== null && <div ref={observerRef}>{isLoading && <p>Loading...</p>}</div>}
      </div>
    </>
  );
};

export default MyReservationList;
