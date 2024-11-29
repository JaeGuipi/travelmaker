import MyPageForm from "@/components/Auth/MyPageForm";
import { getMyInfo } from "@/lib/api/user";

const MyPage = async () => {
  const user = await getMyInfo();

  return <MyPageForm user={user} />;
};

export default MyPage;
