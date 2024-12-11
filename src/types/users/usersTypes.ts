//회원가입
export interface SignUp {
  email: string;
  nickname: string;
  password: string;
}

//내 정보 조회
export interface GetMe {
  id: number;
  email: string;
  nickname: string;
  profileImageUrl: string;
  createdAt: string;
  updatedAt: string;
}

//내 정보 수정
export interface PatchMe {
  nickname: string;
  profileImageUrl?: string | null;
  newPassword: string;
  newPasswordConfirm?: string;
}

//프로필 이미지 url 생성
export interface PostImage {
  file: File;
}

export interface PostImageResponse {
  profileImageUrl: string;
}
