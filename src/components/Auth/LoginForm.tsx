"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormValues, LoginSchema } from "@/schema/zodSchema";

import { loginUser } from "@/lib/api/auth";
// import { useAuth } from "@/hooks/useAuth";

import { useToast } from "@/hooks/useToast";
import toastMessages from "@/lib/toastMessage";

import AuthForm from "@/components/Auth/AuthForm/AuthForm";
import SocialLogin from "@/components/Auth/SocialLogin/SocialLogin";
import CustomInput from "@/components/Input/CustomInput";
import FormButton from "@/components/Button/FormButton";

const LoginForm = () => {
  const router = useRouter();
  // const { login, isPending, isError } = useAuth();
  const { showSuccess, showError } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(LoginSchema),
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      await loginUser(data);
      showSuccess(toastMessages.success.login);

      router.push("/");
    } catch (error) {
      console.error(error);
      showError(toastMessages.error.login);
    }
  };

  return (
    <section className="container">
      <AuthForm title="회원이 아니신가요?" link="/signup" linkTitle="로그인하기">
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
      <SocialLogin />
    </section>
  );
};

export default LoginForm;
