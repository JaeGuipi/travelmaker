import s from "./SwiperText.module.scss";

interface SwiperText {
  title1: string;
  title2: string;
  subTitle: string;
}

export default function SwiperText({ slideIndex }: { slideIndex: number }) {
  const texts: { [key: number]: SwiperText } = {
    0: {
      title1: "트레블 메이커에서 즐기는",
      title2: "다양한 체험",
      subTitle: "1월의 인기 체험 BEST 🔥",
    },
    1: {
      title1: "당신의 여행 속",
      title2: `숨겨진 보물을
      찾아보세요`,
      subTitle: "1월의 인기 체험 BEST 🔥",
    },
    2: {
      title1: "어디 갈지 고민 될 땐",
      title2: "트레블 메이커와 함께",
      subTitle: "1월의 인기 체험 BEST 🔥",
    },
  };

  const { title1, title2, subTitle } = texts[slideIndex] || texts[0];

  return (
    <div className={s["visual-text"]}>
      <h2>
        {title1}
        <br />
        {title2}
      </h2>
      <p>{subTitle}</p>
    </div>
  );
}
