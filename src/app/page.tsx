import s from "./page.module.scss";

export default function Home() {
  return (
    <div className={s.page}>
      HOME 페이지
      <p className={s.p}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur tenetur odio quis commodi perspiciatis, autem
        vel, eveniet consequuntur sint ea fuga, officia facilis illo dolorum expedita eaque iusto repellat blanditiis?
      </p>
    </div>
  );
}
