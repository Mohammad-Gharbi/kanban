import { Flex } from "@chakra-ui/react"
import { BoardButton } from "./BoardButton"
import { useBoard } from "../contexts/BoardsContext"
import { CreateNewBoard } from "./CreateNewBoard"

export function Navigation() {
  const { boards } = useBoard()

  return (
    <Flex flexDirection="column" justifyContent="center">
      {boards.map((board) => (
        <BoardButton key={board.id} name={board?.name} id={board?.id} />
      ))}

      <CreateNewBoard />
    </Flex>
  )
}
