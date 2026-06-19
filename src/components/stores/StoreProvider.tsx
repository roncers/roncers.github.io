import TaskManagerContextProvider from "./TaskManagerProvider"
import TranslationProvider from "./TranslationProvider"
import UiWindowProvider from "./UiWindowProvider"

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <TranslationProvider>
      <UiWindowProvider>
        <TaskManagerContextProvider>{children}</TaskManagerContextProvider>
      </UiWindowProvider>
    </TranslationProvider>
  )
}
