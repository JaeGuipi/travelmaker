import { ChangeEventHandler } from "react";
import Image from "next/image";
import s from "./BannerInput.module.scss";
import { FiPlus } from "react-icons/fi";
import { MdCancel } from "react-icons/md";

interface BannerInputProps {
  title: string;
  inputId: string;
  imagePreviews: string | string[];
  handleImageChange: ChangeEventHandler;
  handleImageRemove: (index: number) => void;
  maxImages?: number;
  isSingle?: boolean;
}

const BannerInput = ({
  title,
  inputId,
  imagePreviews,
  handleImageChange,
  handleImageRemove,
  maxImages = 4,
  isSingle = false,
}: BannerInputProps) => {
  const previews = isSingle
    ? imagePreviews
      ? [imagePreviews]
      : []
    : Array.isArray(imagePreviews)
    ? imagePreviews
    : [];

  return (
    <div className={s.bannerInputContainer}>
      <h4 className={s.titleLabel}>{title}</h4>
      <div className={s.bannerImgWrap}>
        <div className={s.bannerImgbox}>
          <label className={s.imagePreview} htmlFor={inputId}>
            <FiPlus />
            이미지 등록
          </label>
          <input
            id={inputId}
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className={s.imageUploadInput}
            multiple={!isSingle}
          />
        </div>
        {previews.map((preview, index) => (
          <div key={index} className={s.bannerPreviewWrap}>
            <div className={s.bannerPreview}>
              <Image src={typeof preview === "string" ? preview : ""} alt={`이미지 미리보기 ${index + 1}`} fill />
            </div>
            <button type="button" onClick={() => handleImageRemove(index)} className={s.removeButton}>
              <MdCancel />
            </button>
          </div>
        ))}
      </div>
      {!isSingle && previews.length >= maxImages && (
        <p className={s.errorText}>* 이미지는 최대 {maxImages}개까지 등록 가능합니다.</p>
      )}
    </div>
  );
};

export default BannerInput;

// const BannerInput = ({ bannerPreview, subImagePreviews, handleBannerImageChange, handleSubImageChange }) => {
//   return (
//     <section>
//       <h4 className={s.titleLabel}>배너 이미지</h4>
//       <div className={s.bannerImgWrap}>
//         <div className={s.bannerImgbox}>
//           <label className={s.imagePreview} htmlFor="bannerImageUrl">
//             <FiPlus />
//             이미지 등록
//           </label>
//           <input
//             id="bannerImageUrl"
//             type="file"
//             accept="image/*"
//             onChange={handleBannerImageChange}
//             className={s.imageUploadInput}
//           />
//         </div>
//         {bannerPreview && (
//           <div className={s.bannerPreview}>
//             <Image src={bannerPreview} alt="배너 이미지 미리보기" fill />
//           </div>
//         )}
//       </div>

//       <h4 className={s.titleLabel}>소개 이미지</h4>
//       <div className={s.bannerImgWrap}>
//         <div className={s.bannerImgbox}>
//           <label className={s.imagePreview} htmlFor="subImageUrls">
//             <FiPlus />
//             이미지 등록
//           </label>
//           <input
//             id="subImageUrls"
//             type="file"
//             accept="image/*"
//             onChange={handleSubImageChange}
//             className={s.imageUploadInput}
//           />
//         </div>
//         {subImagePreviews.map((preview, index) => (
//           <div key={index} className={s.bannerPreview}>
//             <Image src={preview} alt={`소개 이미지 미리보기 ${index + 1}`} fill />
//           </div>
//         ))}
//         {subImagePreviews.length > 4 && <p>* 이미지는 최대 4개까지 등록 가능합니다.</p>}
//       </div>
//     </section>
//   );
// };

// export default BannerInput;
