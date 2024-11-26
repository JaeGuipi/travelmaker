import s from "./Container.module.scss";
const Container = ({ children }: { children: React.ReactNode }) => {
  return <div className={s.container}>{children}</div>;
};

export default Container;
