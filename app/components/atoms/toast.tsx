import { X } from "lucide-react";
import { useEffect, useId } from "react";
import { createRoot } from "react-dom/client";
import "@/app/globals.css";

const Toast = ({
  message = "This is a toast message",
  type = "info", // 'success', 'error', 'warning', 'info'
  hideDuration, // Duration in milliseconds before auto-hide
  closeable = true,
  toastId,
}: {
  message?: string;
  type?: "success" | "error" | "warning" | "info";
  hideDuration?: number;
  closeable?: boolean;
  toastId?: string;
}) => {
  const id = useId();
  const toastClassName = "relative px-4 py-2 rounded shadow-lg text-white";
  const typeClassMap: Record<"success" | "error" | "warning" | "info", string> =
    {
      success: "bg-green-500",
      error: "bg-red-500",
      warning: "bg-yellow-500",
      info: "bg-blue-500",
    };
  const typeClassName = typeClassMap[type] || typeClassMap.info;

  useEffect(() => {
    if (!hideDuration) return;

    const timer = setTimeout(() => {
      const toastElement = document.getElementById(id);
      if (toastElement) {
        toastElement.classList.add("fade-out");
        setTimeout(() => {
          toastElement.remove();
          document.getElementById(toastId || "")?.remove();
        }, 500);
      }
    }, hideDuration);

    return () => clearTimeout(timer);
  }, [id, hideDuration, toastId]);
  console.log("Rendering Toast with message:", message, "and type:", type);
  const closeIconCls =
    "bg-white/15 backdrop-blur-[10px] border border-white/30 shadow-[0_8px_32px_0_rgba(31,38,135,0.2)] rounded-2xl p-1 text-white";
  return (
    <div className={`${toastClassName} ${typeClassName} slide-in`} id={id}>
      {closeable ? (
        <button
          className="absolute -top-1.5 -right-1.5 "
          onClick={() => {
            const toastElement = document.getElementById(id);
            if (toastElement) {
              toastElement.classList.add("fade-out");
              setTimeout(() => {
                toastElement.remove();
                document.getElementById(toastId || "")?.remove();
              }, 500);
            }
          }}
        >
          <X size={22} className={closeIconCls} />
        </button>
      ) : null}
      <p>{message}</p>
    </div>
  );
};

export default Toast;

export const showToast = (props: {
  message: string;
  type?: "success" | "error" | "warning" | "info";
  hideDuration?: number;
  closeable?: boolean;
}) => {
  const toastContainer = document.createElement("div");
  const toastId = `toast-${Date.now()}`;
  toastContainer.id = toastId;

  document.getElementById("toast-root")?.appendChild(toastContainer);

  console.log("Showing toast with props:", props);

  return createRoot(toastContainer).render(
    <Toast
      {...props}
      hideDuration={props.hideDuration || 3000}
      closeable={props.closeable !== false}
      toastId={toastId}
    />,
  );
};
