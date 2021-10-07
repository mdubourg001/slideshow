import React from "react";

interface Alignable {
  alignX?: Alignment;
  alignY?: Alignment;
}

interface Positionable {
  absolute?: AbsolutePos;
}
export interface SlideshowProps {
  id: string;
  children?: React.ReactNode;
  className?: string;
}

export interface NotesProps {
  children: string;
}

export type SlideProps = Alignable & {
  children?: React.ReactNode;
  className?: string;
  bgColor?: string;
};

export type TextProps = Alignable &
  Positionable & {
    children?: React.ReactNode;
    className?: string;
    size?: Size;
    textColor?: string;
  };

export type ImageProps = Alignable &
  Positionable & {
    className?: string;
    src: string;
    width?: string;
    height?: string;
    inBackground?: boolean;
  };

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
  textColor: string;
  slidePadding: string;
  slideBgColor: string;
  elementSpacing: string;
  titleFontSize: string;
  subtitleFontSize: string;
  normalFontSize: string;
  smallFontSize: string;
  headingTextSizes: Size[];
  boldTextSizes: Size[];
}
