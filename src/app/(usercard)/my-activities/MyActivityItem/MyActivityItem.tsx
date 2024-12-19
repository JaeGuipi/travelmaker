import ItemLayout from "@/app/(usercard)/my-reservation/ItemLayout/ItemLayout";
import Dropdown, { DropdownItem, DropdownMenu, DropdownToggle } from "@/components/Dropdown/Dropdown";
import s from "./MyActivitiItem.module.scss";
import { FaStar } from "react-icons/fa";
import { Activity } from "@/types/activites/activitesTypes";
import { useRouter } from "next/navigation";
import Link from "next/link";

const MyActivityItem = ({ activity, onDelete }: { activity: Activity; onDelete: () => void }) => {
  const router = useRouter();
  const dropdownItems = [
    { key: 1, label: "수정하기" },
    { key: 2, label: "삭제하기" },
  ];

  const handleDropdownClick = (label: string) => {
    if (label === "수정하기") {
      router.push(`/my-activities/${activity.id}`);
    } else if (label === "삭제하기") {
      onDelete();
    }
  };
  return (
    <div className={s.item}>
      <Link href={`/activities/${activity.id}`}>
        <ItemLayout src={activity.bannerImageUrl} alt="체험 이미지">
          <div className={s["info"]}>
            <div className={s["rating-container"]}>
              <div className={s["rating-box"]}>
                <FaStar size={19} className={s["star"]} />
                <span className={s["rating"]}>{`${activity.rating} (${activity.reviewCount})`}</span>
              </div>
              <p className={s["title"]}>{activity.title}</p>
            </div>
            <div className={s["price-container"]}>
              <p className={s["price"]}>
                {`₩${activity.price.toLocaleString()}`}
                <span className={s["per-head"]}>/인</span>
              </p>
            </div>
          </div>
        </ItemLayout>
      </Link>
      <div className={s["dropdown-container"]}>
        <Dropdown>
          <DropdownToggle variant="kebab"></DropdownToggle>
          <DropdownMenu>
            {dropdownItems.map(({ key, label }) => (
              <DropdownItem key={key} onClick={() => handleDropdownClick(label)}>
                {label}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
      </div>
    </div>
  );
};
export default MyActivityItem;
