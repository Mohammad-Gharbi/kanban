import {
  Button,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  Text,
} from "@chakra-ui/react"
import { BsThreeDotsVertical } from "react-icons/bs"
import { useBoard } from "../contexts/BoardsContext"
import { EditBoard } from "./EditBoard"
import { EditTask } from "./EditTask"

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

interface Props {
  name: string
  id?: string | undefined
}

export function Options({ name, id }: Props) {
  const { boards, setCurrentBoard, currentBoard, deleteBoard, deleteTask } =
    useBoard()

  return (
    <>
      <Popover>
        <PopoverTrigger>
          <button className="transtion-all ml-4 h-11 rounded-lg bg-sky-800 text-lg font-semibold text-white duration-100 ease-in-out hover:bg-sky-600">
            <BsThreeDotsVertical />
          </button>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverBody>
            <div className="flex flex-col justify-center p-3">
              <Text as="b" mb="4">
                {name} Options
              </Text>
              <button
                onClick={() => {
                  if (name === "Board") {
                    deleteBoard(currentBoard)
                    setCurrentBoard(boards[0]?.id)
                  }
                  if (name === "Task") {
                    deleteTask(id)
                  }
                }}
                className="transtion-all mt-4 h-12 w-24 rounded-lg bg-red-100 text-lg font-semibold text-red-800 shadow-md duration-100 ease-in-out hover:bg-red-600 hover:text-white"
              >
                Delete
              </button>
              {name === "Board" ? <EditBoard /> : <EditTask id={id} />}
            </div>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </>
  )
}
