import "./assets/css/index.css"
import P5Canvas from "./components/P5Canvas"
import sketch from "./sketches/cell-sketch"

function App() {
  return (
    <main>
      <button style={{ position: "absolute", top: "10px", right: "10px" }}>reduce</button>
      <P5Canvas sketch={sketch} />
    </main>
  )
}

export default App
