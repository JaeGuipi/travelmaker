import { notFound } from "next/navigation";
import ActivityForm from "@/components/Activity/ActivityForm/ActivityForm";
import API_URL from "@/constants/config";

const getActivityById = async (activityId: number) => {
  try {
    const response = await fetch(`${API_URL}/activities/${activityId}`, {
      headers: {
        "Content-Type": "application/json",
      },
      next: { tags: ["activity"] },
    });

    if (!response.ok) {
      return null;
    }

    return response.json();
  } catch (error) {
    console.error("체험 데이터 조회 중 오류 발생:", error);
    return null;
  }
};

const Editactivity = async ({ params }: { params: { activityId: number } }) => {
  const activities = await getActivityById(params.activityId);

  if (!activities) {
    notFound();
  }

  return <ActivityForm activities={activities} />;
};

export default Editactivity;
