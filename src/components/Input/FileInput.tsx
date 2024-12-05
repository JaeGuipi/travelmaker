import { ChangeEventHandler } from "react";
import s from "./FileInput.module.scss";
import Image from "next/image";
import { GetMe } from "@/types/users/usersTypes";

interface FileInputProps {
  preview?: string;
  users: GetMe;
  handleImageChange?: ChangeEventHandler;
  readOnly?: boolean;
}

const FileInput = ({ users, preview, handleImageChange, readOnly }: FileInputProps) => {
  return (
    <section className={s.profileContainer}>
      <div className={s.profileImgWrap}>
        <div className={s.profileImgBox}>
          <Image src={preview ? preview : "/images/profile.png"} fill alt={users.nickname} />
        </div>

        <label htmlFor="profile-image-input" className={s.profileButton}>
          <Image src={"/icons/btn_pen.svg"} fill alt="프로필 이미지 수정" />
        </label>
        <input
          id="profile-image-input"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className={s.profileInput}
          disabled={readOnly}
        />
      </div>
    </section>
  );
};

export default FileInput;
