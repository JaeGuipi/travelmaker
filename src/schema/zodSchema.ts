import { z } from "zod";

// 비밀번호 조건 정규표현식
const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$&*?!%])[A-Za-z\d!@$%&*?]{8,15}$/;

// 로그인 스키마 정의
export const LoginSchema = z.object({
  email: z.string().min(1, { message: "이메일을 입력해주세요." }).email({ message: "유효한 이메일을 입력해주세요." }),
  password: z
    .string()
    .min(8, { message: "비밀번호를 8자리 이상 입력해 주세요." })
    .max(15, { message: "비밀번호를 15자리 이하로 입력해 주세요." })
    .regex(passwordRegex, {
      message: "영문, 숫자, 특수문자(~!@#$%^&*)를 모두 조합해 주세요.",
    }),
});

export type LoginFormValues = z.infer<typeof LoginSchema>;

export const signUpSchema = z
  .object({
    email: z.string().email("잘못된 이메일입니다"),
    nickname: z.string().min(2, "2자 이상으로 입력해주세요"),
    password: z.string().min(8, "8자 이상 입력해주세요"),
    passwordConfirm: z.string().min(8, "8자 이상 입력해주세요"),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    path: ["passwordConfirm"],
    message: "비밀번호가 일치하지 않습니다.",
  });

export type signUpSchema = z.infer<typeof signUpSchema>;
