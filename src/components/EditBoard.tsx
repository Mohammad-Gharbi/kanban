import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react"
import { useRef } from "react"
import { useBoard } from "../contexts/BoardsContext"

export function EditBoard() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const boardName = useRef<HTMLInputElement | null>(null)
  const { currentBoard, editBoard } = useBoard()

  return (
    <>
      <button
        onClick={onOpen}
        className="transtion-all mt-4 h-12 w-24 rounded-lg bg-sky-100 text-lg font-semibold text-sky-800 shadow-md duration-100 ease-in-out hover:bg-sky-600 hover:text-white"
      >
        Edit
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
          <ModalHeader>Edit Board</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text mb="4">New Board Name</Text>
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
                editBoard(currentBoard, boardName.current!.value)
                onClose()
              }}
              colorScheme="blue"
              mr={4}
            >
              Edit
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
