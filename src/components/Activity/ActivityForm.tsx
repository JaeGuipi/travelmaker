"use client";

import s from "./ActivityForm.module.scss";
import { ChangeEvent, useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { getActivityById, postActivity, updateActivity, uploadActivityImage } from "@/actions/activity.action";
import { PostActivity, SubImage } from "@/types/activites/activitesTypes";
import { useToast } from "@/hooks/useToast";
import toastMessages from "@/lib/toastMessage";
import FormButton from "@/components/Button/FormButton";
import CustomInput from "@/components/Input/CustomInput";
import ScheduleInput from "@/components/Input/ScheduleInput";
import BannerInput from "@/components/Input/BannerInput";
import CategoryDropdown from "@/components/Dropdown/CategoryDropdown";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";

const ActivityForm = () => {
  const { showSuccess, showError, notify } = useToast();
  const router = useRouter();
  const { activityId } = useParams();
  const [selectedBannerFile, setSelectedBannerFile] = useState<File | null>(null);
  const [selectedSubFiles, setSelectedSubFiles] = useState<File[]>([]);
  const [bannerPreview, setBannerPreview] = useState<string>("");
  const [subImagePreviews, setSubImagePreviews] = useState<string[]>([]);
  const [activity, setActivity] = useState<PostActivity | null>(null);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
    reset,
  } = useForm<PostActivity>({
    defaultValues: {
      title: "",
      category: "",
      description: "",
      address: "",
      price: 0,
      schedules: [],
      bannerImageUrl: "",
      subImageUrls: [""],
    },
  });

  // 데이터 가져오기 및 폼 초기화
  useEffect(() => {
    const fetchActivities = async () => {
      if (activityId) {
        const id = Number(activityId);
        const selectedActivity = await getActivityById(id);
        if (selectedActivity) {
          setActivity(selectedActivity);
          reset({ ...selectedActivity });
          setBannerPreview(selectedActivity.bannerImageUrl || "");
          setSubImagePreviews(selectedActivity.subImages?.map((img: SubImage) => img.imageUrl) || []);
        }
      }
    };
    fetchActivities();
  }, [activityId, reset]);

  // 배너 이미지 체인지 이벤트
  const handleBannerImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    setSelectedBannerFile(file);
    setBannerPreview(URL.createObjectURL(file));
  };

  // 소개 이미지 체인지 이벤트
  const handleSubImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    if (selectedSubFiles.length + files.length > 4) {
      notify(toastMessages.notify.imageUpload);
      return;
    }
    setSelectedSubFiles([...selectedSubFiles, ...files]);
    setSubImagePreviews([...subImagePreviews, ...files.map((file) => URL.createObjectURL(file))]);
  };

  // 배너 이미지 삭제 이벤트
  const handleBannerImageRemove = () => {
    setSelectedBannerFile(null);
    setBannerPreview("");
  };

  // 소개 이미지 삭제 이벤트
  const handleSubImageRemove = (index: number) => {
    setSelectedSubFiles((prev) => prev.filter((_, i) => i !== index));
    setSubImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const onSubmit = async (data: PostActivity) => {
    try {
      let activityImageUrl = bannerPreview;
      const subImageUrls: string[] = [];
      const subImageIdsToRemove: number[] = [];
      const subImageUrlsToAdd: string[] = [];
      const scheduleIdsToRemove: number[] = [];
      const schedulesToAdd: Array<{ date: string; startTime: string; endTime: string }> = [];

      // 배너 이미지 업로드
      if (selectedBannerFile) {
        const formData = new FormData();
        formData.append("image", selectedBannerFile);
        activityImageUrl = await uploadActivityImage(formData);
      }

      // 소개 이미지 업로드
      if (selectedSubFiles.length > 0) {
        for (const file of selectedSubFiles) {
          const formData = new FormData();
          formData.append("image", file);
          const subImageUrl = await uploadActivityImage(formData);
          subImageUrls.push(subImageUrl);
        }
      }

      if (activityId && activity) {
        const activityData = activity;
        const currentScheduleIds = activityData.schedules.map((schedule) => schedule.id);

        // 새로운 스케줄 추가
        data.schedules.forEach((schedule) => {
          if (!currentScheduleIds.includes(schedule.id)) {
            schedulesToAdd.push(schedule);
          }
        });

        // 기존 스케줄 id 삭제
        scheduleIdsToRemove.push(
          ...activityData.schedules
            .filter((schedule) => !data.schedules.some((newSchedule) => newSchedule.id === schedule.id))
            .map((schedule) => schedule.id),
        );

        // 새로운 소개 이미지 추가
        subImageUrlsToAdd.push(...subImageUrls);

        // 기존 소개 이미지 id 삭제
        if (activityData.subImages) {
          subImageIdsToRemove.push(
            ...activityData.subImages
              .filter((img) => img.imageUrl && !subImagePreviews.includes(img.imageUrl))
              .map((img) => img.id),
          );
        }
      }

      const updatedData = {
        ...data,
        bannerImageUrl: activityImageUrl,
        subImageUrls: subImageUrls,
        subImageIdsToRemove,
        subImageUrlsToAdd,
        scheduleIdsToRemove,
        schedulesToAdd,
      };

      if (activityId) {
        const id = Number(activityId);
        await updateActivity(id, updatedData);
        showSuccess(toastMessages.success.activityUpdate);
      } else {
        await postActivity(updatedData);
        showSuccess(toastMessages.success.activity);
      }

      router.push("/my-activities");
    } catch (error) {
      console.error(error);
      if (activityId) {
        showError(toastMessages.error.activityUpdate);
      } else {
        showError(toastMessages.error.activity);
      }
    }
  };

  if (activityId && !activity) {
    return <LoadingSpinner />;
  }

  return (
    <section className={s.activityForm}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={s.activityFormHeader}>
          <h2>{activityId ? "내 체험 수정" : "내 체험 등록"}</h2>
          <FormButton type="submit" size="medium" disabled={!isValid}>
            {activityId ? "수정하기" : "등록하기"}
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
