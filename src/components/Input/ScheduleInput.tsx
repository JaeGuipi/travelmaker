import { useState } from "react";
import { useFieldArray, Control, UseFormRegister } from "react-hook-form";
import { FiPlus, FiMinus } from "react-icons/fi";
import { PostActivity } from "@/types/activites/activitesTypes";
import s from "./ScheduleInput.module.scss";
import classNames from "classnames/bind";
import { useToast } from "@/hooks/useToast";
import toastMessages from "@/lib/toastMessage";
import { Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import "./Calendar.scss";
import { updateActivity } from "@/actions/activity.action";
import { useParams } from "next/navigation";

const cx = classNames.bind(s);

interface ScheduleInputProps {
  control: Control<PostActivity>;
  register: UseFormRegister<PostActivity>;
}

const ScheduleInput = ({ control }: ScheduleInputProps) => {
  const { showSuccess, showError, notify } = useToast();
  // const [schedule, setSchedule] = useState<any>({
  //   date: null,
  //   startTime: null,
  //   endTime: null,
  // });
  const { activityId } = useParams();
  const [date, setDate] = useState<Date | null>(null);
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");
  const { fields, append, remove } = useFieldArray({
    control,
    name: "schedules",
  });

  // const isOverlapping = (newSchedule: any) => {
  //   return fields.some(
  //     (field) =>
  //       field.date === newSchedule.date &&
  //       ((newSchedule.startTime >= field.startTime && newSchedule.startTime < field.endTime) ||
  //         (newSchedule.endTime > field.startTime && newSchedule.endTime <= field.endTime) ||
  //         (newSchedule.startTime <= field.startTime && newSchedule.endTime >= field.endTime)),
  //   );
  // };

  // const handleAppend = (newSchedule: any) => {
  //   if (!newSchedule.date || !newSchedule.startTime || !newSchedule.endTime) {
  //     notify(toastMessages.notify.scheduleField);
  //     return;
  //   }

  //   if (newSchedule.startTime >= newSchedule.endTime) {
  //     notify(toastMessages.notify.scheduleStartTime);
  //     return;
  //   }

  //   if (isOverlapping(newSchedule)) {
  //     notify(toastMessages.notify.newSchedule);
  //     return;
  //   }

  //   setSchedule({ date: "", startTime: "", endTime: "" });
  //   append({ id: Date.now(), ...newSchedule });
  // };

  const handleAppend = () => {
    if (!date || !startTime || !endTime || startTime >= endTime) {
      alert("유효하지 않은 시간 범위입니다.");
      return;
    }

    append({
      date: format(date, "yyyy-MM-dd"),
      startTime,
      endTime,
    });

    // 입력 필드 리셋
    setDate(null);
    setStartTime("");
    setEndTime("");
  };

  // const handleRemove = async (index: number) => {
  //   const fieldToRemove = fields[index];
  //   const id = Number(activityId);

  //   const formData = {
  //     date: fieldToRemove.date,
  //     startTime: fieldToRemove.startTime,
  //     endTime: fieldToRemove.endTime,
  //     scheduleId: fieldToRemove.id,
  //   };

  //   try {
  //     // 예약 내역이 없을 때 항목 삭제
  //     remove(index);
  //     showSuccess(toastMessages.success.scheduleRemoved);

  //     const response = await updateActivity(id, formData);

  //     if (!response.ok) {
  //       console.error("HTTP 상태 코드:", response.status); // 상태 코드 출력
  //       console.error("전체 응답:", response); // 응답 객체 출력
  //       notify(toastMessages.notify.reservationExists);
  //       return;
  //     }
  //   } catch (error) {
  //     console.error("삭제 중 에러 발생:", error);
  //     showError(toastMessages.error.serverError);
  //   }
  // };

  return (
    <div className={s.scheduleInputContainer}>
      <label className={s.titleLabel}>예약 가능한 시간대</label>
      <div className={s.scheduleInputWrap}>
        <div className={s.fieldList}>
          <div className={s.fieldItem}>
            <label className={s.subLabel}>날짜</label>
            <Controller
              name="date"
              control={control}
              render={({ field }) => (
                <DatePicker
                  locale={ko}
                  selected={date}
                  onChange={(date: Date | null) => {
                    setDate(date);
                    field.onChange(date ? format(date, "yyyy-MM-dd") : "");
                  }}
                  dateFormat="yyyy-MM-dd"
                  dateFormatCalendar="yyyy년 MM월"
                  placeholderText="YYYY-MM-DD"
                  className={s.scheduleInput}
                />
              )}
            />
          </div>

          <div className={cx("fieldItem", "titme")}>
            <label className={s.subLabel}>시작 시간</label>
            <Controller
              name="startTime"
              control={control}
              render={({ field }) => (
                <DatePicker
                  selected={startTime ? new Date(`1970-01-01T${startTime}:00`) : null}
                  onChange={(time: Date | null) => {
                    setStartTime(time ? format(time, "HH:mm") : "");
                    field.onChange(time ? format(time, "HH:mm") : "");
                  }}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={15}
                  timeCaption="시작 시간"
                  dateFormat="HH:mm"
                  placeholderText="00:00"
                  className={s.scheduleInput}
                />
              )}
            />
          </div>

          <span className={s.timeSeparator}>~</span>

          <div className={cx("fieldItem", "titme")}>
            <label className={s.subLabel}>종료 시간</label>
            <Controller
              name="endTime"
              control={control}
              render={({ field }) => (
                <DatePicker
                  selected={endTime ? new Date(`1970-01-01T${endTime}:00`) : null}
                  onChange={(time: Date | null) => {
                    setEndTime(time ? format(time, "HH:mm") : "");
                    field.onChange(time ? format(time, "HH:mm") : "");
                  }}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={15}
                  timeCaption="종료 시간"
                  dateFormat="HH:mm"
                  placeholderText="00:00"
                  className={s.scheduleInput}
                />
              )}
            />
          </div>

          <button type="button" onClick={handleAppend} className={s.addButton}>
            <FiPlus />
          </button>
        </div>

        {fields.map((field, index) => (
          <ul key={field.id} className={cx("fieldList", "active")}>
            <li className={s.fieldItem}>
              <span className={s.scheduleInput}>{field.date}</span>
            </li>
            <li className={cx("fieldItem", "titme")}>
              <span className={s.scheduleInput}>{field.startTime}</span>
            </li>
            <span className={s.timeSeparator}>~</span>
            <li className={cx("fieldItem", "titme")}>
              <span className={s.scheduleInput}>{field.endTime}</span>
            </li>

            <button type="button" onClick={() => remove(index)} className={s.removeButton}>
              <FiMinus />
            </button>
          </ul>
        ))}
      </div>
    </div>
  );
};

export default ScheduleInput;
