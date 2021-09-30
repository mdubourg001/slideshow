import { useContext } from "react";
import cs from "classnames";

import { SlideshowProps, SlideProps, TextProps } from "./types";
import { ThemeContext } from "./ThemeContext";

import "./slideshow.css";

export function Slideshow({ children, className }: SlideshowProps) {
  const theme = useContext(ThemeContext);

  return (
    <section
      className={cs("fixed inset-0 w-screen h-screen", className)}
      style={{ fontFamily: theme.defaultFontFamily }}
    >
      {children}
    </section>
  );
}

export function Slide({ children, className, alignX, alignY }: SlideProps) {
  const theme = useContext(ThemeContext);

  return (
    <div className={cs("absolute inset-0 w-full h-full", theme.slidePadding)}>
      <div
        className={cs(
          "relative flex flex-col w-full h-full",
          {
            "justify-start": alignY === "start",
            "justify-center": alignY === "center",
            "justify-end": alignY === "end",
            "items-start": alignX === "start",
            "items-center": alignX === "center",
            "items-end": alignX === "end",
          },
          className
        )}
      >
        {children}
      </div>
    </div>
  );
}

export function Text({
  children,
  className,
  size = "normal",
  alignX,
  alignY,
  absolute,
}: TextProps) {
  const theme = useContext(ThemeContext);

  const Tag = {
    title: "h1",
    subtitle: "h2",
    normal: "p",
    small: "small",
  }[size] as keyof JSX.IntrinsicElements;

  const isHeading = theme.headingTextSizes.includes(size);
  const fontFamilyProp = Object.assign(
    {},
    isHeading ? { style: { fontFamily: theme.headingFontFamily } } : undefined
  );

  return (
    <Tag
      className={cs(
        {
          // size
          "font-bold": theme.boldTextSizes.includes(size),
          [theme.titleFontSize]: size === "title",
          [theme.subtitleFontSize]: size === "subtitle",
          [theme.normalFontSize]: size === "normal",
          [theme.smallFontSize]: size === "small",
          // alignment
          "mx-auto": alignX === "center",
          "ml-auto": alignX === "end",
          "mr-auto": alignX === "start",
          "my-auto": alignY === "center",
          "mt-auto": alignY === "end",
          "mb-auto": alignY === "start",
          // absolute
          absolute: absolute,
          "top-0 left-0": absolute === "top-left",
          "top-0 right-0": absolute === "top-right",
          "bottom-0 left-0": absolute === "bottom-left",
          "bottom-0 right-0": absolute === "bottom-right",
          // spacing
          [theme.elementSpacing]: !absolute,
        },
        className
      )}
      {...fontFamilyProp}
    >
      {children}
    </Tag>
  );
}

export { ThemeContext } from "./ThemeContext";
export { DEFAULT_THEME as defaultTheme } from "./const";
