"use client";

import { z } from "zod";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useToast } from "@/hooks/useToast";
import toastMessages from "@/lib/toastMessage";

import CustomInput from "@/components/Input/CustomInput";
import FormButton from "@/components/Button/FormButton";
import { updateMyInfo, createProfileImageUrl } from "@/lib/api/user";
// import { useRouter } from "next/navigation";
import { GetMe } from "@/types/users/usersTypes";
import Image from "next/image";
import { useState } from "react";

// 비밀번호 조건 정규표현식
const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$&*?!%])[A-Za-z\d!@$%&*?]{8,15}$/;

// 로그인 스키마 정의
export const MyPageSchema = z
  .object({
    nickname: z.string().min(1, { message: "닉네임을 입력해주세요." }),
    profileImageUrl: z.string(),
    newPassword: z
      .string()
      .min(8, { message: "비밀번호를 8자리 이상 입력해 주세요." })
      .max(15, { message: "비밀번호를 15자리 이하로 입력해 주세요." })
      .regex(passwordRegex, {
        message: "영문, 숫자, 특수문자(~!@#$%^&*)를 모두 조합해 주세요.",
      }),
    newPasswordConfirm: z.string().min(8, "8자 이상 입력해주세요"),
  })
  .refine((data) => data.newPassword === data.newPasswordConfirm, {
    path: ["newPasswordConfirm"],
    message: "비밀번호가 일치하지 않습니다.",
  });

export type MyPageFormValues = z.infer<typeof MyPageSchema>;

const MyPageForm = ({ user }: { user: GetMe }) => {
  // const router = useRouter();

  const [preview, setPreview] = useState(user.profileImageUrl || "/images/profile.png");
  const { showSuccess, showError } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<MyPageFormValues>({
    resolver: zodResolver(MyPageSchema),
    mode: "onChange",
    defaultValues: {
      nickname: user.nickname,
      newPassword: "",
      newPasswordConfirm: "",
      profileImageUrl: user.profileImageUrl,
    },
  });

  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // FormData 객체를 사용해 파일 추가
    const formData = new FormData();
    formData.append("image", file);

    try {
      await createProfileImageUrl(formData); // FormData 전송
      showSuccess(toastMessages.success.updateProfile);
      setPreview(URL.createObjectURL(file)); // 이미지 미리보기
    } catch (error) {
      console.error("이미지 업로드 실패:", error);
      showError(toastMessages.error.updateProfile);
    }
  };

  const onSubmit = async (data: MyPageFormValues) => {
    try {
      const profileImageUrl = data.profileImageUrl; // 업로드한 이미지 URL
      await updateMyInfo({
        nickname: data.nickname,
        newPassword: data.newPassword,
        profileImageUrl, // 이미지 URL도 함께 서버로 보냄
      });
      showSuccess(toastMessages.success.editInfo);
    } catch (error) {
      console.error(error);
      showError(toastMessages.error.editInfo);
    }
  };

  return (
    <section className="container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Image src={preview} alt="프로필 이미지" width={100} height={100} />
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </div>
        <CustomInput
          label="닉네임"
          id="nickname"
          type="nickname"
          placeholder="닉네임을 입력해 주세요"
          errors={errors.nickname?.message}
          {...register("nickname")}
        />
        <CustomInput label="이메일" id="email" type="email" value={user?.email} readOnly />
        <CustomInput
          label="비밀번호"
          id="newPassword"
          type="password"
          iconType="password"
          placeholder="비밀번호를 입력해 주세요"
          errors={errors.newPassword?.message}
          {...register("newPassword")}
        />
        <CustomInput
          label="비밀번호 확인"
          id="newPasswordConfirm"
          type="password"
          iconType="password"
          placeholder="비밀번호를 한번 더 입력해 주세요"
          errors={errors.newPasswordConfirm?.message}
          {...register("newPasswordConfirm")}
        />

        <FormButton type="submit" size="large">
          저장하기
        </FormButton>
      </form>
    </section>
  );
};

export default MyPageForm;
