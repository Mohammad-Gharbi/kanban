import { Icon } from "@chakra-ui/react"
import { useBoard } from "../contexts/BoardsContext"
import { MdSpaceDashboard } from "react-icons/md"

interface Props {
  name: string
  id: string
}

export function BoardButton({ id, name }: Props) {
  const { currentBoard, setCurrentBoard } = useBoard()

  return (
    <button
      onClick={() => setCurrentBoard(id)}
      className={`flex h-12 w-full flex-row items-center justify-start p-6 shadow-md ${
        currentBoard === id ? "bg-sky-600" : "bg-sky-800"
      }  transtion-all mb-4 rounded-lg text-xl font-bold text-white duration-100 ease-in-out hover:bg-sky-700`}
    >
      <Icon as={MdSpaceDashboard} mr="4" boxSize="6" />
      {name}
    </button>
  )
}
