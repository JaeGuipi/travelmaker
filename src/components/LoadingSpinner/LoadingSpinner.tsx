import Image from "next/image"
import s from "./LoadingSpinner.module.scss"

const LoadingSpinner = () => {
  return (
    <div className={s.loader}>
      <Image src="/gif/loading.gif" width={20} height={20} alt="Loading..." />
    </div>
  )
}

export default LoadingSpinner;