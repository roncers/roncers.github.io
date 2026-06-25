// this shouldn't be in the store provider, one of this context is generated for each table grid for their management.
import { createContext, useState } from "react"

export const SEMI_CLEAR_SUFFIX = '--semi'

interface TableContextType {
  selectedElement: string | null
  selectElement: (id: string) => void
  clearSelection: () => void
  semiClearSelection: () => void
}

export const TableContext = createContext<TableContextType>({
  selectedElement: null,
  selectElement: () => {},
  clearSelection: () => {},
  semiClearSelection: () => {},
})

export default function TableContextProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [selectedElement, setSelectedElement] = useState<string | null>(null)

  function selectElement(id: string) {
    setSelectedElement(id)
  }

  function semiClearSelection() {
    if(selectedElement && selectedElement.endsWith(SEMI_CLEAR_SUFFIX)) return
    setSelectedElement((prev) => prev + SEMI_CLEAR_SUFFIX)
  }

  function clearSelection() {
    setSelectedElement(null)
  }

  return (
    <TableContext.Provider value={{ selectedElement, selectElement, clearSelection, semiClearSelection }}>
      {children}
    </TableContext.Provider>
  )
}