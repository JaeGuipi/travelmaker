import { toast, ToastPosition } from "react-hot-toast";

export function useToast() {
  const baseOptions = {
    duration: 1500,
    position: "top-center" as ToastPosition,
    style: {
      padding: "1.6rem",
      borderRadius: "0.8rem",
      marginTop: "8.5rem",
      fontSize: "2rem",
    },
  };

  const showSuccess = (msg: string) => {
    toast.dismiss();
    toast.success(msg, {
      ...baseOptions,
      style: {
        ...baseOptions.style,
        border: "1px solid #00ac07",
        padding: "1.6rem",
        color: "#00ac07",
      },
    });
  };

  const showError = (msg: string) => {
    toast.dismiss();
    toast.error(msg, {
      ...baseOptions,
      style: {
        ...baseOptions.style,
        border: "1px solid #ff472e",
        padding: "16px",
        color: "#ff472e",
      },
    });
  };

  const notify = (msg: string) => {
    toast.dismiss();
    toast(msg, {
      ...baseOptions,
      icon: "🔔",
      style: {
        border: "1px solid #f89a05",
        padding: "1.6rem",
        color: "#f89a05",
      },
    });
  };

  return { showError, showSuccess, notify };
}
