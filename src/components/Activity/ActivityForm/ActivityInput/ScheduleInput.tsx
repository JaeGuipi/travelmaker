import { useState } from "react";
import { useFieldArray, Control } from "react-hook-form";
import { FiPlus, FiMinus } from "react-icons/fi";
import { PostActivity, Schedule } from "@/types/activites/activitesTypes";
import { format } from "date-fns";
import s from "./ScheduleInput.module.scss";
import classNames from "classnames/bind";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./ScheduleCalendar.scss";
import { useToast } from "@/hooks/useToast";
import toastMessages from "@/lib/toastMessage";
import { HiOutlineCalendar } from "react-icons/hi2";
import { IoTimeOutline } from "react-icons/io5";

const cx = classNames.bind(s);

const ScheduleInput = ({ control }: { control: Control<PostActivity> }) => {
  const { notify } = useToast();
  const [date, setDate] = useState<Date | null>(null);
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");
  const { fields, append, remove } = useFieldArray({
    control,
    name: "schedules",
  });

  // 겹치는 시간대 검사
  const isOverlapping = (newSchedule: Schedule) => {
    const parseToDateTime = (dateStr: string, timeStr: string) => new Date(`${dateStr}T${timeStr}`);
    const newStart = parseToDateTime(newSchedule.date, newSchedule.startTime);
    const newEnd = parseToDateTime(newSchedule.date, newSchedule.endTime);

    return fields.some((field) => {
      const existingStart = parseToDateTime(field.date, field.startTime);
      const existingEnd = parseToDateTime(field.date, field.endTime);

      return (
        (newStart >= existingStart && newStart < existingEnd) ||
        (newEnd > existingStart && newEnd <= existingEnd) ||
        (newStart <= existingStart && newEnd >= existingEnd)
      );
    });
  };

  const handleAppend = () => {
    if (!date) {
      notify(toastMessages.notify.scheduleDate);
      return;
    }

    if (!startTime || !endTime) {
      notify(toastMessages.notify.scheduleTime);
      return;
    }

    if (startTime >= endTime) {
      notify(toastMessages.notify.scheduleStartTime);
      return;
    }

    const newSchedule = {
      id: Date.now(),
      date: format(date, "yyyy-MM-dd"),
      startTime,
      endTime,
    };

    if (isOverlapping(newSchedule)) {
      notify(toastMessages.notify.newSchedule);
      return;
    }

    append(newSchedule);
    setDate(null);
    setStartTime("");
    setEndTime("");
  };

  const sortedFields = [...fields].sort((a, b) => {
    if (a.date !== b.date) {
      return a.date.localeCompare(b.date);
    }
    return a.startTime.localeCompare(b.startTime);
  });

  const handleRemoveById = (id: number) => {
    const index = fields.findIndex((field) => field.id === id);
    if (index !== -1) {
      remove(index);
    }
  };

  return (
    <div className={s.scheduleInputContainer}>
      <label className={s.titleLabel}>
        예약 가능한 시간대 <span className={s.required}>*</span>
      </label>
      <div className={s.scheduleInputWrap}>
        <div className={s.fieldList}>
          <div className={s.fieldItem}>
            <label className={s.subLabel}>날짜</label>
            <label className={s.datePickerWrap}>
              <DatePicker
                selected={date}
                onChange={(date: Date | null) => setDate(date)}
                dateFormat="yyyy-MM-dd"
                placeholderText="YYYY-MM-DD"
                className={s.scheduleInput}
              />
              <HiOutlineCalendar size={18} className={cx(date ? "" : "off")} />
            </label>
          </div>

          <div className={cx("fieldItem", "time")}>
            <label className={s.subLabel}>시작 시간</label>
            <label className={s.datePickerWrap}>
              <DatePicker
                selected={startTime ? new Date(`1970-01-01T${startTime}:00`) : null}
                onChange={(time: Date | null) => setStartTime(time ? format(time, "HH:mm") : "")}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={60}
                timeCaption="Start Time"
                timeFormat="HH:mm"
                dateFormat="HH:mm"
                placeholderText="00:00"
                className={s.scheduleInput}
              />
              <IoTimeOutline size={18} className={cx(startTime ? "" : "off")} />
            </label>
          </div>

          <span className={s.timeSeparator}>~</span>

          <div className={cx("fieldItem", "time")}>
            <label className={s.subLabel}>종료 시간</label>
            <label className={s.datePickerWrap}>
              <DatePicker
                selected={endTime ? new Date(`1970-01-01T${endTime}:00`) : null}
                onChange={(time: Date | null) => setEndTime(time ? format(time, "HH:mm") : "")}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={60}
                timeCaption="End Time"
                timeFormat="HH:mm"
                dateFormat="HH:mm"
                placeholderText="00:00"
                className={s.scheduleInput}
              />
              <IoTimeOutline size={18} className={cx(endTime ? "" : "off")} />
            </label>
          </div>

          <button type="button" onClick={handleAppend} className={s.addButton}>
            <FiPlus />
          </button>
        </div>

        {sortedFields.map((field) => (
          <ul key={field.id} className={cx("fieldList", "active")}>
            <li className={s.fieldItem}>
              <span className={s.scheduleInput}>{field.date}</span>
            </li>
            <li className={cx("fieldItem", "time")}>
              <span className={s.scheduleInput}>{field.startTime}</span>
            </li>
            <span className={s.timeSeparator}>~</span>
            <li className={cx("fieldItem", "time")}>
              <span className={s.scheduleInput}>{field.endTime}</span>
            </li>

            <button type="button" onClick={() => handleRemoveById(field.id)} className={s.removeButton}>
              <FiMinus />
            </button>
          </ul>
        ))}
      </div>
    </div>
  );
};

export default ScheduleInput;
