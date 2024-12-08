import { z } from "zod";

// 비밀번호 조건 정규표현식
// const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$&*?!%])[A-Za-z\d!@$%&*?]{8,15}$/;

export type LoginFormValues = z.infer<typeof LoginSchema>;
export type signUpSchema = z.infer<typeof signUpSchema>;
export type MyPageFormValues = z.infer<typeof MyPageSchema>;

// 로그인
export const LoginSchema = z.object({
  email: z.string().min(1, { message: "이메일을 입력해주세요." }).email({ message: "유효한 이메일을 입력해주세요." }),
  password: z.string().min(8, "8자 이상 입력해주세요."),
});

// 회원가입
export const signUpSchema = z
  .object({
    email: z.string().email("잘못된 이메일입니다."),
    nickname: z.string().min(2, "2자 이상으로 입력해주세요."),
    password: z.string().min(8, "8자 이상 입력해주세요."),
    passwordConfirm: z.string().min(8, "8자 이상 입력해주세요."),
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
    newPassword: z.string().min(8, "8자 이상 입력해주세요."),
    newPasswordConfirm: z.string().min(8, "8자 이상 입력해주세요."),
  })
  .refine((data) => data.newPassword === data.newPasswordConfirm, {
    path: ["newPasswordConfirm"],
    message: "비밀번호가 일치하지 않습니다.",
  });
