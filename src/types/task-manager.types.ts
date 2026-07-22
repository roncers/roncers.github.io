import type { Tab } from "./internal-tab.types"
export type TabUpdate = Pick<Tab, "id"> & Partial<Omit<Tab, "id">>

export const TAB_ACTIONS = {
  ADD_TAB: "ADD_TAB",
  FADE_OUT: "FADE_OUT",
  REMOVE_TAB: "REMOVE_TAB",
  UPDATE_TAB: "UPDATE_TAB",
  SET_TAB_SIZE: "SET_TAB_SIZE",
  SET_TAB_POSITION: "SET_TAB_POSITION",
  SET_TAB_PREV_SIZE: "SET_TAB_PREV_SIZE",
  SET_TAB_PREV_POSITION: "SET_TAB_PREV_POSITION",
  SET_TABS: "SET_TABS",
  INCREMENT_MAX_Z: "INCREMENT_MAX_Z",
  UPDATE_TAB_Z_INDEX: "UPDATE_TAB_Z_INDEX",
  FIT_TABS_TO_VIEWPORT: "FIT_TABS_TO_VIEWPORT",
} as const

export type TabAction =
  | { type: typeof TAB_ACTIONS.ADD_TAB; payload: Tab }
  | { type: typeof TAB_ACTIONS.FADE_OUT; payload: { id: string } }
  | { type: typeof TAB_ACTIONS.REMOVE_TAB; payload: string }
  | { type: typeof TAB_ACTIONS.UPDATE_TAB; payload: TabUpdate }
  | {
      type: typeof TAB_ACTIONS.SET_TAB_SIZE
      payload: { id: string; sizeX: number; sizeY: number }
    }
  | {
      type: typeof TAB_ACTIONS.SET_TAB_POSITION
      payload: { id: string; screenPosition: { x: number; y: number } | null }
    }
  | {
      type: typeof TAB_ACTIONS.SET_TAB_PREV_SIZE
      payload: { id: string; width: number; height: number }
    }
  | { type: typeof TAB_ACTIONS.SET_TAB_PREV_POSITION; payload: { id: string } }
  | { type: typeof TAB_ACTIONS.SET_TABS; payload: Tab[] }
  | { type: typeof TAB_ACTIONS.INCREMENT_MAX_Z; payload: null }
  | { type: typeof TAB_ACTIONS.UPDATE_TAB_Z_INDEX; payload: { id: string } }
  | {
      type: typeof TAB_ACTIONS.FIT_TABS_TO_VIEWPORT
      payload: { width: number; height: number }
    }