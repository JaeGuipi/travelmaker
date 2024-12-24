"use client";
import { useForm } from "react-hook-form";
import FormButton from "@/components/Button/FormButton";
import CustomInput from "@/components/Input/CustomInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema } from "@/schema/zodSchema";
import { signUpUser } from "@/actions/auth.action";
import SocialLoginAndSignup from "@/components/Auth/SocialLoginAndSignup/SocialLoginAndSignup";
import { useToast } from "@/hooks/useToast";
import { useRouter } from "next/navigation";
import AuthForm from "@/components/Auth/AuthForm/AuthForm";
import toastMessages from "@/lib/toastMessage";
import { Suspense } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "트래블 메이커 : 회원가입",
};

type FormValues = {
  email: string;
  nickname: string;
  password: string;
  passwordConfirm?: string;
};

const SignUp = () => {
  const route = useRouter();
  const { showSuccess, showError } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<signUpSchema>({
    resolver: zodResolver(signUpSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: FormValues) => {
    try {
      await signUpUser({
        email: data.email,
        nickname: data.nickname,
        password: data.password,
      });
      showSuccess(toastMessages.success.signup);
      route.push("/login");
    } catch (error) {
      console.error(error);
      showError(toastMessages.error.signup);
    }
  };
  return (
    <section className="container">
      <AuthForm title="회원이신가요?" link="login" linkTitle="로그인하기">
        <form onSubmit={handleSubmit(onSubmit)}>
          <CustomInput
            id="email"
            label="이메일"
            type="email"
            placeholder="이메일을 입력해 주세요"
            {...register("email")}
            errors={errors.email?.message}
          />
          <CustomInput
            id="nickname"
            label="닉네임"
            type="text"
            placeholder="닉네임을 입력해 주세요"
            {...register("nickname")}
            errors={errors.nickname?.message}
          />
          <CustomInput
            id="password"
            label="비밀번호"
            type="password"
            iconType="password"
            placeholder="8자 이상 입력해 주세요"
            {...register("password")}
            errors={errors.password?.message}
          />
          <CustomInput
            id="password-confirm"
            label="비밀번호 확인"
            type="password"
            iconType="password"
            placeholder="비밀번호를 한번 더 입력해 주세요"
            {...register("passwordConfirm")}
            errors={errors.passwordConfirm?.message}
          />
          <FormButton type="submit" size="large" variant="fillButton" disabled={isSubmitting || !isValid}>
            회원가입 하기
          </FormButton>
        </form>
      </AuthForm>
      <Suspense>
        <SocialLoginAndSignup type="signup" />
      </Suspense>
    </section>
  );
};

export default SignUp;
