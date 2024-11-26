//내 알림 리스트 조회
export type Notification = {
  id: number;
  teamId: string;
  userId: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
};

export interface GetMyNotifications {
  cursorId: number;
  notifications: Notification[];
  totalCount: number;
}
