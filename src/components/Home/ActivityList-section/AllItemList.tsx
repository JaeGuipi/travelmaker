import { GetActivities } from "@/types/activites/activitesTypes";
import React from "react";

const AllItemList: React.FC<GetActivities> = ({ activities = [], totalCount }) => {
  console.log(totalCount);
  return (
    <ul>
      {activities.map((activity) => (
        <li key={activity.id}>{activity.title}</li>
      ))}
    </ul>
  );
};

export default AllItemList;
