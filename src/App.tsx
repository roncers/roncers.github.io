import React from "react"
import "./assets/css/index.css"
import P5Canvas from "./components/commons/P5Canvas"

import nameSketch from "./p5/name.p5-sketch"
import cellSketch from "./p5/cell.p5-sketch"
import lavaSketch from "./p5/lava.p5-sketch"
import PoppingWindow from "./components/commons/poping-window/PoppingWindow"
import TabCanvas from "./components/commons/tab-canvas/TabCanvas"

// TODO: popovers that show my work and stuff.
function App(): React.ReactElement {
  return (
    <main>
      <P5Canvas sketch={nameSketch} />
      <PoppingWindow id="1">
        <TabCanvas sketch={cellSketch} label="Cell" />
      </PoppingWindow>
      <PoppingWindow id="2">
        <TabCanvas sketch={lavaSketch} label="Lava" />
      </PoppingWindow>
    </main>
  )
}

export default App
