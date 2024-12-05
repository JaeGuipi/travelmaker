const getStatusText = (status: string) => {
  switch (status) {
    case "pending":
      return "예약 완료";
    case "confirmed":
      return "예약 승인";
    case "declinde":
      return "예약 거절";
    case "canceled":
      return "예약 취소";
    case "completed":
      return "체험 완료";
    default:
      return "";
  }
};

export default getStatusText