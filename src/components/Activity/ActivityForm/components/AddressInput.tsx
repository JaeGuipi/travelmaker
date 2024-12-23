import { Control, Controller } from "react-hook-form";
import { useDaumPostcodePopup } from "react-daum-postcode";
import { PostActivity } from "@/types/activites/activitesTypes";
import s from "./AddressInput.module.scss";
import CustomInput from "@/components/Input/CustomInput";

interface AddressInputProps {
  control: Control<PostActivity>;
  errors?: string;
}

interface AddressData {
  address: string;
  zonecode: string;
  bname: string;
  buildingName: string;
  addressType: "J" | "R";
}

const AddressInput = ({ control, errors }: AddressInputProps) => {
  const scriptUrl = "https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
  const open = useDaumPostcodePopup(scriptUrl);

  const handleComplete = (data: AddressData, onChange: (value: string) => void) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress += extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }

    onChange(fullAddress);
  };

  const handleClick = (onChange: (value: string) => void) => {
    open({
      onComplete: (data) => handleComplete(data, onChange),
    });
  };

  return (
    <Controller
      name="address"
      control={control}
      render={({ field: { onChange, value } }) => (
        <div className={s.addressInputContainer}>
          <label className={s.titleLabel}>
            주소 <span className={s.required}>*</span>
          </label>
          <div className={s.addressInputWrap}>
            <div className={s.customInput}>
              <CustomInput
                id="address"
                type="text"
                value={value || ""}
                onChange={(e) => onChange((e.target as HTMLInputElement).value)}
                readOnly
                placeholder="주소를 검색하세요"
              />
            </div>
            <button type="button" onClick={() => handleClick(onChange)} className={s.searchButton}>
              주소 검색
            </button>
          </div>
          {errors && <span className={s.errorText}>{errors}</span>}
        </div>
      )}
    />
  );
};

export default AddressInput;
