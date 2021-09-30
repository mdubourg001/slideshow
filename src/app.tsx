import { ThemeContext, defaultTheme, Slideshow, Slide, Text } from "./lib";

function App() {
  return (
    <ThemeContext.Provider value={defaultTheme}>
      <Slideshow>
        <Slide alignX="center" alignY="end">
          <Text alignX="end" size="title" absolute="top-left">
            Title
          </Text>
          <Text size="subtitle" alignX="start">
            Subtitle
          </Text>
          <Text>Normal</Text>
          <Text size="small" absolute="bottom-left">
            Small
          </Text>
        </Slide>
      </Slideshow>
    </ThemeContext.Provider>
  );
}

export default App;
