import cs from "classnames";
import hljs from "highlight.js/lib/core";
import javascript from "highlight.js/lib/languages/javascript";
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

import { WebBrowser } from "./components/WebBrowser";
import { useCallback, useEffect, useLayoutEffect, useRef } from "react";
import { Box } from "./components/Box";

hljs.registerLanguage("javascript", javascript);

const MainTitleSlide = () => (
  <Slide alignX="center" alignY="center">
    <Text size="title">
      JavaScript dans le navigateur: <br />
      comment ca marche ?
    </Text>
    <br />

    <Text size="normal">
      Main Thread, Scripting Engine, Call Stack, Rendering Engine, Web APIs,
      Callback Queue, Event Loop...
    </Text>
  </Slide>
);

const BrowserSlide = ({
  techLogos,
  mainThread,
  codeEx1,
  callStackCode1,
  callStackCode2,
  callStackCode3,
  callStackCode4,
  codeEx2,
  callStackCode5,
  callStackCode6,
  callStackCode6Bis,
  fullStack,
  codeEx3,
  v8,
  v8Content,
  callbackQueue,
  callbackQueueCB1,
  callbackQueueCB2,
  callbackQueuePainting,
  callbackQueueRAF,
  callbackQueueRIC,
  eventLoop,
  eventLoopSpin,
  webApis,
  webApisCallback,
  webApisRAF,
  renderEngine,
}: Record<string, boolean>) => {
  const eventLoopElement = useRef<HTMLDivElement | null>(null);

  if (eventLoopSpin && eventLoopElement.current) {
    eventLoopElement.current.classList.add(
      ..."transition-transform transform duration-500 -rotate-360".split(" ")
    );

    setTimeout(
      () =>
        eventLoopElement.current?.classList.remove(
          ..."transition-transform transform duration-500 -rotate-360".split(
            " "
          )
        ),
      500
    );
  }

  return (
    <Slide>
      <Notes>{``}</Notes>

      <WebBrowser url={window.location.href}>
        {techLogos && (
          <div className="flex items-center justify-center h-full">
            <Image
              style={{ width: "500px" }}
              src="https://www.nicepng.com/png/detail/142-1423886_html5-css3-js-html-css-javascript.png"
            />
          </div>
        )}

        <div className="grid h-full grid-cols-4 space-x-10">
          <div>
            {codeEx1 && (
              <Box
                title="index.js"
                color="purple"
                className="col-span-1 h-fit slidein"
                noPadding
              >
                <pre>
                  {codeEx1 && (
                    <code className="rounded language-javascript noslidein">
                      {`
function logSum(a, b) {
  console.log(a + b)
}

const a = 42
const b = 42
              
logSum(a, b)${
                        codeEx2
                          ? `

function callback() {
  console.log('Hello !')
}

setTimeout(callback, 2000)`
                          : ""
                      }${
                        codeEx3
                          ? `
setTimeout(callback, 2000)

// ...

// later in some async function
requestAnimationFrame(callback)
requestIdleCallback(callback)`
                          : ""
                      }`}
                    </code>
                  )}
                </pre>
              </Box>
            )}
          </div>

          {mainThread && (
            <Box
              title="Main Thread"
              color="pink"
              className="flex flex-col col-span-3"
            >
              <div className="grid grid-cols-3 gap-x-4 h-3/5">
                {v8 && (
                  <Box
                    title="v8"
                    className="flex flex-col"
                    height="h-full"
                    color="green"
                  >
                    {v8Content && (
                      <>
                        <Box
                          title="Heap"
                          height="h-2/5"
                          color="black"
                          className="flex space-x-7"
                        >
                          <div className="w-8 h-8 bg-gray-500 rounded-lg" />
                          <div className="w-12 h-5 mt-10 bg-gray-500 rounded-lg" />
                          <div className="w-5 h-8 bg-gray-500 rounded-lg" />
                          <div className="w-5 h-5 mt-8 bg-gray-500 rounded-lg" />
                          <div className="w-12 h-5 bg-gray-500 rounded-lg" />
                        </Box>
                        <Box
                          title="Call Stack"
                          height="h-3/5"
                          color="black"
                          className="flex flex-col justify-end mt-6"
                        >
                          {callStackCode1 && (
                            <pre>
                              <code className="text-xs rounded-lg language-javascript">
                                const a = 42
                              </code>
                            </pre>
                          )}
                          {callStackCode2 && (
                            <pre>
                              <code className="text-xs rounded-lg language-javascript">
                                const b = 42
                              </code>
                            </pre>
                          )}
                          {callStackCode4 && (
                            <pre className="mb-2">
                              <code className="text-xs rounded-lg language-javascript">
                                console.log(a + b)
                              </code>
                            </pre>
                          )}
                          {(callStackCode3 || callStackCode4) && (
                            <pre>
                              <code className="text-xs rounded-lg language-javascript">
                                logSum(a, b)
                              </code>
                            </pre>
                          )}
                          {callStackCode5 && (
                            <pre>
                              <code className="text-xs rounded-lg language-javascript">
                                setTimeout(callback, 2000)
                              </code>
                            </pre>
                          )}
                          {callStackCode6 && (
                            <pre>
                              <code className="text-xs rounded-lg language-javascript">
                                callback()
                              </code>
                            </pre>
                          )}
                          {callStackCode6Bis && (
                            <pre>
                              <code className="text-xs rounded-lg language-javascript">
                                callback()
                              </code>
                            </pre>
                          )}
                          {fullStack && (
                            <pre className="flex flex-col gap-y-px">
                              <code className="text-xs rounded-lg language-javascript">
                                console.log('Log in infinite loop !');
                              </code>
                              <code className="text-xs rounded-lg language-javascript">
                                console.log('Log in infinite loop !');
                              </code>
                              <code className="text-xs rounded-lg language-javascript">
                                ...
                              </code>
                            </pre>
                          )}
                        </Box>
                      </>
                    )}
                  </Box>
                )}

                {webApis && (
                  <Box title="Web APIs" color="yellow" height="h-full">
                    <pre className="mb-2">
                      <code className="text-xs rounded-lg w-fit language-javascript">
                        window.fetch
                      </code>
                    </pre>
                    <pre className="relative mb-2">
                      <code className="text-xs rounded-lg w-fit language-javascript">
                        window.setTimeout
                      </code>
                      {webApisCallback && (
                        <div className="absolute top-0 bottom-0 flex items-center px-2 bg-yellow-500 rounded left-36 slidein">
                          callback
                        </div>
                      )}
                    </pre>
                    <pre className="mb-2">
                      <code className="text-xs rounded-lg w-fit language-javascript">
                        window.setInterval
                      </code>
                    </pre>
                    <pre className="mb-2">
                      <code className="text-xs rounded-lg w-fit language-javascript">
                        ...
                      </code>
                    </pre>
                    {webApisRAF && (
                      <>
                        <pre className="mb-2">
                          <code className="text-xs rounded-lg w-fit language-javascript">
                            window.requestAnimationFrame
                          </code>
                        </pre>
                        <pre>
                          <code className="text-xs rounded-lg w-fit language-javascript">
                            window.requestIdleCallback
                          </code>
                        </pre>
                      </>
                    )}
                  </Box>
                )}

                {renderEngine && (
                  <Box title="Rendering Engine" color="blue" height="h-full">
                    <div className="p-2 mb-2 border-2 border-gray-300 w-fit">
                      DOM + CSSOM Computation
                    </div>
                    <div className="p-2 mb-2 border-2 border-gray-300 w-fit">
                      Render Tree
                    </div>
                    <div className="p-2 mb-2 border-2 border-gray-300 w-fit">
                      Layout Computation
                    </div>
                    <div className="p-2 mb-2 border-2 border-gray-300 w-fit">
                      ...
                    </div>
                    <div className="p-2 mb-2 bg-blue-400 w-fit">Painting</div>
                  </Box>
                )}
              </div>

              <div
                className={cs(
                  "grid items-center grid-cols-6 col-span-3 mt-6 h-2/5",
                  { invisible: !(callbackQueue || eventLoop) }
                )}
              >
                <div
                  className={cs(
                    "flex flex-col items-center justify-end col-span-2",
                    { invisible: !eventLoop }
                  )}
                >
                  <div ref={eventLoopElement} className="mb-4">
                    <img
                      className="w-24 event-loop"
                      src="https://www.shareicon.net/data/2017/06/15/887076_rotate_512x512.png"
                    />
                  </div>
                  <Text size="small">Event Loop</Text>
                </div>

                {callbackQueue && (
                  <div className="flex h-full col-span-4 ml-2">
                    <Box
                      title="Callback Queue"
                      color="black"
                      height="h-full w-full grid grid-cols-6 gap-x-4"
                    >
                      {callbackQueueCB1 && (
                        <div className="flex items-center justify-center px-4 bg-yellow-500 rounded slidein">
                          callback
                        </div>
                      )}
                      {callbackQueueCB2 && (
                        <div className="flex items-center justify-center px-4 bg-yellow-500 rounded slidein">
                          callback
                        </div>
                      )}
                      {callbackQueueRAF && (
                        <div className="flex items-center justify-center px-4 text-center bg-yellow-400 rounded slidein">
                          rAF
                          <br />
                          callback
                        </div>
                      )}
                      {callbackQueuePainting && (
                        <div className="flex flex-col items-center justify-center px-4 text-center bg-blue-400 rounded slidein">
                          <p>painting</p>
                          <p className="text-xs text-gray-700">(~60x per s.)</p>
                        </div>
                      )}
                      {callbackQueueRIC && (
                        <>
                          <div className="flex items-center justify-center h-full font-bold">
                            ...
                          </div>
                          <div className="flex items-center justify-center px-4 text-center bg-yellow-400 rounded slidein">
                            rIC
                            <br />
                            callback
                          </div>
                        </>
                      )}
                    </Box>
                  </div>
                )}
              </div>
            </Box>
          )}
        </div>
      </WebBrowser>
    </Slide>
  );
};

const Summary = ({ step }: { step: number }) => (
  <Slide>
    <Text size="subtitle">En résumé</Text>
    <br />

    <ul className="ml-6 space-y-8 text-2xl list-disc">
      {step >= 1 && (
        <li>
          Chaque contexte de navigation (onglet / iframe) exécute la majorité de
          ses tâches (scripting, rendering, manipulation de DOM...) sur un seul
          thread (le <b>Main Thread</b>)
        </li>
      )}
      {step >= 2 && (
        <li>
          Le code JS est exécuté à l'aide du Scripting Engine (<b>v8</b>) et les
          effets de bord reposent sur des APIs fournies par le navigateur (les{" "}
          <b>Web APIs</b>)
        </li>
      )}
      {step >= 3 && (
        <li>
          Ces APIs recoivent un callback qui, dès la fin de l'exécution de la
          Web API, est placé sur la <b>Callback Queue</b>
        </li>
      )}
      {step >= 4 && (
        <li>
          <b>Dès que la Callstack est vide</b>, l'Event Loop se charge de
          prendre une à une les tâches présentes sur la Callback Queue, et de
          les traiter
        </li>
      )}
      {step >= 5 && (
        <li>
          Environ 60 fois par seconde, le navigateur ajoutera un <b>Repaint</b>{" "}
          à la Callback Queue
        </li>
      )}
      {step >= 6 && (
        <li>
          Ce repaint ne pourra être fait là aussi{" "}
          <b>que lorsque la Callstack sera vide</b>. Quand on parle de bloquer
          l'Event Loop, on parle en fait de monopoliser la Callstack, empêchant
          ainsi tout rendu ou toute exécution de callback
        </li>
      )}
      {step >= 7 && (
        <li>
          L'exécution des callback en attente sur la Callback Queue étant
          dépendante de la Callstack, le temps d'attente passé à{" "}
          <code className="italic font-bold">setTimeout</code> est donc{" "}
          <b>un temps minimum</b>, et non un temps garanti
        </li>
      )}
      {step >= 8 && (
        <li>
          Afin de pouvoir prioriser du travail sur l'Event Loop, le navigateur
          met à disposition certaines APIs spécifiques&nbsp;:&nbsp;
          <code className="italic font-bold">
            requestAnimationFrame
          </code> et{" "}
          <code className="italic font-bold">requestIdleCallback</code>. Les{" "}
          <b>Web Workers</b> permettent également de déporter du travail sur un
          autre thread que le Main Thread
        </li>
      )}
      {step >= 9 && (
        <li>
          En réalité : <b>la Callback Queue n'existe pas</b>. C'est une manière
          simplifiée de représenter le fonctionnement de l'Event Loop qui fait
          en réalité la différence entre <b>microtasks</b> (callbacks de{" "}
          <code className="italic font-bold">Promise</code>,{" "}
          <code className="italic font-bold">MutationObserver</code>s, etc...{" "}
          <b>qu'il éxecutera en priorité</b>) et <b>macrotasks</b> (timers,
          events utilisateurs...), qu'il éxecutera ensuite
        </li>
      )}
    </ul>
  </Slide>
);

const ThanksQuestions = () => (
  <Slide alignX="center" alignY="center">
    <Text>Merci pour votre attention !</Text>
    <br />

    <Text size="title">Des questions ?</Text>
  </Slide>
);

const theme: Theme = {
  ...defaultTheme,
  headingFontFamily: "Jetbrains Mono",
  defaultFontFamily: "Jetbrains Mono",
  slideBgColor: "bg-gradient-to-br from-yellow-400 via-pink-300 to-red-400",
};

function App() {
  const highlightCode = useCallback(() => {
    hljs.highlightAll();
  }, []);

  useEffect(() => {
    highlightCode();
  });

  useLayoutEffect(() => {
    console.log(
      `Setting :root font-size to ${Math.floor(
        (window.innerHeight / 100) * 1.5
      )}px.`
    );

    document.documentElement.style.setProperty(
      "font-size",
      Math.ceil((window.innerHeight / 100) * 1.5) + "px"
    );
  }, []);

  return (
    <ThemeContext.Provider value={theme}>
      <Slideshow id="event-loop" onSlideChange={highlightCode}>
        <MainTitleSlide />

        <BrowserSlide />
        <BrowserSlide mainThread />
        <BrowserSlide mainThread v8 />
        <BrowserSlide mainThread v8 v8Content />
        <BrowserSlide mainThread v8 v8Content codeEx1 />
        <BrowserSlide mainThread v8 v8Content codeEx1 callStackCode1 />
        <BrowserSlide mainThread v8 v8Content codeEx1 callStackCode2 />
        <BrowserSlide mainThread v8 v8Content codeEx1 callStackCode3 />
        <BrowserSlide mainThread v8 v8Content codeEx1 callStackCode4 />
        <BrowserSlide mainThread v8 v8Content codeEx1 />
        <BrowserSlide mainThread v8 v8Content codeEx1 codeEx2 />
        <BrowserSlide mainThread v8 v8Content codeEx1 codeEx2 webApis />
        <BrowserSlide
          mainThread
          v8
          v8Content
          codeEx1
          codeEx2
          callStackCode5
          webApis
        />
        <BrowserSlide
          mainThread
          v8
          v8Content
          codeEx1
          codeEx2
          callStackCode5
          webApis
          webApisCallback
        />
        <BrowserSlide
          mainThread
          v8
          v8Content
          codeEx1
          codeEx2
          webApis
          webApisCallback
        />
        <BrowserSlide
          mainThread
          v8
          v8Content
          codeEx1
          codeEx2
          webApis
          webApisCallback
          callbackQueue
        />
        <BrowserSlide
          mainThread
          v8
          v8Content
          codeEx1
          codeEx2
          webApis
          callbackQueue
          callbackQueueCB1
        />
        <BrowserSlide
          mainThread
          v8
          v8Content
          codeEx1
          codeEx2
          webApis
          callbackQueue
          callbackQueueCB1
          eventLoop
        />
        <BrowserSlide
          mainThread
          v8
          v8Content
          codeEx1
          codeEx2
          webApis
          callbackQueue
          eventLoop
          eventLoopSpin
          callStackCode6
        />
        <BrowserSlide
          mainThread
          v8
          v8Content
          codeEx1
          codeEx2
          webApis
          callbackQueue
          eventLoop
        />
        <BrowserSlide
          mainThread
          v8
          v8Content
          codeEx1
          codeEx2
          webApis
          callbackQueue
          eventLoop
          renderEngine
        />
        <BrowserSlide
          mainThread
          v8
          v8Content
          codeEx1
          codeEx2
          webApis
          callbackQueue
          callbackQueueCB1
          callbackQueueCB2
          fullStack
          eventLoop
          renderEngine
        />
        <BrowserSlide
          mainThread
          v8
          v8Content
          codeEx1
          codeEx2
          webApis
          callbackQueue
          callbackQueueCB1
          callbackQueueCB2
          fullStack
          eventLoop
          renderEngine
          callbackQueuePainting
        />
        <BrowserSlide
          mainThread
          v8
          v8Content
          codeEx1
          codeEx2
          webApis
          callbackQueue
          callbackQueueCB1
          callbackQueueCB2
          eventLoop
          renderEngine
          callbackQueuePainting
        />
        <BrowserSlide
          mainThread
          v8
          v8Content
          codeEx1
          codeEx2
          webApis
          callbackQueue
          callbackQueueCB2
          eventLoop
          eventLoopSpin
          renderEngine
          callStackCode6
          callbackQueuePainting
        />
        <BrowserSlide
          mainThread
          v8
          v8Content
          codeEx1
          codeEx2
          webApis
          callbackQueue
          eventLoop
          eventLoopSpin
          renderEngine
          callStackCode6Bis
          callbackQueuePainting
        />
        <BrowserSlide
          mainThread
          v8
          v8Content
          codeEx1
          codeEx2
          webApis
          callbackQueue
          eventLoop
          eventLoopSpin
          renderEngine
        />
        <BrowserSlide
          mainThread
          v8
          v8Content
          codeEx1
          codeEx2
          codeEx3
          webApis
          webApisRAF
          callbackQueue
          eventLoop
          renderEngine
        />
        <BrowserSlide
          mainThread
          v8
          v8Content
          codeEx1
          codeEx2
          codeEx3
          webApis
          webApisRAF
          callbackQueue
          callbackQueueCB1
          callbackQueueCB2
          eventLoop
          renderEngine
          callbackQueuePainting
        />
        <BrowserSlide
          mainThread
          v8
          v8Content
          codeEx1
          codeEx2
          codeEx3
          webApis
          webApisRAF
          callbackQueue
          callbackQueueCB1
          callbackQueueCB2
          eventLoop
          renderEngine
          callbackQueuePainting
          callbackQueueRAF
        />
        <BrowserSlide
          mainThread
          v8
          v8Content
          codeEx1
          codeEx2
          codeEx3
          webApis
          webApisRAF
          callbackQueue
          callbackQueueCB1
          callbackQueueCB2
          eventLoop
          renderEngine
          callbackQueuePainting
          callbackQueueRAF
          callbackQueueRIC
        />
        <BrowserSlide
          mainThread
          v8
          v8Content
          codeEx1
          codeEx2
          codeEx3
          callStackCode6
          webApis
          webApisRAF
          callbackQueue
          callbackQueueCB1
          callbackQueueCB2
          eventLoop
          eventLoopSpin
          renderEngine
          callbackQueuePainting
          callbackQueueRIC
        />
        <BrowserSlide
          mainThread
          v8
          v8Content
          codeEx1
          codeEx2
          codeEx3
          callStackCode6
          webApis
          webApisRAF
          callbackQueue
          callbackQueueCB2
          eventLoop
          eventLoopSpin
          renderEngine
          callbackQueuePainting
          callbackQueueRIC
        />
        <BrowserSlide
          mainThread
          v8
          v8Content
          codeEx1
          codeEx2
          codeEx3
          callStackCode6Bis
          webApis
          webApisRAF
          callbackQueue
          eventLoop
          eventLoopSpin
          renderEngine
          callbackQueuePainting
          callbackQueueRIC
        />
        <BrowserSlide
          mainThread
          v8
          v8Content
          codeEx1
          codeEx2
          codeEx3
          webApis
          webApisRAF
          callbackQueue
          eventLoop
          eventLoopSpin
          renderEngine
          callbackQueueRIC
        />
        <BrowserSlide
          mainThread
          v8
          v8Content
          codeEx1
          codeEx2
          codeEx3
          callStackCode6
          webApis
          webApisRAF
          callbackQueue
          eventLoop
          eventLoopSpin
          renderEngine
        />
        <BrowserSlide
          mainThread
          v8
          v8Content
          codeEx1
          codeEx2
          codeEx3
          webApis
          webApisRAF
          callbackQueue
          eventLoop
          renderEngine
        />

        <Summary step={0} />
        <Summary step={1} />
        <Summary step={2} />
        <Summary step={3} />
        <Summary step={4} />
        <Summary step={5} />
        <Summary step={6} />
        <Summary step={7} />
        <Summary step={8} />
        <Summary step={9} />

        <ThanksQuestions />
      </Slideshow>
    </ThemeContext.Provider>
  );
}

export default App;
