import Image from "next/image";
import Link from "next/link";
import s from "./Footer.module.scss";

interface IconGroupProps {
  icons: { src: string; alt: string }[];
}

// 아이콘 그룹 컴포넌트
const IconGroup = ({ icons }: IconGroupProps) => {
  return (
    <ul className={s["ft-sns"]}>
      {icons.map((icon, index) => (
        <li key={index}>
          <Link href={icon.src}>
            <Image src={icon.src} alt={icon.alt} width="20" height="20" style={{ width: "20px", height: "20px" }} />
          </Link>
        </li>
      ))}
    </ul>
  );
};

const Footer = () => {
  const icons = [
    { src: "/icons/ft_facebook.svg", alt: "페이스북" },
    { src: "/icons/ft_twitter.svg", alt: "트위터" },
    { src: "/icons/ft_youtube.svg", alt: "유투브" },
    { src: "/icons/ft_instagram.svg", alt: "인스타그램" },
  ];

  return (
    <footer className={s.footer}>
      <div className="container">
        <div className={s["ft-inner"]}>
          <span>©codeit - 2025</span>
          <ul className={s["ft-info"]}>
            <li className="mr-8">Privacy Policy</li>
            <li>FAQ</li>
          </ul>
          <IconGroup icons={icons} />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
