import { useState } from "react";
import { useFieldArray, Control, UseFormRegister, FieldErrors } from "react-hook-form";
import { FiPlus, FiMinus } from "react-icons/fi";
import { PostActivity } from "@/types/activites/activitesTypes";
import s from "./ScheduleInput.module.scss";
import classNames from "classnames/bind";
import CustomInput from "@/components/Input/CustomInput";

const cx = classNames.bind(s);

interface ScheduleInputProps {
  control: Control<PostActivity>;
  register: UseFormRegister<PostActivity>;
  errors: FieldErrors<PostActivity>;
}

const ScheduleInput = ({ control, register, errors }: ScheduleInputProps) => {
  const [schedule, setSchedule] = useState({ date: "", startTime: "", endTime: "" });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "schedules",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setSchedule((prev) => ({ ...prev, [id]: value }));
  };

  const handleAppend = (schedule: { date: string; startTime: string; endTime: string }) => {
    setSchedule({ date: "", startTime: "", endTime: "" });
    append({ id: Date.now(), ...schedule });
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
          <div key={field.id} className={s.fieldList}>
            <div className={s.fieldItem}>
              <label className={s.subLabel}>날짜</label>
              <CustomInput
                id="date"
                type="date"
                errors={errors.schedules?.[index]?.date?.message}
                {...register(`schedules.${index}.date`, {
                  required: "날짜를 선택해주세요.",
                })}
              />
            </div>

            <div className={cx("fieldItem", "titme")}>
              <label className={s.subLabel}>시작 시간</label>
              <CustomInput
                id="startTime"
                type="time"
                errors={errors.schedules?.[index]?.startTime?.message}
                {...register(`schedules.${index}.startTime`, {
                  required: "시작 시간을 선택해주세요.",
                })}
              />
            </div>

            <span className={s.timeSeparator}>~</span>

            <div className={cx("fieldItem", "titme")}>
              <label className={s.subLabel}>종료 시간</label>
              <CustomInput
                id="endTime"
                type="time"
                errors={errors.schedules?.[index]?.endTime?.message}
                {...register(`schedules.${index}.endTime`, {
                  required: "종료 시간을 선택해주세요.",
                })}
              />
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
