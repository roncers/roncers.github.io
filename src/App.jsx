import "./assets/css/index.css"
import P5Canvas from "./components/P5Canvas"
// import sketch from "./sketches/cell-sketch"

import nameSketch from "./sketches/name-sketch"

// TODO: popovers that show my work and stuff.
function App() {
  return (
    <main>
      <button style={{ position: "absolute", top: "10px", right: "10px" }}>reduce</button>
      {/* <P5Canvas sketch={sketch} /> */}
      <P5Canvas sketch={nameSketch} />
    </main>
  )
}

export default App
