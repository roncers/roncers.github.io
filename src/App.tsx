import React from 'react'
import './assets/css/index.css'
import P5Canvas from './components/commons/P5Canvas'
// import sketch from './p5/cell-sketch'

import nameSketch from './p5/name-sketch'

// TODO: popovers that show my work and stuff.
function App(): React.ReactElement {
  return (
    <main>
      <P5Canvas sketch={nameSketch} />
    </main>
  )
}

export default App
