import { ReactNode } from "react";

export const CustomButton = ({
  children = null,
  text = "",
  className = "",
  type = "button",
  onClick,
  disabled = false,
}: {
  text?: string;
  children?: ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  disabled?: boolean;
}) => {
  const buttonClassName = className ? className : `btn-primary`;
  return (
    <button
      type={type}
      {...(onClick ? { onClick } : {})}
      disabled={disabled}
      className={buttonClassName}
    >
      {children ? children : text}
    </button>
  );
};
