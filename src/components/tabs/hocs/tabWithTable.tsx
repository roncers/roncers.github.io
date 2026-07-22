import { ComponentType } from "react"
import TableContextProvider, { TableContext } from "@/components/stores/TableContextProvider"
import PoppingWindow from "@/components/commons/poping-window/PoppingWindow"
import type { TabComponentProps } from "@/types/internal-tab.types"
import { use } from "react"

export function withTabStructure<P extends TabComponentProps>(
  WrappedComponent: ComponentType<P>
) {
  // Inner component to safely consume the newly provided context if needed
  function TabShell(props: P) {
    const { semiClearSelection } = use(TableContext)

    return (
      <PoppingWindow {...props} onSemiClear={semiClearSelection}>
        <WrappedComponent {...props} />
      </PoppingWindow>
    )
  }

  // Wrapped with the provider at the root level
  return function EnhancedTab(props: P) {
    return (
      <TableContextProvider>
        <TabShell {...props} />
      </TableContextProvider>
    )
  }
}