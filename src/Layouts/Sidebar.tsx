import { Flex } from "@chakra-ui/react"
import { Navigation } from "../components/Navigation"
import { useBoard } from "../contexts/BoardsContext"

export function Sidebar() {
  const { boards } = useBoard()

  return (
    <div className="h-full w-full rounded-xl bg-slate-800 shadow-md">
      <Flex flexDirection="column" justifyContent="center" padding="6">
        <p className="mb-4 text-3xl font-bold tracking-wide text-slate-200 shadow-sm">
          Kanban
        </p>
        <p className="mb-8 text-xs font-bold tracking-wide text-slate-300 shadow-sm">
          ALL BOARDS ({boards.length})
        </p>
        <Navigation />
      </Flex>
    </div>
  )
}
