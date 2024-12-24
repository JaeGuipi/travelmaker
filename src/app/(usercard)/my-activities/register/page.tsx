import ActivityForm from "@/components/Activity/ActivityForm/ActivityForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "트래블 메이커 : 내 체험 등록하기",
};

const RegisterActivity = async () => {
  return <ActivityForm />;
};

export default RegisterActivity;
