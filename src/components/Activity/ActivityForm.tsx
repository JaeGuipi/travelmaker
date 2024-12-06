"use client";

import { ChangeEvent, useState } from "react";
import FormButton from "../Button/FormButton";
import CustomInput from "../Input/CustomInput";
import s from "./ActivityForm.module.scss";
import classNames from "classnames/bind";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { postActivity, uploadActivityImage } from "@/actions/activity.action";
import Image from "next/image";
import { useToast } from "@/hooks/useToast";
import toastMessages from "@/lib/toastMessage";
import CategoryDropdown from "../Dropdown/CategoryDropdown";

const cx = classNames.bind(s);

export const ScheduleInput = ({ control, register, errors }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "schedules", // schedules 필드 이름
  });

  return (
    <div>
      <label>예약 가능한 시간대</label>
      {fields.map((field, index) => (
        <div key={field.id} style={{ display: "flex", marginBottom: "10px" }}>
          {/* 날짜 */}
          <CustomInput
            type="date"
            name="date"
            {...register(`schedules.${index}.date`, {
              required: "날짜를 선택해주세요.",
            })}
          />
          {errors.schedules?.[index]?.date && <p>{errors.schedules[index].date.message}</p>}

          {/* 시작 시간 */}
          <CustomInput
            type="time"
            name="time"
            {...register(`schedules.${index}.startTime`, {
              required: "시작 시간을 선택해주세요.",
            })}
          />
          {errors.schedules?.[index]?.startTime && <p>{errors.schedules[index].startTime.message}</p>}

          {/* 종료 시간 */}
          <CustomInput
            type="time"
            name="time"
            {...register(`schedules.${index}.endTime`, {
              required: "종료 시간을 선택해주세요.",
            })}
          />
          {errors.schedules?.[index]?.endTime && <p>{errors.schedules[index].endTime.message}</p>}

          {/* 삭제 버튼 */}
          <button type="button" onClick={() => remove(index)}>
            삭제
          </button>
        </div>
      ))}

      {/* 추가 버튼 */}
      <button type="button" onClick={() => append({ date: "", startTime: "", endTime: "" })}>
        + 추가
      </button>
    </div>
  );
};

const ActivityForm = () => {
  const { showSuccess, showError } = useToast();
  const [selectedFile, setSelectedFile] = useState<File>();
  const [preview, setPreview] = useState("");

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      category: "",
      description: "",
      address: "",
      price: 0,
      schedules: [{ date: "", startTime: "", endTime: "" }],
      bannerImageUrl: "",
      subImageUrls: [""],
    },
  });

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);

    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const onSubmit = async (data) => {
    try {
      let activityImageUrl = preview;

      if (selectedFile) {
        const formData = new FormData();
        formData.append("image", selectedFile);

        activityImageUrl = await uploadActivityImage(formData);

        console.log("Final image URL:", activityImageUrl);
      }

      const updatedData = {
        ...data,
        bannerImageUrl: activityImageUrl,
        subImageUrls: [activityImageUrl],
      };

      console.log("폼 데이터:", updatedData);

      console.log("POST 요청 보내기 준비됨:", updatedData);
      await postActivity(updatedData);
      showSuccess(toastMessages.error.activity);
      console.log("POST 요청 전송 완료");
    } catch (error) {
      console.error(error);
      showError(toastMessages.error.activity);
    }
  };

  return (
    <section className={s.activityForm}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={s.activityFormHeader}>
          <h2>내 체험 등록</h2>
          <FormButton type="submit" size="medium">
            등록하기
          </FormButton>
        </div>

        <div className={s.activityFormBody}>
          <CustomInput id="title" type="text" placeholder="제목" {...register("title")} />
          <Controller
            name="category"
            control={control}
            render={({ field }) => <CategoryDropdown id="category" value={field.value} onChange={field.onChange} />}
          />
          <CustomInput id="description" type="text" placeholder="설명" {...register("description")} isTextArea />
          <CustomInput
            label="가격"
            id="price"
            type="number"
            placeholder="가격"
            {...register("price", {
              valueAsNumber: true,
              required: "가격을 입력해주세요.",
              min: { value: 1, message: "가격은 1 이상이어야 합니다." },
            })}
          />
          <CustomInput label="주소" id="address" type="text" placeholder="주소" {...register("address")} />
          <ScheduleInput control={control} register={register} errors={errors} />

          <Image src={preview} width={100} height={100} alt="체험 배너 이미지" />
          <input id="profile-image-input" type="file" accept="image/*" onChange={handleImageChange} />
        </div>
      </form>
    </section>
  );
};

export default ActivityForm;
