"use client";
import React, { useActionState } from "react";

const Form = ({
  initialState,
  reducerAction,
  children,
  formProps,
}: {
  initialState: Record<string, unknown>;
  reducerAction: (
    prevState: Record<string, unknown>,
    formData: { type: string; payload: string } | FormData,
  ) => Promise<Record<string, unknown>>;
  children:
    | React.ReactNode
    | ((props: {
        state: Record<string, unknown>;
        isPending: boolean;
        formAction: (
          formData: { type: string; payload: string } | FormData,
        ) => void;
      }) => React.ReactNode);
  formProps?: React.FormHTMLAttributes<HTMLFormElement> & Record<string, unknown>;
}) => {
  const [state, formAction, isPending] = useActionState(
    reducerAction,
    initialState,
  );
  return (
    <form action={formAction} className="flex flex-col gap-4" {...formProps}>
      {typeof children === "function"
        ? children({ state, isPending, formAction })
        : children}{" "}
    </form>
  );
};

export default Form;
