import { ReactElement } from "react"
import P5Canvas from "./components/commons/P5Canvas"
import nameSketch from "./p5/base/name.p5"
import TabRenderer from "@/components/TabRenderer"
import TaskManagerDock from "@/components/task-manager-dock/TaskManagerDock"
import "./App.css"

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
