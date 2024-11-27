import { z } from "zod";

export const signUpSchema = z.object({
  email: z.string().email("잘못된 이메일입니다"),
  nickname: z.string().min(2,"2자 이상으로 입력해주세요"),
  password:z.string().min(8,"8자 이상 입력해주세요"),
  passwordConfirm: z.string().min(8,"8자 이상 입력해주세요")
}).refine((data) => data.password === data.passwordConfirm,{
  path:["passwordConfirm"],
  message: "비밀번호가 일치하지 않습니다."
})

export type signUpSchema = z.infer<typeof signUpSchema>