import {
  Theme,
  ThemeContext,
  defaultTheme,
  Slideshow,
  Slide,
  Text,
  Image,
  Notes,
} from "./lib";

const FirstSlide = () => (
  <Slide alignX="center" alignY="center">
    <Notes>{`
      Hello la famille !

      - Lorem ipsum dolor si amet
      - Et concerterum si balum et toeic

      Que piensas ?!
    `}</Notes>

    <Text size="title">
      Comment mon navigateur <br />
      éxécute-t-il mon code JavaScript ?
    </Text>

    <br />

    <Text size="normal">Callstack, Web APIs, Event Loop, Rendu...</Text>
  </Slide>
);

const SecondSlide = () => (
  <Slide alignX="center" alignY="center">
    <Notes>{`
      Alors voila coucou euh...
      Moi c'est Titouan...
    `}</Notes>

    <Text size="title">Second slide !</Text>
    <code>
      <Text size="normal" textColor="text-red-800">
        console.log("Hello, world.")
      </Text>
    </code>
  </Slide>
);

const theme: Theme = {
  ...defaultTheme,
  defaultFontFamily: "monospace",
};

function App() {
  return (
    <ThemeContext.Provider value={theme}>
      <Slideshow id="event-loop">
        <FirstSlide />
        <SecondSlide />
      </Slideshow>
    </ThemeContext.Provider>
  );
}

export default App;
