import Link from "next/link";

const MyActivities = async () => {
  return (
    <>
      <Link href={"/my-activities/register-activity"}>등록하기</Link>
    </>
  );
};

export default MyActivities;
