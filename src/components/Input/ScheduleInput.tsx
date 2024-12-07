import { useFieldArray, Control, UseFormRegister, FieldErrors } from "react-hook-form";
import CustomInput from "./CustomInput";
import s from "./ScheduleInput.module.scss";
import classNames from "classnames/bind";
import { FiPlus, FiMinus } from "react-icons/fi";
import { PostActivity } from "@/types/activites/activitesTypes";

const cx = classNames.bind(s);

interface ScheduleInputProps {
  control: Control<PostActivity>;
  register: UseFormRegister<PostActivity>;
  errors: FieldErrors<PostActivity>;
}

const ScheduleInput = ({ control, register, errors }: ScheduleInputProps) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "schedules",
  });

  return (
    <div className={s.scheduleInputContainer}>
      <label className={s.titleLabel}>예약 가능한 시간대</label>
      <div className={s.scheduleInputWrap}>
        <div className={s.fieldList}>
          <div className={s.fieldItem}>
            <label className={s.subLabel}>날짜</label>
            <CustomInput
              id="date"
              type="date"
              errors={errors.schedules?.[0]?.date?.message}
              {...register(`schedules.0.date`, {
                required: "날짜를 선택해주세요.",
              })}
            />
          </div>

          <div className={cx("fieldItem", "titme")}>
            <label className={s.subLabel}>시작 시간</label>
            <CustomInput
              id="startTime"
              type="time"
              errors={errors.schedules?.[0]?.startTime?.message}
              {...register(`schedules.0.startTime`, {
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
              errors={errors.schedules?.[0]?.endTime?.message}
              {...register(`schedules.0.endTime`, {
                required: "종료 시간을 선택해주세요.",
              })}
            />
          </div>

          <button
            type="button"
            onClick={() => append({ date: "", startTime: "", endTime: "" })}
            className={s.addButton}
          >
            <FiPlus />
          </button>
        </div>

        {fields.slice(1).map((field, index) => (
          <div key={field.id} className={s.fieldList}>
            <div className={s.fieldItem}>
              <label className={s.subLabel}>날짜</label>
              <CustomInput
                id="date"
                type="date"
                errors={errors.schedules?.[index + 1]?.date?.message}
                {...register(`schedules.${index + 1}.date`, {
                  required: "날짜를 선택해주세요.",
                })}
              />
            </div>

            <div className={cx("fieldItem", "titme")}>
              <label className={s.subLabel}>시작 시간</label>
              <CustomInput
                id="startTime"
                type="time"
                errors={errors.schedules?.[index + 1]?.startTime?.message}
                {...register(`schedules.${index + 1}.startTime`, {
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
                errors={errors.schedules?.[index + 1]?.endTime?.message}
                {...register(`schedules.${index + 1}.endTime`, {
                  required: "종료 시간을 선택해주세요.",
                })}
              />
            </div>

            <button type="button" onClick={() => remove(index + 1)} className={s.removeButton}>
              <FiMinus />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScheduleInput;
