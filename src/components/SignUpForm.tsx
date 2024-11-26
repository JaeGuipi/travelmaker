"use client";
import { useForm } from "react-hook-form";
import FormButton from "./Button/FormButton";
import CustomInput from "./input/CustomInput";
import s from "./SignUpForm.module.scss";
import classNames from "classnames/bind";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema } from "@/app/schema/zodSchema";
import { signUpUser } from "@/lib/api/user";

const cx = classNames.bind(s);

type FormValues = {
  email: string;
  nickname: string;
  password: string;
  passwordConfirm?: string;
};

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<FormValues>({
    resolver: zodResolver(signUpSchema),
    mode: "onChange",
  });
  const onSubmit = async (data: FormValues) => {
    await signUpUser({
      email: data.email,
      nickname: data.nickname,
      password: data.password,
    });
  };

  return (
    <div className={cx("form-container")}>
      <form onSubmit={handleSubmit(onSubmit)} className={cx("form")}>
        <CustomInput
          id="email"
          label="이메일"
          type="email"
          placeholder="이메일을 입력해 주세요"
          {...register("email")}
          error={errors.email?.message}
        />
        <CustomInput
          id="nickname"
          label="닉네임"
          type="text"
          placeholder="닉네임을 입력해 주세요"
          {...register("nickname")}
          error={errors.nickname?.message}
        />
        <CustomInput
          id="password"
          label="비밀번호"
          type="password"
          placeholder="8자 이상 입력해 주세요"
          {...register("password")}
          error={errors.password?.message}
        />
        <CustomInput
          id="password-confirm"
          label="비밀번호 확인"
          type="password"
          placeholder="비밀번호를 한번 더 입력해 주세요"
          {...register("passwordConfirm")}
          error={errors.passwordConfirm?.message}
        />
        <FormButton type="submit" size="large" variant="fillButton" disabled={isSubmitting || !isValid}>
          회원가입 하기
        </FormButton>
      </form>
    </div>
  );
};

export default SignUpForm;
