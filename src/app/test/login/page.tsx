"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { loginUser } from "@/lib/api/auth";
// import { useAuth } from "@/hooks/useAuth";

// 비밀번호 조건 정규표현식
const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/;

// 로그인 스키마 정의
const LoginSchema = z.object({
  email: z.string().min(1, { message: "이메일을 입력해주세요." }).email({ message: "유효한 이메일을 입력해주세요." }),
  password: z
    .string()
    .min(8, { message: "비밀번호를 8자리 이상 입력해 주세요." })
    .max(15, { message: "비밀번호를 15자리 이하로 입력해 주세요." }),
});

type LoginFormValues = z.infer<typeof LoginSchema>;

const LoginPage = () => {
  const router = useRouter();
  // const { login, isPending, isError } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { isValid },
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
      await loginUser(data);
      router.push("/");
    } catch (error) {
      console.error("로그인에 실패하였습니다.", error);
    }
  };

  return (
    <section className="container">
      <div>
        {/* <h1>
          <Link href={"/"}>
            <Image src="/icons/logo.svg" width={210} height={38} alt="logo" />
          </Link>
        </h1> */}
        <p className="">
          회원이 아니신가요?
          <Link href={"/signup"} className="">
            회원 가입하기
          </Link>
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <input id="email" type="email" placeholder="test@test.com" {...register("email")} />
        <input id="password" type="password" placeholder="비밀번호를 입력해주세요." {...register("password")} />

        <button type="submit" disabled={false}>
          로그인
        </button>
      </form>
    </section>
  );
};

export default LoginPage;
