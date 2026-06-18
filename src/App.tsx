import React from 'react'
import './assets/css/index.css'
import P5Canvas from './components/commons/P5Canvas'
// import sketch from './p5/cell-sketch'

import nameSketch from './p5/name.p5-sketch'
import PoppingWindow from './components/commons/poping-window/PoppingWindow'

// TODO: popovers that show my work and stuff.
function App(): React.ReactElement {
  return (
    <main>
      <P5Canvas sketch={nameSketch} />
      <PoppingWindow id="1">
        <div>Popup 1</div>
      </PoppingWindow>
      <PoppingWindow id="2">
        <div>Popup 2</div>
      </PoppingWindow>
    </main>
  )
}

export default App
