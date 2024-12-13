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

// 체험 등록, 수정
export const ActivityFormSchema = z.object({
  title: z.string().min(1, { message: "제목을 입력해주세요." }),
  category: z
    .string()
    .min(1, { message: "카테고리를 선택해주세요." })
    .refine((value) => value !== "카테고리", {
      message: "카테고리를 선택해주세요.",
    }),
  description: z.string().min(8, { message: "설명을 8자 이상 입력해주세요." }),
  price: z.number().min(1000, { message: "가격은 1000원 이상 입력해주세요." }),
  address: z.string().min(1, { message: "주소를 검색해주세요." }),
  schedules: z
    .array(
      z.object({
        date: z.string().min(1, { message: "날짜를 입력해주세요." }).optional(),
        startTime: z.string().min(1, { message: "시작 시간을 입력해주세요." }).optional(),
        endTime: z.string().min(1, { message: "종료 시간을 입력해주세요." }).optional(),
      }),
    )
    .optional()
    .default([]),
  bannerImageUrl: z
    .string()
    .url({ message: "유효한 URL을 입력해주세요." })
    .min(1, { message: "배너 사진을 선택해주세요." })
    .optional(),
  subImageUrls: z.array(z.string().url()).optional().default([]),
});
