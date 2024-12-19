import { ChangeEventHandler } from "react";
import { GetMe } from "@/types/users/usersTypes";
import s from "./FileInput.module.scss";
import Image from "next/image";

interface FileInputProps {
  users: GetMe;
  preview?: string;
  handleImageChange?: ChangeEventHandler;
  readOnly?: boolean;
}

const FileInput = ({ users, preview, handleImageChange, readOnly }: FileInputProps) => {
  const profileImage = preview || users?.profileImageUrl || "/images/profile.png";

  return (
    <div className={s.profileContainer}>
      <div className={s.profileImgWrap}>
        <div className={s.profileImgBox}>
          {users && <Image src={profileImage} width={160} height={160} alt={users.nickname || "프로필 이미지"} />}
        </div>

        {!readOnly && (
          <label htmlFor="profile-image-input" className={s.profileButton}>
            <Image src="/icons/btn_pen.svg" fill alt="프로필 이미지 수정" />
          </label>
        )}

        <input
          id="profile-image-input"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className={s.profileInput}
          disabled={readOnly}
        />
      </div>
    </div>
  );
};

export default FileInput;
