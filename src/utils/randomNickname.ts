export function generateRandomNickname(): string {
  //랜덤 닉네임 형용사
  const adjectives = [
    "멋진",
    "대단한",
    "화려한",
    "용감한",
    "밝은",
    "귀여운",
    "사랑스러운",
    "똑똑한",
    "지혜로운",
    "활기찬",
    "열정적인",
    "유쾌한",
    "따뜻한",
    "강력한",
    "침착한",
    "상냥한",
    "친절한",
    "즐거운",
    "행복한",
    "놀라운",
    "신비로운",
    "환상적인",
    "믿음직한",
    "매력적인",
    "평화로운",
    "풍요로운",
    "아름다운",
    "멋들어진",
    "굳센",
    "단단한",
    "청량한",
    "달콤한",
    "유연한",
    "강한",
    "기쁜",
    "반짝이는",
    "빛나는",
    "순수한",
    "다정한",
    "편안한",
    "고운",
    "깔끔한",
    "씩씩한",
    "참신한",
    "다채로운",
    "흥미로운",
    "재미있는",
    "독특한",
    "신나는",
    "용맹한",
    "선명한",
    "잔잔한",
    "활달한",
    "풍성한",
    "열렬한",
    "기막힌",
    "쾌활한",
    "겸손한",
    "웃음이 나는",
    "센스 있는",
    "독창적인",
    "우아한",
    "고요한",
    "미소 짓는",
    "고귀한",
    "유쾌한",
    "놀라운",
    "즐거운",
    "편안한",
    "영리한",
    "배려 깊은",
    "독보적인",
    "소중한",
    "풍요로운",
    "충실한",
    "아늑한",
    "건강한",
    "정직한",
    "격렬한",
    "섬세한",
    "차분한",
    "웅장한",
    "존경받는",
    "희망찬",
    "빛바랜 듯 아름다운",
    "푸르른",
    "단아한",
    "산뜻한",
    "청초한",
    "포근한",
    "믿음직한",
    "창의적인",
    "신선한",
    "애교 많은",
    "활력 넘치는",
    "결단력 있는",
    "성실한",
    "풍요로운",
    "지적인",
    "용기 있는",
  ];
  //랜덤 닉네임 명사
  const nouns = [
    "호랑이",
    "사자",
    "여우",
    "늑대",
    "곰",
    "토끼",
    "원숭이",
    "코끼리",
    "고양이",
    "강아지",
    "다람쥐",
    "독수리",
    "참새",
    "비둘기",
    "나비",
    "꿀벌",
    "개구리",
    "거북이",
    "판다",
    "수달",
    "고래",
    "상어",
    "돌고래",
    "악어",
    "올빼미",
    "부엉이",
    "도마뱀",
    "용",
    "말",
    "소",
    "양",
    "염소",
    "닭",
    "공작",
    "오리",
    "펭귄",
    "물개",
    "해달",
    "늑대",
    "불곰",
    "여왕",
    "왕",
    "기사",
    "선장",
    "마법사",
    "도적",
    "사냥꾼",
    "용사",
    "요정",
    "유령",
    "별",
    "달",
    "태양",
    "구름",
    "바람",
    "폭풍",
    "번개",
    "무지개",
    "산",
    "바다",
    "숲",
    "강",
    "호수",
    "섬",
    "모래",
    "사막",
    "초원",
    "언덕",
    "돌",
    "나무",
    "꽃",
    "열매",
    "잎사귀",
    "씨앗",
    "눈",
    "얼음",
    "불꽃",
    "화산",
    "비",
    "바람",
    "파도",
    "소나기",
    "봄",
    "여름",
    "가을",
    "겨울",
    "별똥별",
    "은하수",
    "행성",
    "우주",
    "탐험가",
    "발명가",
    "디자이너",
    "모험가",
    "꿈쟁이",
    "창조자",
    "예술가",
    "연구원",
    "도전자",
    "발견자",
  ];
  const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];

  return `${randomAdjective}${randomNoun}${Math.floor(Math.random() * 1000)}`; //랜덤 닉네임 뒤에 숫자 붙임
}