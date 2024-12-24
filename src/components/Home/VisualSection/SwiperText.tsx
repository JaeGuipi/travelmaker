import s from "./SwiperText.module.scss";

interface SwiperText {
  title: string;
  subTitle: string;
  tag: string;
}

export default function SwiperText({ slideIndex }: { slideIndex: number }) {
  const texts: { [key: number]: SwiperText } = {
    0: {
      title: "트레블 메이커에서 즐기는",
      subTitle: "다양한 체험",
      tag: "",
    },
    1: {
      title: "당신의 여행 속",
      subTitle: "숨겨진 보물을 찾아보세요",
      tag: "",
    },
    2: {
      title: "어디 갈지 고민 될 땐",
      subTitle: "트레블 메이커와 함께",
      tag: "",
    },
  };

  const { title, subTitle, tag } = texts[slideIndex] || texts[0];

  return (
    <div className={s["visual-text"]}>
      <h2>
        {title}
        <br />
        {subTitle}
      </h2>
      <p>{tag}</p>
    </div>
  );
}
