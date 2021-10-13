import {
  useContext,
  useEffect,
  useCallback,
  createContext,
  useState,
} from "react";
import ReactDOMServer from "react-dom/server";
import useLocalstorage from "@rooks/use-localstorage";
import cs from "classnames";

import {
  SlideshowProps,
  SlideProps,
  TextProps,
  ImageProps,
  NotesProps,
} from "./types";
import { ThemeContext } from "./ThemeContext";

import "./slideshow.css";

const SlideshowContext = createContext({
  writeSlideNotes: (_: string) => {},
});

export function Slideshow({ id, children, className }: SlideshowProps) {
  const theme = useContext(ThemeContext);

  const [presenterMode, setPresenterMode] = useState(false);
  const [notes, setNotes] = useState<Record<number, string>>({});
  const [storageSlide, setSlide] = useLocalstorage(
    `slideshow__${id}__slide`,
    0
  );

  const [timer, setTimer] = useState(0);
  const [hrDuration, setHrDuration] = useState("00:00");
  const [timerRunning, setTimerRunning] = useState(false);

  const slide = parseInt(storageSlide, 10);
  const slideCount = Array.isArray(children) ? children.length : 1;

  const writeSlideNotes = useCallback(
    (note: string) => {
      setNotes({
        ...notes,
        [slide]: note,
      });
    },
    [notes, slide]
  );

  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === "ArrowLeft" && slide > 0) {
        // ArrowLeft => Go to previous slide
        setSlide(slide - 1);
      } else if (
        event.key === "ArrowRight" &&
        Array.isArray(children) &&
        slide < children?.length - 1
      ) {
        // ArrowRight => Go to next slide
        setSlide(slide + 1);
      } else if (event.key === "p") {
        // p => Toggle presenter mode
        setPresenterMode(!presenterMode);
      } else if (event.key === "t") {
        // t => Toggle timer running
        setTimerRunning(!timerRunning);
      }
    },
    [slide, presenterMode, timerRunning, children]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    let interval: number;

    if (timerRunning) {
      interval = setInterval(() => {
        const updatedTimer = timer + 1;
        const secondCounter = updatedTimer % 60;
        const minuteCounter = Math.floor(updatedTimer / 60);

        const computedSecond =
          String(secondCounter).length === 1
            ? `0${secondCounter}`
            : secondCounter;
        const computedMinute =
          String(minuteCounter).length === 1
            ? `0${minuteCounter}`
            : minuteCounter;

        setHrDuration(`${computedMinute}:${computedSecond}`);
        setTimer(updatedTimer);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [timerRunning, timer]);

  const currentSlide = Array.isArray(children) ? children[slide] : children;
  const nextSlide =
    Array.isArray(children) && children[slide + 1] ? children[slide + 1] : null;
  const staticNextSlide = ReactDOMServer.renderToStaticMarkup(
    (() => <>{nextSlide}</>)()
  );

  if (!!children && currentSlide === undefined) {
    setSlide(0);
  }

  if (!currentSlide) {
    return null;
  }

  return (
    <SlideshowContext.Provider value={{ writeSlideNotes }}>
      <section
        className={cs("fixed inset-0 w-screen h-screen", className)}
        style={{ fontFamily: theme.defaultFontFamily }}
      >
        {presenterMode ? (
          <div className="grid h-screen grid-cols-5 bg-gradient-to-br from-gray-700 to-gray-900">
            <div className="flex flex-col col-span-3 px-6 my-6 border-r-2 border-gray-500">
              <div className="flex items-center justify-between h-10">
                <p className="text-lg text-white">
                  Slide {slide + 1}/{slideCount}
                </p>
                <div className="px-4 bg-gray-300 rounded">
                  <span
                    className={timerRunning ? "text-red-800 font-semibold" : ""}
                  >
                    {hrDuration}
                  </span>{" "}
                  {!timerRunning && "(paused)"}
                </div>
              </div>

              <div className="relative mb-6 h-3/5">{currentSlide}</div>
              <div
                className="relative transform scale-x-75 opacity-50 h-2/5"
                dangerouslySetInnerHTML={{ __html: staticNextSlide }}
              />
            </div>

            <div className="col-span-2 m-6">
              <h2 className="mb-6 text-3xl font-bold text-gray-400 underline">
                Notes
              </h2>
              <div className="max-h-[90vh] pb-64 overflow-y-auto">
                {notes[slide]?.split("\n").map((line, i) => (
                  <p key={`${line}-${i}`} className="text-2xl text-white">
                    {line}
                  </p>
                ))}
              </div>
            </div>
          </div>
        ) : (
          currentSlide
        )}
      </section>
    </SlideshowContext.Provider>
  );
}

export function Notes({ children }: NotesProps) {
  const { writeSlideNotes } = useContext(SlideshowContext);

  useEffect(() => {
    setTimeout(() => writeSlideNotes(children), 0);
  }, [children]);

  return null;
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
            "items-center text-center": alignX === "center",
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
  textColor,
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
        textColor ?? theme.textColor,
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
export type {
  Theme,
  SlideshowProps,
  SlideProps,
  TextProps,
  ImageProps,
} from "./types";
export { DEFAULT_THEME as defaultTheme } from "./const";
