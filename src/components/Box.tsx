import cs from "classnames";
import { ReactNode } from "react";
import { Text } from "../lib";

export interface BoxProps {
  className?: string;
  children?: ReactNode;
  title?: string;
  color: string;
  width?: string;
  height?: string;
  noPadding?: boolean;
}

export function Box({
  className,
  title,
  color,
  width,
  height,
  noPadding,
  children,
}: BoxProps) {
  return (
    <div
      className={cs(
        "relative border-4 rounded-lg",
        color === "black" ? "border-black" : `border-${color}-600`,
        { "pt-10": !!title && !noPadding, "p-3": !noPadding },
        width,
        height,
        className
      )}
    >
      {title && (
        <Text
          className={cs(
            "absolute px-3 rounded border-4 z-10",
            color === "black"
              ? "border-black bg-gray-300"
              : `bg-${color}-300 border-${color}-600`
          )}
          style={{ top: "-16px", left: "10px" }}
          size="small"
        >
          {title}
        </Text>
      )}

      {children}
    </div>
  );
}
