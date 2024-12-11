import { useState } from "react";
import { useFieldArray, Control, UseFormRegister } from "react-hook-form";
import { FiPlus, FiMinus } from "react-icons/fi";
import { PostActivity } from "@/types/activites/activitesTypes";
import s from "./ScheduleInput.module.scss";
import classNames from "classnames/bind";
import CustomInput from "@/components/Input/CustomInput";
import { useToast } from "@/hooks/useToast";
import toastMessages from "@/lib/toastMessage";

const cx = classNames.bind(s);

interface ScheduleInputProps {
  control: Control<PostActivity>;
  register: UseFormRegister<PostActivity>;
}

const ScheduleInput = ({ control, register }: ScheduleInputProps) => {
  const { notify } = useToast();
  const [schedule, setSchedule] = useState({ date: "", startTime: "", endTime: "" });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "schedules",
  });

  const isOverlapping = (newSchedule: { date: string; startTime: string; endTime: string }) => {
    return fields.some(
      (field) =>
        field.date === newSchedule.date &&
        ((newSchedule.startTime >= field.startTime && newSchedule.startTime < field.endTime) ||
          (newSchedule.endTime > field.startTime && newSchedule.endTime <= field.endTime) ||
          (newSchedule.startTime <= field.startTime && newSchedule.endTime >= field.endTime)),
    );
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setSchedule((prev) => ({ ...prev, [id]: value }));
  };

  const handleAppend = (newSchedule: { date: string; startTime: string; endTime: string }) => {
    if (!newSchedule.date || !newSchedule.startTime || !newSchedule.endTime) {
      notify(toastMessages.notify.scheduleField);
      return;
    }

    if (newSchedule.startTime >= newSchedule.endTime) {
      notify(toastMessages.notify.scheduleStartTime);
      return;
    }

    if (isOverlapping(newSchedule)) {
      notify(toastMessages.notify.newSchedule);
      return;
    }

    setSchedule({ date: "", startTime: "", endTime: "" });
    append({ id: Date.now(), ...newSchedule });
  };

  return (
    <div className={s.scheduleInputContainer}>
      <label className={s.titleLabel}>예약 가능한 시간대</label>
      <div className={s.scheduleInputWrap}>
        <div className={s.fieldList}>
          <div className={s.fieldItem}>
            <label className={s.subLabel}>날짜</label>
            <CustomInput id="date" type="date" value={schedule.date} onChange={handleChange} />
          </div>

          <div className={cx("fieldItem", "titme")}>
            <label className={s.subLabel}>시작 시간</label>
            <CustomInput id="startTime" type="time" value={schedule.startTime} onChange={handleChange} />
          </div>

          <span className={s.timeSeparator}>~</span>

          <div className={cx("fieldItem", "titme")}>
            <label className={s.subLabel}>종료 시간</label>
            <CustomInput id="endTime" type="time" value={schedule.endTime} onChange={handleChange} />
          </div>

          <button
            type="button"
            onClick={() => {
              handleAppend(schedule);
            }}
            className={s.addButton}
          >
            <FiPlus />
          </button>
        </div>

        {fields.map((field, index) => (
          <div key={field.id} className={cx("fieldList", "active")}>
            <div className={s.fieldItem}>
              <label className={s.subLabel}>날짜</label>
              <CustomInput id="date" type="date" {...register(`schedules.${index}.date`)} />
            </div>

            <div className={cx("fieldItem", "titme")}>
              <label className={s.subLabel}>시작 시간</label>
              <CustomInput id="startTime" type="time" {...register(`schedules.${index}.startTime`)} />
            </div>

            <span className={s.timeSeparator}>~</span>

            <div className={cx("fieldItem", "titme")}>
              <label className={s.subLabel}>종료 시간</label>
              <CustomInput id="endTime" type="time" {...register(`schedules.${index}.endTime`)} />
            </div>

            <button type="button" onClick={() => remove(index)} className={s.removeButton}>
              <FiMinus />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScheduleInput;
