"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormValues, LoginSchema } from "@/schema/zodSchema";

import { useToast } from "@/hooks/useToast";
import toastMessages from "@/lib/toastMessage";

import AuthForm from "@/components/Auth/AuthForm/AuthForm";
import SocialLoginAndSignup from "./SocialLoginAndSignup/SocialLoginAndSignup";
import FormButton from "@/components/Button/FormButton";
import { login } from "@/actions/auth.action";
import { useRouter } from "next/navigation";
import CustomInput from "../Input/CustomInput";

const LoginForm = () => {
  const { showSuccess, showError } = useToast();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(LoginSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      await login(data);
      router.push("/");
      showSuccess(toastMessages.success.login);
    } catch (error) {
      console.error(error);
      showError(toastMessages.error.login);
    }
  };

  return (
    <section className="container">
      <AuthForm title="회원이 아니신가요?" link="signup" linkTitle="회원가입 하기">
        <form onSubmit={handleSubmit(onSubmit)}>
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

          <FormButton type="submit" size="large" disabled={!isValid}>
            로그인 하기
          </FormButton>
        </form>
      </AuthForm>
      <SocialLoginAndSignup type="login" />
    </section>
  );
};

export default LoginForm;
