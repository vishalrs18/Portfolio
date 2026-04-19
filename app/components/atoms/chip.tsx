import React from "react";

const Chip = ({
  icon: Icon,
  chipText,
  children,
  className,
}: {
  icon: React.ReactNode;
  chipText: string;
  children?: React.ReactNode;
  className?: string;
}) => {
  const clsName = className
    ? className
    : `flex items-center gap-2 text-sm text-[#ADAAAB] bg-[#201F21] rounded-3xl px-4 py-2 w-fit`;
  return (
    <div className={clsName}>
      {children ? (
        children
      ) : (
        <>
          <span>{Icon}</span>
          <p>{chipText}</p>
        </>
      )}
    </div>
  );
};

export default Chip;
