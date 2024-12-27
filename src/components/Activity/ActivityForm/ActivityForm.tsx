"use client";

import s from "./ActivityForm.module.scss";
import { ChangeEvent, useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { postActivity, updateActivity, uploadActivityImage } from "@/actions/activity.action";
import { PostActivity, SubImage } from "@/types/activites/activitesTypes";
import { useToast } from "@/hooks/useToast";
import toastMessages from "@/lib/toastMessage";
import FormButton from "@/components/Button/FormButton";
import CustomInput from "@/components/Input/CustomInput";
import CategoryDropdown from "@/components/Activity/ActivityForm/components/CategoryDropdown";
import AddressInput from "@/components/Activity/ActivityForm/components/AddressInput";
import ScheduleInput from "@/components/Activity/ActivityForm/components/ScheduleInput";
import BannerInput from "@/components/Activity/ActivityForm/components/BannerInput";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";

const ActivityForm = ({ activities }: { activities?: PostActivity }) => {
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
    formState: { errors, isValid, isSubmitting },
    reset,
    watch,
  } = useForm<PostActivity>({
    mode: "onChange",
    defaultValues: {
      title: "",
      category: "",
      description: "",
      address: "",
      price: 0,
      schedules: [],
      bannerImageUrl: "",
      subImageUrls: [],
    },
  });

  // 데이터 가져오기 및 폼 초기화
  useEffect(() => {
    const fetchActivities = async () => {
      if (activityId && activities) {
        setActivity(activities);
        reset({ ...activities });
        setBannerPreview(activities.bannerImageUrl || "");
        setSubImagePreviews(activities.subImages?.map((img: SubImage) => img.imageUrl) || []);
      }
    };
    fetchActivities();
  }, [activityId, activities, reset]);

  if (activityId && !activity) {
    return <LoadingSpinner />;
  }

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
        const result = await updateActivity(id, updatedData);
        if (!result.success) {
          showError(result.message);
          return;
        }
        showSuccess(toastMessages.success.activityUpdate);
      } else {
        await postActivity(updatedData);
        showSuccess(toastMessages.success.activity);
      }

      router.push("/my-activities");
    } catch (error: unknown) {
      if (error instanceof Error) {
        showError(error.message);
      } else if (activityId) {
        showError(toastMessages.error.activityUpdate);
      } else {
        showError(toastMessages.error.activity);
      }
    }
  };

  const category = watch("category");
  const address = watch("address");
  const schedules = watch("schedules");

  const isButtonDisabled = !isValid || !bannerPreview || !category || !address || !schedules.length;

  return (
    <section className={s.activityForm}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={s.activityFormHeader}>
          <h2>{activityId ? "내 체험 수정" : "내 체험 등록"}</h2>
          <FormButton type="submit" size="medium" disabled={isSubmitting || isButtonDisabled}>
            {isSubmitting ? <LoadingSpinner /> : activityId ? "수정하기" : "등록하기"}
          </FormButton>
        </div>
        <div className={s.activityFormBody}>
          <p className={s.requiredText}>
            <span className={s.required}>*</span> 표시는 필수 입력 사항입니다.
          </p>
          <CustomInput
            id="title"
            type="text"
            placeholder="제목을 입력해주세요"
            {...register("title", {
              required: { value: true, message: "제목을 입력해주세요." },
            })}
            errors={errors.title?.message}
          />
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <CategoryDropdown
                id="category"
                value={field.value}
                onChange={field.onChange}
                errors={errors.category?.message}
              />
            )}
          />
          <CustomInput
            id="description"
            type="text"
            placeholder="설명을 입력해주세요"
            {...register("description", {
              required: { value: true, message: "설명을 입력해주세요." },
              minLength: { value: 8, message: "설명을 8자 이상 입력해주세요." },
            })}
            isTextArea
            errors={errors.description?.message}
          />
          <CustomInput
            label="가격"
            id="price"
            type="number"
            placeholder="가격"
            required
            min="1000"
            {...register("price", {
              valueAsNumber: true,
              required: { value: true, message: "가격을 입력해주세요." },
              validate: (value) => value >= 1000 || "가격은 1000원 이상 입력해주세요.",
            })}
            errors={errors.price?.message}
          />
          <AddressInput control={control} errors={errors.address?.message} />
          <ScheduleInput control={control} />
          <BannerInput
            title="배너 이미지"
            inputId="bannerImageUrl"
            imagePreviews={bannerPreview}
            handleImageChange={handleBannerImageChange}
            handleImageRemove={handleBannerImageRemove}
            isSingle={true}
            required
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
