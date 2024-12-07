"use client";

import { ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";
import s from "./ActivityForm.module.scss";
import { Controller, useForm } from "react-hook-form";
import { postActivity, uploadActivityImage } from "@/actions/activity.action";
import { PostActivity } from "@/types/activites/activitesTypes";
import { useToast } from "@/hooks/useToast";
import toastMessages from "@/lib/toastMessage";
import FormButton from "@/components/Button/FormButton";
import CustomInput from "@/components/Input/CustomInput";
import ScheduleInput from "@/components/Input/ScheduleInput";
import BannerInput from "@/components/Input/BannerInput";
import CategoryDropdown from "@/components/Dropdown/CategoryDropdown";

const ActivityForm = () => {
  const { showSuccess, showError, notify } = useToast();
  const router = useRouter();
  const [selectedBannerFile, setSelectedBannerFile] = useState<File | null>(null);
  const [selectedSubFiles, setSelectedSubFiles] = useState<File[]>([]);
  const [bannerPreview, setBannerPreview] = useState<string>("");
  const [subImagePreviews, setSubImagePreviews] = useState<string[]>([]);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<PostActivity>({
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

  const handleBannerImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const file = e.target.files[0];
    setSelectedBannerFile(file);
    setBannerPreview(URL.createObjectURL(file));
  };

  const handleSubImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const files = Array.from(e.target.files);
    if (selectedSubFiles.length + files.length > 4) {
      notify(toastMessages.notify.imageUpload);
      return;
    }

    const newFiles = [...selectedSubFiles, ...files];
    const newPreviews = [...subImagePreviews, ...files.map((file) => URL.createObjectURL(file))];

    setSelectedSubFiles(newFiles);
    setSubImagePreviews(newPreviews);
  };

  const handleBannerImageRemove = () => {
    setSelectedBannerFile(null);
    setBannerPreview("");
  };

  const handleSubImageRemove = (index: number) => {
    setSelectedSubFiles((prev) => prev.filter((_, i) => i !== index));
    setSubImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const onSubmit = async (data: PostActivity) => {
    try {
      let activityImageUrl = bannerPreview;
      const subImageUrls: string[] = [];

      if (selectedBannerFile) {
        const formData = new FormData();
        formData.append("image", selectedBannerFile);
        activityImageUrl = await uploadActivityImage(formData);
      }

      if (selectedSubFiles.length > 0) {
        for (const file of selectedSubFiles) {
          const formData = new FormData();
          formData.append("image", file);
          const subImageUrl = await uploadActivityImage(formData);
          subImageUrls.push(subImageUrl);
        }
      }

      const updatedData = {
        ...data,
        bannerImageUrl: activityImageUrl,
        subImageUrls: subImageUrls,
      };

      console.log("폼 데이터:", updatedData);

      console.log("POST 요청 보내기 준비됨:", updatedData);
      await postActivity(updatedData);
      showSuccess(toastMessages.success.activity);
      router.push("/my-activities");
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
          <BannerInput
            title="배너 이미지"
            inputId="bannerImageUrl"
            imagePreviews={bannerPreview}
            handleImageChange={handleBannerImageChange}
            handleImageRemove={handleBannerImageRemove}
            isSingle={true}
          />
          <BannerInput
            title="소개 이미지"
            inputId="subImageUrls"
            imagePreviews={subImagePreviews}
            handleImageChange={handleSubImageChange}
            handleImageRemove={handleSubImageRemove}
            maxImages={4}
          />
        </div>
      </form>
    </section>
  );
};

export default ActivityForm;
