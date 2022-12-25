import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Input,
  ModalFooter,
  Text,
} from "@chakra-ui/react"

import { useDisclosure } from "@chakra-ui/react"
import { useRef } from "react"
import { useBoard } from "../contexts/BoardsContext"

import { v4 as uuidv4 } from "uuid"

export function CreateNewBoard() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { addBoard } = useBoard()
  const boardName = useRef<HTMLInputElement | null>(null)

  return (
    <>
      <button
        onClick={onOpen}
        className="transtion-all mb-4 h-12 w-full rounded-lg bg-sky-100 text-lg font-semibold text-sky-800 shadow-md duration-100 ease-in-out hover:bg-sky-600 hover:text-white"
      >
        + Create New Board
      </button>
      <Modal
        closeOnOverlayClick={true}
        isOpen={isOpen}
        onClose={onClose}
        size="md"
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create New Board</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text mb="4">Board Name</Text>
            <Input
              ref={boardName}
              placeholder="eg. Paltform Launch"
              size="md"
              mb="4"
            />
          </ModalBody>

          <ModalFooter>
            <Button
              onClick={() => {
                addBoard(boardName.current!.value, uuidv4())
                onClose()
              }}
              colorScheme="blue"
              mr={4}
            >
              Create
            </Button>
            <Button onClick={onClose} variant="ghost">
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
