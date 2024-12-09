import ItemLayout from "@/components/ItemLayout/ItemLayout";
import Dropdown, { DropdownItem, DropdownMenu, DropdownToggle } from "@/components/Dropdown/Dropdown";
import s from "./MyActivitiItem.module.scss";
import { FaStar } from "react-icons/fa";
import { MyActivity } from "@/types/types";

const MyActivityItem = ({activity}: {activity: MyActivity}) => {
  const dropdownItems = [
    { key: 1, label: "수정하기" },
    { key: 2, label: "삭제하기" },
  ];
  return (
    <ItemLayout src={activity.bannerImageUrl} alt="체험 이미지">
      <div className={s["info"]}>
        <div className={s["rating-container"]}>
          <FaStar size={19} className={s["star"]} />
          <span className={s["rating"]}>{`${activity.rating} (${activity.reviewCount})`}</span>
          <p className={s["title"]}>{activity.title}</p>
        </div>
        <div className={s["kebab-container"]}>
          <p className={s["price"]}>
            {`₩${activity.price}`}<span className={s["per-head"]}>/인</span>
          </p>
          <div className={s["dropdown-container"]}>
            <Dropdown>
              <DropdownToggle variant="kebab"></DropdownToggle>
              <DropdownMenu>
                {dropdownItems.map(({ key, label }) => (
                  <DropdownItem key={key}>{label}</DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
      </div>
    </ItemLayout>
  );
};
export default MyActivityItem;
