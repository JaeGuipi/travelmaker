"use client";

import { ChangeEvent, useState } from "react";
import FormButton from "../Button/FormButton";
import CustomInput from "../Input/CustomInput";
import s from "./ActivityForm.module.scss";
import classNames from "classnames/bind";
import { useFieldArray, useForm } from "react-hook-form";
import FileInput from "../Input/FileInput";
import { uploadActivityImage } from "@/actions/activity.action";
import Image from "next/image";

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
          <input
            type="date"
            name="date"
            {...register(`schedules.${index}.date`, {
              required: "날짜를 선택해주세요.",
            })}
          />
          {errors.schedules?.[index]?.date && <p>{errors.schedules[index].date.message}</p>}

          {/* 시작 시간 */}
          <input
            type="time"
            name="time"
            {...register(`schedules.${index}.startTime`, {
              required: "시작 시간을 선택해주세요.",
            })}
          />
          {errors.schedules?.[index]?.startTime && <p>{errors.schedules[index].startTime.message}</p>}

          {/* 종료 시간 */}
          <input
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

export function CategoryInput({ value, onChange }) {
  const options = ["문화 · 예술", "식음료", "스포츠", "투어", "관광", "웰빙"];

  const handleChange = (e) => {
    const selectedValue = e.target.value;
    onChange(selectedValue); // 부모 컴포넌트에 선택된 값 전달
  };

  return (
    <div>
      <select id="category" value={value || ""} onChange={handleChange}>
        <option value="" disabled>
          카테고리를 선택해주세요
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

const ActivityForm = ({ users }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
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
      schedules: [{ date: "", startTime: "", endTime: "" }], // 초기 값
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
    console.log(data);

    let bannerImageUrl = preview;

    if (selectedFile) {
      const formData = new FormData();
      formData.append("image", selectedFile);

      try {
        bannerImageUrl = await uploadActivityImage(formData);
      } catch (error) {
        console.error("이미지 업로드 실패:", error);
      }
    }

    const updatedData = {
      ...data,
      bannerImageUrl,
    };

    console.log("폼 데이터:", updatedData);
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

        <input id="title" type="text" placeholder="제목" {...register("title")} />

        <div>
          <label>카테고리</label>
          <select {...register("category")}>
            <option value="">선택해주세요</option>
            <option value="문화 · 예술">문화 · 예술</option>
            <option value="식음료">식음료</option>
            <option value="스포츠">스포츠</option>
            <option value="투어">투어</option>
            <option value="관광">관광</option>
            <option value="웰빙">웰빙</option>
          </select>
        </div>

        {/* <CategoryInput value={watch("category")} onChange={(value) => setValue("category", value)} /> */}

        <input id="description" type="text" placeholder="설명" {...register("description")} />

        <input id="price" type="number" placeholder="가격" {...register("price")} />

        <input id="address" type="text" placeholder="주소" {...register("address")} />

        {/* <CustomInput
          label="예약 가능한 시간대"
          id="address"
          type="datetime-local"
          placeholder="주소"
          {...register("address", { required: "주소를 입력해주세요." })}
        /> */}

        <ScheduleInput control={control} register={register} errors={errors} />
        {/* <FileInput users={users} preview={preview} handleImageChange={handleImageChange} /> */}
        <Image src={preview} width={100} height={100} alt="체험 배너 이미지" />
        <input id="profile-image-input" type="file" accept="image/*" onChange={handleImageChange} />
      </form>
    </section>
  );
};

export default ActivityForm;
