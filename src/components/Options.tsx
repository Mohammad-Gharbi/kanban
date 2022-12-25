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
            <div className="flex flex-col justify-center p-6">
              <Text as="b" mb="4">
                {name} Options
              </Text>
              <Button
                onClick={() => {
                  if (name === "Board") {
                    deleteBoard(currentBoard)
                    setCurrentBoard(boards[0]?.id)
                  }
                  if (name === "Task") {
                    deleteTask(id)
                  }
                }}
                w="24"
                colorScheme="red"
              >
                Delete
              </Button>
            </div>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </>
  )
}
