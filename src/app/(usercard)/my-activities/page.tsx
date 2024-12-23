import MyActivityList from "./MyActivityList/MyActivityList";
import API_URL from "@/constants/config";
import { Activity } from "@/types/activites/activitesTypes";
import { customFetch } from "@/utils/customFetch";

const MyActivities = async () => {
  const response = await customFetch(`${API_URL}/my-activities?size=6`);
  if (!response.ok) {
    console.error("내 체험 데이터를 불러오는 데 실패했습니다.");
  }

  const myActivity = await response.json();
  const cursorId = myActivity.cursorId;
  const myActivityList: Activity[] = myActivity.activities;

  return <MyActivityList initialActivityList={myActivityList} cursorId={cursorId}></MyActivityList>;
};

export default MyActivities;
