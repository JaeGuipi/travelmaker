export type MyReservation = {
  id: number;
  teamId: string;
  userId: number;
  activity: MyActivity;
  scheduleId: number;
  status: string;
  reviewSubmitted: boolean;
  totalPrice: number;
  headCount: number;
  date: string;
  startTime: string;
  endTime: string;
  createdAt: string;
  updatedAt: string;
};

export type MyActivity = {
  bannerImageUrl: string;
  title: string;
  id: number;
};