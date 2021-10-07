import {
  ThemeContext,
  defaultTheme,
  Slideshow,
  Slide,
  Text,
  Image,
} from "./lib";

const FirstSlide = () => (
  <Slide alignX="center" alignY="center" bgColor="bg-red-200">
    <Image
      src="https://c.tenor.com/hSThcLBDUfwAAAAC/the-office-lets-party.gif"
      inBackground
    />

    <Text size="title" className="text-white">
      First slide !
    </Text>
  </Slide>
);

const SecondSlide = () => (
  <Slide alignX="center" alignY="center">
    <Text size="title">Second slide !</Text>
    <code>
      <Text size="normal">console.log("Hello, world.")</Text>
    </code>
  </Slide>
);

function App() {
  return (
    <ThemeContext.Provider value={defaultTheme}>
      <Slideshow id="event-loop">
        <FirstSlide />
        <SecondSlide />
      </Slideshow>
    </ThemeContext.Provider>
  );
}

export default App;
