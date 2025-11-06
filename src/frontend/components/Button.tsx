import { type PropsWithChildren } from "react";
import clsx from "clsx";

type Variant = "red" | "blue" | "gray";

interface IButton {
  variant: Variant;
  flex: number;
}

function Button({ variant, flex, children }: PropsWithChildren<IButton>) {
  return (
    <button
      className={clsx(
        "rounded-4xl",
        {
          "bg-blue-500": variant === "blue",
          "bg-red-500": variant === "red",
          "bg-gray-500": variant === "gray",
        },
        `flex-${flex}`,
        "hover:opacity-85",
        "active:opacity-50",
        "cursor-pointer"
      )}
    >
      {children}
    </button>
  );
}

export default Button;
