"use client";
import { useForm } from "react-hook-form";
import FormButton from "../Button/FormButton";
import CustomInput from "../input/CustomInput";
import s from "./SignUpForm.module.scss";
import classNames from "classnames/bind";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema } from "@/app/schema/zodSchema";
import { signUpUser } from "@/lib/api/user";
import FormLink from "../formLink/FormLink";
import SocialLogin from "../socialLogin/socialLogin";
import Image from "next/image";

const cx = classNames.bind(s);

// type FormValues = {
//   email: string;
//   nickname: string;
//   password: string;
//   passwordConfirm?: string;
// };

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<signUpSchema>({
    resolver: zodResolver(signUpSchema),
    mode: "onSubmit",
  });
  const onSubmit = async (data: signUpSchema) => {
    await signUpUser({
      email: data.email,
      nickname: data.nickname,
      password: data.password,
    });
  };

  return (
    <div className={cx("form-container")}>
      <h2 className={cx("logo")}>
        <Image src="/images/logo.png" width={400} height={300} alt="travel-maker" />
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className={cx("form")}>
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
          placeholder="8자 이상 입력해 주세요"
          {...register("password")}
          errors={errors.password?.message}
        />
        <CustomInput
          id="password-confirm"
          label="비밀번호 확인"
          type="password"
          placeholder="비밀번호를 한번 더 입력해 주세요"
          {...register("passwordConfirm")}
          errors={errors.passwordConfirm?.message}
        />
        <FormButton type="submit" size="large" variant="fillButton" disabled={isSubmitting || !isValid}>
          회원가입 하기
        </FormButton>
      </form>
      <FormLink title="회원이신가요?" link="/login">
        로그인하기
      </FormLink>
      <SocialLogin />
    </div>
  );
};

export default SignUpForm;
