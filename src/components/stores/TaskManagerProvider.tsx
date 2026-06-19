import { createContext, useReducer } from "react"

type Tab = {
  id: string
  sizeX: number
  sizeY: number
  screenPosition: { x: number; y: number } | null // null means the tab is not active
  content: React.ComponentType
  zIndex: number
}

interface TaskManagerContextType {
  maxZ: number
  incrementMaxZ: () => void
  tabs: Tab[]
  setTabs: (tabs: Tab[]) => void
  addTab: (tab: Tab) => void
  removeTab: (id: string) => void
  updateTab: (tab: Tab) => void
}

export const TaskManagerContext = createContext<TaskManagerContextType>({
  maxZ: 0,
  tabs: [],
  incrementMaxZ: () => {},
  setTabs: () => {},
  addTab: () => {},
  removeTab: () => {},
  updateTab: () => {},
})

function tabsReducer(state: { maxZ: number; tabs: Tab[] }, action: { type: string; payload: any }) {
  switch (action.type) {
    case "ADD_TAB":
      return { ...state, tabs: [...state.tabs, action.payload] }
    case "REMOVE_TAB":
      return { ...state, tabs: state.tabs.filter((tab) => tab.id !== action.payload) }
    case "UPDATE_TAB":
      return {
        ...state,
        tabs: state.tabs.map((tab) => (tab.id === action.payload.id ? action.payload : tab)),
      }
    case "SET_TABS":
      return { ...state, tabs: action.payload }
    case "INCREMENT_MAX_Z":
      return { ...state, maxZ: state.maxZ + 1 }
    default:
      return state
  }
}

export default function TaskManagerContextProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [tabsState, tabsStateDispatch] = useReducer(tabsReducer, {maxZ: 0, tabs: []})

  function addTab(tab: Tab) {
    tabsStateDispatch({ type: "ADD_TAB", payload: tab })
  }

  function removeTab(id: string) {
    tabsStateDispatch({ type: "REMOVE_TAB", payload: id })
  }

  function updateTab(tab: Tab) {
    tabsStateDispatch({ type: "UPDATE_TAB", payload: tab })
  }

  function setTabs(tabs: Tab[]) {
    tabsStateDispatch({ type: "SET_TABS", payload: tabs })
  }

  function incrementMaxZ() {
    tabsStateDispatch({ type: "INCREMENT_MAX_Z", payload: null })
  }

  return (
    <TaskManagerContext.Provider value={{ maxZ: tabsState.maxZ, incrementMaxZ, tabs: tabsState.tabs, setTabs, addTab, removeTab, updateTab }}>
      {children}
    </TaskManagerContext.Provider>
  )
}
