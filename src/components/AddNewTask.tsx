import {
  Button,
  Checkbox,
  Icon,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Text,
  useDisclosure,
} from "@chakra-ui/react"
import { v4 as uuidv4 } from "uuid"
import { BsPlusLg } from "react-icons/bs"
import { useEffect, useRef, useState } from "react"
import { useBoard } from "../contexts/BoardsContext"

export function AddNewTask() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { addTask, currentBoard } = useBoard()

  const title = useRef<HTMLInputElement | null>(null)
  const description = useRef<HTMLInputElement | null>(null)
  const subtask = useRef<HTMLInputElement | null>(null)
  const state = useRef<HTMLSelectElement | null>(null)
  const [subtasks, setSubtask] = useState<any[]>([])

  return (
    <>
      <button
        onClick={onOpen}
        className="transtion-all flex h-12 w-12 flex-row items-center justify-center rounded-lg bg-sky-800 p-3 text-lg font-semibold text-white shadow-md duration-100 ease-in-out hover:bg-sky-600 sm:w-40 sm:justify-between"
      >
        <Icon as={BsPlusLg} boxSize={3} />
        <p className="hidden sm:block">Add New Task</p>
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
          <ModalHeader>Add New Task</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <Text mb="4">Title</Text>
            <Input
              ref={title}
              placeholder="eg. Take a Coffee Brake"
              size="md"
              mb="4"
            />

            <Text mb="4">Description</Text>
            <Input
              ref={description}
              placeholder="eg. This is just a break."
              size="md"
              mb="4"
              h="24"
            />

            <Text mb="4">Subtasks</Text>
            <Input
              ref={subtask}
              placeholder="eg. Make Coffee"
              size="md"
              mb="4"
            />
            <div className="flex flex-col">
              {subtasks?.map((subtask) => (
                <Checkbox key={subtask.id} mb="4">
                  {subtask.name}
                </Checkbox>
              ))}
            </div>
            <Button
              onClick={() => {
                setSubtask((prevSubtasks) => [
                  ...prevSubtasks,
                  { name: subtask.current!.value, id: uuidv4() },
                ])
              }}
              colorScheme="blue"
              w="24"
              mb="4"
            >
              + Add
            </Button>

            <Text mb="4">Status</Text>
            <Select ref={state} placeholder="Select Status">
              <option value="Todo">Todo</option>
              <option value="Doing">Doing</option>
              <option value="Completed">Completed</option>
            </Select>
          </ModalBody>

          <ModalFooter>
            <Button
              onClick={() => {
                currentBoard !== undefined
                  ? addTask(
                      currentBoard,
                      title.current!.value,
                      description.current!.value,
                      state.current!.value,
                      subtasks,
                      uuidv4()
                    )
                  : ""
                setSubtask([])
                onClose()
              }}
              colorScheme="blue"
              mr={4}
            >
              Add
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
