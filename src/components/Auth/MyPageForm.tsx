"use client";

import { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import s from "./MyPageForm.module.scss";

import { useToast } from "@/hooks/useToast";
import toastMessages from "@/lib/toastMessage";

import { GetMe } from "@/types/users/usersTypes";
import { MyPageFormValues, MyPageSchema } from "@/schema/zodSchema";
import { updateUsers, uploadProfileImage } from "@/actions/auth.action";

import FileInput from "@/components/Input/FileInput";
import CustomInput from "@/components/Input/CustomInput";
import FormButton from "@/components/Button/FormButton";
import UserTabList from "@/components/UserTab/UserTabList";

const MyPageForm = ({ users }: { users: GetMe }) => {
  const { showSuccess, showError } = useToast();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState(users.profileImageUrl);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<MyPageFormValues>({
    resolver: zodResolver(MyPageSchema),
    mode: "onChange",
    defaultValues: {
      nickname: users.nickname,
      profileImageUrl: users.profileImageUrl || null,
      newPassword: "",
    },
  });

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);

    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const onSubmit = async (data: MyPageFormValues) => {
    try {
      let profileImageUrl = preview;

      if (selectedFile) {
        const formData = new FormData();
        formData.append("image", selectedFile);

        profileImageUrl = await uploadProfileImage(formData);
      }

      const updatedData = {
        nickname: data.nickname,
        profileImageUrl: profileImageUrl || null,
        newPassword: data.newPassword || undefined,
      };

      await updateUsers(updatedData);
      showSuccess(toastMessages.success.editInfo);
    } catch (error) {
      console.error(error);
      showError(toastMessages.error.editInfo);
    }
  };

  return (
    <div className={s.mypageContainer}>
      <div className={s.userTabContainer}>
        <FileInput users={users} preview={preview} handleImageChange={handleImageChange} />
        <UserTabList />
      </div>

      <div className={s.mypageFormContainer}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={s.mypageHeader}>
            <h2>내 정보</h2>
            <FormButton type="submit" disabled={!isValid}>
              저장하기
            </FormButton>
          </div>

          <CustomInput
            label="닉네임"
            id="nickname"
            type="text"
            placeholder="닉네임을 입력해 주세요"
            errors={errors.nickname?.message}
            {...register("nickname")}
          />
          <CustomInput label="이메일" id="email" type="email" value={users.email} readOnly />
          <CustomInput
            label="비밀번호"
            id="newPassword"
            type="password"
            iconType="password"
            placeholder="비밀번호를 입력해 주세요"
            errors={errors.newPassword?.message}
            {...register("newPassword")}
          />
          <CustomInput
            label="비밀번호 재입력"
            id="newPasswordConfirm"
            type="password"
            iconType="password"
            placeholder="비밀번호를 한번 더 입력해 주세요"
            errors={errors.newPasswordConfirm?.message}
            {...register("newPasswordConfirm")}
          />
        </form>
      </div>
    </div>
  );
};

export default MyPageForm;
