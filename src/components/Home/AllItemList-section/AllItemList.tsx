import { GetActivities } from "@/app/types/activites/activitesTypes";
import React from "react";

const AllItemList: React.FC<GetActivities> = ({ activities }) => {
  return (
    <div>
      <div>
        <h3>🛼 마음에 드는 장소를 선택해보세요</h3>
      </div>
      <div className="container">상품리스트</div>
    </div>
  );
};

export default AllItemList;
