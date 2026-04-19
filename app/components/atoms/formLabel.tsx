import React from "react";

const FormLabel = ({
  className = "",
  htmlFor = "",
  children,
  labelText = "",
}: {
  className?: string;
  htmlFor?: string;
  children?: React.ReactNode;
  labelText?: string;
}) => {
  const combinedClassName = `block text-sm font-medium ${className}`;
  return (
    <label className={combinedClassName} htmlFor={htmlFor}>
      {children ? children : labelText}
    </label>
  );
};

export default FormLabel;
