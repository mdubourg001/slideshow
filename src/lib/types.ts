import React from "react";

export interface SlideshowProps {
  children?: React.ReactNode;
  className?: string;
}

export interface SlideProps {
  children?: React.ReactNode;
  className?: string;
  alignX?: Alignment;
  alignY?: Alignment;
}

export interface TextProps {
  children?: React.ReactNode;
  className?: string;
  size?: Size;
  alignX?: Alignment;
  alignY?: Alignment;
  absolute?: AbsolutePos;
}

export type Size = "title" | "subtitle" | "normal" | "small";

export type Alignment = "center" | "start" | "end";

export type AbsolutePos =
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right";

export interface Theme {
  defaultFontFamily: string;
  headingFontFamily: string;
  slidePadding: string;
  elementSpacing: string;
  titleFontSize: string;
  subtitleFontSize: string;
  normalFontSize: string;
  smallFontSize: string;
  headingTextSizes: Size[];
  boldTextSizes: Size[];
}
