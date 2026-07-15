import { ReactElement } from "react"
import "./assets/css/index.css"
import P5Canvas from "./components/commons/P5Canvas"
import nameSketch from "./p5/base/name.p5"
import TabRenderer from "@/components/TabRenderer"
import TaskManagerDock from "@/components/task-manager-dock/TaskManagerDock"

function App(): ReactElement {
  return (
    <main>
      <P5Canvas sketch={nameSketch} />
      <TabRenderer />
      <TaskManagerDock />
    </main>
  )
}

export default App
