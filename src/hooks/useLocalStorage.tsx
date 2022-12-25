import { useEffect, useState } from "react"

export function useLocalStorage<T>(key: string, initialValue?: T) {
  const [value, setValue] = useState<T>(() => {
    const intialValue = localStorage.getItem(key)
    if (intialValue !== null) {
      return JSON.parse(intialValue)
    } else {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue] as [typeof value, typeof setValue]
}
