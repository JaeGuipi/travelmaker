"use client";

import { z } from "zod";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useToast } from "@/hooks/useToast";
import toastMessages from "@/lib/toastMessage";

import CustomInput from "@/components/Input/CustomInput";
import FormButton from "@/components/Button/FormButton";
import { getMyInfo, updateMyInfo, createProfileImageUrl } from "@/lib/api/user";
import { useRouter } from "next/navigation";

// 비밀번호 조건 정규표현식
const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$&*?!%])[A-Za-z\d!@$%&*?]{8,15}$/;

// 로그인 스키마 정의
export const MyPageSchema = z.object({
  nickname: z.string().min(1, { message: "닉네임을 입력해주세요." }),
  email: z.string().min(1, { message: "이메일을 입력해주세요." }).email({ message: "유효한 이메일을 입력해주세요." }),
  password: z
    .string()
    .min(8, { message: "비밀번호를 8자리 이상 입력해 주세요." })
    .max(15, { message: "비밀번호를 15자리 이하로 입력해 주세요." })
    .regex(passwordRegex, {
      message: "영문, 숫자, 특수문자(~!@#$%^&*)를 모두 조합해 주세요.",
    }),
});

export type MyPageFormValues = z.infer<typeof MyPageSchema>;

const MyPageForm = () => {
  const router = useRouter();
  const { showSuccess, showError } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<MyPageFormValues>({
    resolver: zodResolver(MyPageSchema),
    mode: "onChange",
    defaultValues: {
      nickname: "",
      email: "",
      password: "",
      // profileImageUrl: "",
      newPassword: "",
    },
  });

  const onSubmit = async (data: MyPageFormValues) => {
    try {
      await updateMyInfo(data);
      router.push("/");
      showSuccess(toastMessages.success.login);
    } catch (error) {
      console.error(error);
      showError(toastMessages.error.login);
    }
  };

  return (
    <section className="container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <CustomInput
          label="닉네임"
          id="nickname"
          type="nickname"
          placeholder="닉네임을 입력해 주세요"
          errors={errors.email?.message}
          {...register("nickname")}
        />
        <CustomInput
          label="이메일"
          id="email"
          type="email"
          placeholder="이메일을 입력해 주세요"
          errors={errors.email?.message}
          {...register("email")}
        />
        <CustomInput
          label="비밀번호"
          id="password"
          type="password"
          iconType="password"
          placeholder="비밀번호를 입력해 주세요"
          errors={errors.password?.message}
          {...register("password")}
        />
        <CustomInput
          label="비밀번호"
          id="newPassword"
          type="newPassword"
          iconType="password"
          placeholder="비밀번호를 입력해 주세요"
          errors={errors.newPassword?.message}
          {...register("newPassword")}
        />

        <FormButton type="submit" size="large" disabled={!isValid}>
          로그인 하기
        </FormButton>
      </form>
    </section>
  );
};

export default MyPageForm;
