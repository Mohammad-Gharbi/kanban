import { createContext, useContext, ReactNode } from "react"
import { useLocalStorage } from "../hooks/useLocalStorage"

import jsonData from "../data/kanban.json"

interface BoardProviderProps {
  children: ReactNode
}

interface BoardContext {
  boards: any[]
  addBoard: (boardName: string, id: string) => void
  addTask: (
    currentBoard: string,
    title: string,
    description: string,
    state: string,
    subtasks: any[],
    id: string
  ) => void
  currentBoard: string | undefined
  setCurrentBoard: (id: string) => void
  deleteBoard: (id: string | undefined) => void
  deleteTask: (id: string | undefined) => void
  editBoard: (id: string | undefined, newName: string) => void
  editTask: (
    currentBoard: string | undefined,
    id: string | undefined,
    title?: string | undefined,
    description?: string | undefined,
    state?: string | undefined,
    subtasks?: any[] | undefined
  ) => void
}

const BoardContext = createContext({} as BoardContext)

export function useBoard() {
  return useContext(BoardContext)
}

export function BoardProvider({ children }: BoardProviderProps) {
  const [boards, setBoards] = useLocalStorage<any[]>("kanban", [])
  // const [boards, setBoards] = useState<any[]>(jsonData)
  const [currentBoard, setCurrentBoard] = useLocalStorage<string | undefined>(
    "currentBoard",
    boards[0]?.id
  )

  function addBoard(boardName: string, id: string) {
    setBoards((prevBoards) => [
      ...prevBoards,
      {
        name: boardName,
        id: id,
      },
    ])
    setCurrentBoard(id)
  }

  function addTask(
    currentBoard: string,
    title: string,
    description: string,
    state: string,
    subtasks: any[],
    id: string
  ) {
    setBoards((prevBoards) => {
      return prevBoards.map((board) => {
        if (board.id === currentBoard) {
          if (board.tasks) {
            return {
              ...board,
              tasks: [
                ...board.tasks,
                {
                  title: title,
                  description: description,
                  state: state,
                  subtasks: subtasks,
                  id: id,
                },
              ],
            }
          } else {
            return {
              ...board,
              tasks: [
                {
                  title: title,
                  description: description,
                  state: state,
                  subtasks: subtasks,
                  id: id,
                },
              ],
            }
          }
        } else {
          return board
        }
      })
    })
  }

  function deleteBoard(id: string | undefined) {
    setBoards((prevBoards) => {
      return prevBoards.filter((board) => board.id !== id)
    })
  }

  function deleteTask(id: string | undefined) {
    setBoards((prevBoards) => {
      return prevBoards.map((board) => {
        return {
          ...board,
          tasks: board.tasks?.filter((task: any) => task.id !== id),
        }
      })
    })
  }

  function editBoard(id: string | undefined, newName: string) {
    setBoards((prev) => {
      return prev.map((board) => {
        if (board.id === id) {
          return {
            ...board,
            name: newName,
          }
        } else {
          return board
        }
      })
    })
  }

  function editTask(
    currentBoard: string | undefined,
    id: string | undefined,
    title: string | undefined,
    description: string | undefined,
    state: string | undefined,
    subtasks: any[] | undefined
  ) {
    setBoards((prev) => {
      return prev.map((board) => {
        if (board.id === currentBoard) {
          return {
            ...board,
            tasks: board.tasks.map((task: any) => {
              if (task.id === id) {
                return {
                  ...task,
                  title: title !== "" ? title : task.title,
                  description:
                    description !== "" ? description : task.description,
                  state: state !== "" ? state : task.state,
                  subtasks: subtasks?.length !== 0 ? subtasks : task.subtasks,
                }
              } else {
                return task
              }
            }),
          }
        }
      })
    })
  }

  return (
    <BoardContext.Provider
      value={{
        boards,
        addBoard,
        addTask,
        currentBoard,
        setCurrentBoard,
        deleteBoard,
        deleteTask,
        editBoard,
        editTask,
      }}
    >
      {children}
    </BoardContext.Provider>
  )
}
