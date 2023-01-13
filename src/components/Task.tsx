import {
  Button,
  Checkbox,
  Divider,
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
import { Options } from "./Options"

interface task {
  task: {
    title: string
    description: string
    state: string
    subtasks: {
      name: string
      state: string
      id: string
    }[]
    id: string
  }
}

export function Task({ task }: task) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <button
        onClick={onOpen}
        className="mb-4 h-fit w-full rounded-md bg-sky-900 p-6 text-left text-white transition-all hover:bg-sky-600"
      >
        <p className="text-lg font-bold">{task.title}</p>
        <p className="text-sm text-slate-300">
          {
            task.subtasks.filter((subtask) => subtask.state === "Completed")
              .length
          }{" "}
          of {task.subtasks.length} subtasks
        </p>
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
          <ModalHeader>
            <div className="flex w-full  items-center justify-between pt-6">
              {task.title}
              <Options name="Task" id={task.id} />
            </div>
          </ModalHeader>
          <ModalCloseButton mr="1" />
          <ModalBody>
            <Text color="gray" mb="4">
              {task.description}
            </Text>

            <Text mb="4">Subtastks</Text>
            <div className="flex h-fit w-full flex-col">
              {task.subtasks.map((subtask) => (
                <Checkbox key={subtask.id} colorScheme="blue" mb="2">
                  {subtask.name}
                  <Divider />
                </Checkbox>
              ))}
            </div>

            <Text mb="4">Status</Text>
            <Text ml="4" mb="4">
              {task.state}
            </Text>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
