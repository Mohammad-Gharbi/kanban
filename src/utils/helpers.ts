const colors = [
  "red",
  "orange",
  "yellow",
  "green",
  "teal",
  "blue",
  "cyan",
  "purple",
  "pink",
]

export function randomColor() {
  const color = colors[Math.floor(Math.random() * colors.length)]
  return color
}

export function uniqueStatuses(value: string, index: number, array: string[]) {
  return array.indexOf(value) === index
}
