import { useContext, useEffect, useCallback } from "react";
import useSessionstorage from "@rooks/use-sessionstorage";
import cs from "classnames";

import { SlideshowProps, SlideProps, TextProps, ImageProps } from "./types";
import { ThemeContext } from "./ThemeContext";

import "./slideshow.css";

export function Slideshow({ id, children, className }: SlideshowProps) {
  const theme = useContext(ThemeContext);

  const [slide, setSlide] = useSessionstorage(id, 0);

  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === "ArrowLeft" && slide > 0) {
        setSlide(slide - 1);
      } else if (
        event.key === "ArrowRight" &&
        Array.isArray(children) &&
        slide < children?.length - 1
      ) {
        setSlide(slide + 1);
      }
    },
    [slide, children]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <section
      className={cs("fixed inset-0 w-screen h-screen", className)}
      style={{ fontFamily: theme.defaultFontFamily }}
    >
      {Array.isArray(children) ? children[slide] : children}
    </section>
  );
}

export function Slide({
  children,
  className,
  alignX,
  alignY,
  bgColor,
}: SlideProps) {
  const theme = useContext(ThemeContext);

  return (
    <div
      className={cs(
        "absolute inset-0 w-full h-full",
        theme.slidePadding,
        bgColor ?? theme.slideBgColor
      )}
    >
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

export function Image({
  className,
  src,
  absolute,
  alignX,
  alignY,
  width,
  height,
  inBackground,
}: ImageProps) {
  const theme = useContext(ThemeContext);

  return (
    <img
      src={src}
      className={cs(
        !inBackground && width,
        !inBackground && height,
        {
          "slideshow__image--in-background fixed inset-0 w-full h-full": inBackground,
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
    />
  );
}

export { ThemeContext } from "./ThemeContext";
export { DEFAULT_THEME as defaultTheme } from "./const";
