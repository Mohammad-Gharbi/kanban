import { useBoard } from "../contexts/BoardsContext"
import { AddNewTask } from "../components/AddNewTask"
import { Options } from "../components/Options"
import { useEffect, useState } from "react"

export function Topbar() {
  const { currentBoard, boards } = useBoard()
  const [boardName, setBoardName] = useState<string>()

  useEffect(() => {
    setBoardName(boards?.find((board) => board.id === currentBoard)?.name)
  }, [currentBoard])

  return (
    <div className="flex h-full w-full flex-row items-center justify-between rounded-xl bg-slate-800 p-6 shadow-md">
      <p className="text-2xl font-bold text-white shadow-sm ">{boardName}</p>
      <div className="flex items-center">
        <AddNewTask />
        <Options name="Board" />
      </div>
    </div>
  )
}
