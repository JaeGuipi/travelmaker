import { z } from "zod";

// 비밀번호 조건 정규표현식
const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d]{8,15}$/;

// 비밀번호 스키마
export const PasswordSchema = z
  .string()
  .min(8, { message: "비밀번호를 8자리 이상 입력해 주세요." })
  .max(15, { message: "비밀번호를 15자리 이하로 입력해 주세요." })
  .regex(passwordRegex, "영문, 숫자를 모두 포함해 주세요.");

export type LoginFormValues = z.infer<typeof LoginSchema>;
export type signUpSchema = z.infer<typeof signUpSchema>;
export type MyPageFormValues = z.infer<typeof MyPageSchema>;

// 로그인
export const LoginSchema = z.object({
  email: z.string().min(1, { message: "이메일을 입력해주세요." }).email({ message: "유효한 이메일을 입력해주세요." }),
  password: PasswordSchema,
});

// 회원가입
export const signUpSchema = z
  .object({
    email: z.string().email("잘못된 이메일입니다."),
    nickname: z.string().min(2, "2자 이상으로 입력해주세요."),
    password: PasswordSchema,
    passwordConfirm: PasswordSchema,
  })
  .refine((data) => data.password === data.passwordConfirm, {
    path: ["passwordConfirm"],
    message: "비밀번호가 일치하지 않습니다.",
  });

// 마이페이지
export const MyPageSchema = z
  .object({
    nickname: z.string().min(1, { message: "닉네임을 입력해주세요." }),
    profileImageUrl: z.string().url().nullable().optional(),
    newPassword: PasswordSchema,
    newPasswordConfirm: PasswordSchema,
  })
  .refine((data) => data.newPassword === data.newPasswordConfirm, {
    path: ["newPasswordConfirm"],
    message: "비밀번호가 일치하지 않습니다.",
  });
