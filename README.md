## ✈️ TRAVEL MAKER 체험 예약 플랫폼

  <img src="https://github.com/user-attachments/assets/ad4872bd-fee2-4fec-9b1a-4daf1fc2b98a"/>

- <a href="https://www.notion.so/FE_9-_-142d6d6479a88050b308ec0292c235df">FE 9기 4팀 프로젝트 노션</a>
- 배포 URL : https://travelmaker-ten.vercel.app/
- Test ID : test1234@email.com
- Test PW : test1234

<br />

## 📝 프로젝트 소개

- 사용자가 판매자와 체험자 모두 될 수 있는 플랫폼으로 판매자가 되어 체험을 만들수 있고, 체험자가 되어 체험을 예약할 수 있습니다.
- 검색을 통해 원하는 체험을 찾고, 상세 정보를 볼 수 있습니다.
- 캘린더 뷰 SDK와 지도 뷰 SDK를 활용해 예약 가능한 날짜를 설정하고, 체험 상품을 예약하는 플랫폼입니다.

<br />

## 📆 개발 기간

- 2024.11.21(목) ~ 2024.12.24(화)

<br />

## 💁‍♂️ 프로젝트 팀원
|Frontend|Frontend|Frontend|Frontend|
|:---:|:---:|:---:|:---:|
|![](https://github.com/JaeGuipi.png?size=120)|![](https://github.com/99minji.png?size=120)|![](https://github.com/hyemeeny.png?size=120)|![](https://github.com/.png?size=120)|
|👑[이재서](https://github.com/JaeGuipi)|[구민지](https://github.com/99minji)|[지혜민](https://github.com/hyemeeny)|[김진](https://github.com/jjeankim)|
|검색 페이지 <br/>예약 현황 페이지 <br/>middleware 구현 <br />간편 회원가입 기능 구현 <br/>fullcalendar 커스텀|메인 페이지<br /> 체험 상세 페이지<br /> 지도 SDK를 이용한 기능 구현 <br />fullcalendar 커스텀|로그인 페이지<br /> 내 정보 페이지<br /> 내 체험 등록 및 수정 페이지 <br /> 지도 SDK를 이용한 기능 구현<br />datepicker 커스텀|회원가입 페이지<br /> 예약 내역 페이지<br /> 내 체험 관리 페이지<br /> 알림 구현|

<br />

### 화면 구성

|회원가입|로그인|
|:---:|:---:|
|<img src="https://user-images.githubusercontent.com/80824750/208456048-acbf44a8-cd71-4132-b35a-500047adbe1c.gif" width="450"/>|<img src="https://user-images.githubusercontent.com/80824750/208456048-acbf44a8-cd71-4132-b35a-500047adbe1c.gif" width="450"/>|
|회원 가입 또는 간편 회원 가입으로 계정을 생성합니다.|로그인 또는 간편 로그인으로 로그인을 합니다.|

<br/>

|메인 페이지|체험 상세 페이지|
|:---:|:---:|
|<img src="https://user-images.githubusercontent.com/80824750/208456048-acbf44a8-cd71-4132-b35a-500047adbe1c.gif" width="450"/>|<img src="https://user-images.githubusercontent.com/80824750/208456048-acbf44a8-cd71-4132-b35a-500047adbe1c.gif" width="450"/>|
|사용자가 체험 상세 페이지로 이동하여 정보를 확인 할 수 있습니다.|체험 상세 설명과 예약 가능 날짜 및 시간을 캘린더로 확인 가능합니다. <br/> 지도로 위치 확인 가능합니다.<br/> 체험에 대한 후기 조회가 가능하며 후기는 체험을 완료한 사용자만 남길 수 있는 신뢰 기반 시스템입니다.|

<br/>

|검색 페이지|내 프로필|
|:---:|:---:|
|<img src="https://user-images.githubusercontent.com/80824750/208456048-acbf44a8-cd71-4132-b35a-500047adbe1c.gif" width="450"/>|<img src="https://user-images.githubusercontent.com/80824750/208456048-acbf44a8-cd71-4132-b35a-500047adbe1c.gif" width="450"/>|
|카테고리별 탐색 및 키워드 검색을 통해 원하는 체험을 쉽게 찾을 수 있습니다.|닉네임, 이메일, 비밀번호, 프로필 이미지를 변경할 수 있습니다.|

<br/>

|체험 관리 페이지|체험 등록 및 수정 페이지|
|:---:|:---:|
|<img src="https://user-images.githubusercontent.com/80824750/208456048-acbf44a8-cd71-4132-b35a-500047adbe1c.gif" width="300"/>|<img src="https://user-images.githubusercontent.com/80824750/208456048-acbf44a8-cd71-4132-b35a-500047adbe1c.gif" width="300"/>|
|판매자가 등록한 체험을 리스트로 관리하고 확인할 수 있습니다.| 판매자가 체험을 등록, 수정하고 예약 날짜, 시간 및 위치를 직접 설정할 수 있습니다.|

<br/>

|예약 내역 페이지|예약 현황 페이지|
|:---:|:---:|
|<img src="https://user-images.githubusercontent.com/80824750/208456048-acbf44a8-cd71-4132-b35a-500047adbe1c.gif" width="300"/>|<img src="https://user-images.githubusercontent.com/80824750/208456048-acbf44a8-cd71-4132-b35a-500047adbe1c.gif" width="300"/>|
|내 예약을 상태별로 확인 가능, 예약을 취소하거나 체험이 완료된 경우 후기를 작성할 수 있습니다.| 캘린더 기반 UI로 예약 상태를 한 눈에 확인 가능합니다.<br/>내 예약 상품들의 상태(예약 신청, 예약 승인, 예약 거절, 예약 완료, 체험 완료)에 따라 캘린더로 확인이 가능합니다.|

<br />

## ⚙ 기술 스택
### Frontend
<img src="https://img.shields.io/badge/next.js-000000?style=flat-square&logo=next.js&logoColor=white"/>
<img src="https://img.shields.io/badge/typescript-3178C6?style=flat-square&logo=typeScript&logoColor=white"/>
<img src="https://img.shields.io/badge/sass-CC6699?style=flat-square&logo=sass&logoColor=white"/>

### Tools
<img src="https://img.shields.io/badge/github-181717?style=flat-square&logo=github&logoColor=white"/> 
<img src="https://img.shields.io/badge/notion-000000?style=flat-square&logo=notion&logoColor=white"/>
