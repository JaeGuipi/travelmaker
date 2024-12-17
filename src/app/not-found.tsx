import Link from "next/link";
import { TbNotesOff } from "react-icons/tb";

const NotFound = () => {
  return (
    <div className="error-page-content">
      <div className="error-page-title-container">
        <TbNotesOff size={180} className="error-page-icon"/>
        <div className="error-page-title">페이지가 없거나 접근할 수 없어요</div>
        <div className="error-page-title-description">입력한 주소가 맞는지 다시 확인 해주세요</div>
        <Link href="/" className="move-to-home">
          홈으로 이동
        </Link>
      </div>
    </div>
  );
}

export default NotFound;