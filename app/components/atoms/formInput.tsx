import React from "react";

interface InputProps {
  className?: string;
  type?: HTMLInputElement["type"];
  wrapperClassName?: string;
  [key: string]: unknown;
}

const Input = ({ className = "", type = "text", ...props }: InputProps) => {
  return <input type={type} className={`${className}`} {...props} />;
};
Input.displayName = "Input";

const withWrapper = <P extends object>(Component: React.ComponentType<P>) => {
  const WrappedComponent = (props: P & { wrapperClassName?: string }) => {
    const { wrapperClassName = "", ...restProps } = props;
    return (
      <div className={`input-wrapper ${wrapperClassName}`}>
        <Component {...(restProps as P)} />
      </div>
    );
  };
  WrappedComponent.displayName = `WithWrapper(${Component.displayName || Component.name || "Component"})`;
  return WrappedComponent;
};

const WrappedInput = withWrapper(Input);

export default WrappedInput;
