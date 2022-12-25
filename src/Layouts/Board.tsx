import { useEffect, useState } from "react"
import { useBoard } from "../contexts/BoardsContext"
import { uniqueStatuses } from "../utils/helpers"
import { Task } from "../components/Task"
import { randomColor } from "../utils/helpers"

interface board {
  name: string
  tasks: {
    title: string
    description: string
    state: string
    subtasks: {
      name: string
      state: string
      id: string
    }[]
    id: string
  }[]
  id: string
}

export function Board() {
  const { currentBoard, boards } = useBoard()
  const [board, setBoard] = useState<board>()
  const [statuses, setStatuses] = useState<string[] | undefined>([])

  useEffect(() => {
    setBoard(boards.find((board) => board.id === currentBoard))
  }, [currentBoard, boards])

  useEffect(() => {
    const allStatuses = board?.tasks?.map((task) => task.state)
    allStatuses?.sort()
    allStatuses?.reverse()
    setStatuses(allStatuses?.filter(uniqueStatuses))
  }, [board])
  return (
    <div className="h-full w-full rounded-xl bg-slate-800 p-6">
      <div className="flex h-full w-full flex-row gap-4">
        {statuses?.map((theStatus) => (
          <div key={theStatus}>
            <div className="mb-4 flex items-center font-bold text-white">
              <div
                className={`mr-1 h-4 w-4 rounded-full ${
                  theStatus === "Todo"
                    ? "bg-red-500"
                    : theStatus === "Doing"
                    ? "bg-yellow-500"
                    : "bg-green-500"
                }`}
              ></div>
              {theStatus} (
              {board?.tasks?.filter((task) => task.state === theStatus).length})
            </div>
            <div className="h-[95%] w-80 overflow-auto p-3">
              {board?.tasks
                ?.filter((task) => task.state === theStatus)
                .map((taskWithStatus) => (
                  <Task key={taskWithStatus.id} task={taskWithStatus} />
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Make a scrollable area for tasks
