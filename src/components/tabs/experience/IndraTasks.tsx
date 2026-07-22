import type { TabComponentProps } from "@/types/internal-tab.types"
import PoppingWindow from "@/components/commons/poping-window/PoppingWindow"
import tasks from "./tasks.txt?raw"

export default function IndraTasks(props: TabComponentProps) {
  return (
    <PoppingWindow {...props}>
      <section
        data-name="tasks"
        className="data-container w-full h-full flex flex-col gap-4"
      >
        <pre className="default-description">
          {tasks}
        </pre>
      </section>
    </PoppingWindow>
  )
}