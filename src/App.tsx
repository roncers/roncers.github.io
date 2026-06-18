import React from 'react'
import './assets/css/index.css'
import P5Canvas from './components/commons/P5Canvas'

import nameSketch from './p5/name.p5-sketch'
import cellSketch from './p5/cell.p5-sketch'
import lavaSketch from './p5/lava.p5-sketch'
import PoppingWindow from './components/commons/poping-window/PoppingWindow'

// TODO: popovers that show my work and stuff.
function App(): React.ReactElement {
  return (
    <main>
      <P5Canvas sketch={nameSketch} />
      <PoppingWindow id="1">
        <div style={{ padding: '1rem' }} className="w-full h-full">
          <P5Canvas sketch={cellSketch} />
        </div>
      </PoppingWindow>
      <PoppingWindow id="2">
        <div style={{ padding: '1rem' }} className="w-full h-full">
          <P5Canvas sketch={lavaSketch} />
        </div>
      </PoppingWindow>
    </main>
  )
}

export default App
