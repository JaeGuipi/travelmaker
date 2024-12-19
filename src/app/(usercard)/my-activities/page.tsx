import MyActivityList from "./MyActivityList/MyActivityList";
import { cookies } from "next/headers";
import API_URL from "@/constants/config";
import { Activity } from "@/types/activites/activitesTypes";
import { redirect } from "next/navigation";

const MyActivities = async () => {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) redirect("/login");
  
  const response = await fetch(`${API_URL}/my-activities?size=6`, {
    headers: {
      Authorization: `Barer ${accessToken}`,
    },
  });
  if (!response.ok) {
    console.error("내 체험 데이터를 불러오는 데 실패했습니다.");
  }

  const myActivity = await response.json();
  const cursorId = myActivity.cursorId;
  const myActivityList: Activity[] = myActivity.activities;

  return (
    <>
      <MyActivityList initialActivityList={myActivityList} cursorId={cursorId}></MyActivityList>
    </>
  );
};

export default MyActivities;
