//내 알림 리스트 조회
export type MyNotification = {
  id: number;
  teamId: string;
  userId: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
};

export interface MyNotifications {
  cursorId: number;
  notifications: MyNotification[];
  totalCount: number;
}
