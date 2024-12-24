const toastMessages = {
  success: {
    login: "로그인에 성공하였습니다.",
    signup: "회원가입에 성공하였습니다.",
    editInfo: "내 프로필이 수정되었습니다.",
    reservation: "예약이 완료되었습니다.",
    activity: "등록이 완료되었습니다.",
    activityUpdate: "수정이 완료되었습니다.",
    review: "후기 작성이 완료되었습니다.",
    deleteActivity: "체험이 삭제되었습니다.",
    deleteNotification: "알림이 삭제되었습니다.",
  },
  error: {
    login: "로그인에 실패하였습니다.",
    signup: "회원가입에 실패하였습니다.",
    editInfo: "내 정보 수정에 실패하였습니다.",
    requestLogin: "로그인 후 이용해주세요.",
    activity: "등록에 실패하였습니다.",
    activityUpdate: "수정에 실패하였습니다.",
  },
  notify: {
    imageUpload: "이미지는 최대 4개까지 등록 가능합니다.",
    scheduleDate: "날짜를 선택해주세요.",
    scheduleTime: "시작 시간 ~ 종료 시간을 선택해주세요.",
    scheduleStartTime: "시작 시간은 종료 시간보다 이전이어야 합니다.",
    newSchedule: "겹치는 시간대가 있습니다. 다른 시간대를 선택해주세요.",
  },
};

export default toastMessages;
