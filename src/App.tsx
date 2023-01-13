import { Grid, GridItem } from "@chakra-ui/react"
import { Topbar } from "./Layouts/Topbar"
import { Sidebar } from "./Layouts/Sidebar"
import { Board } from "./Layouts/Board"

function App() {
  return (
    <div className="fixed h-screen w-screen bg-slate-900">
      <Grid
        height="100vh"
        padding={6}
        width="100vw"
        templateColumns="repeat(5, 1fr)"
        templateRows="repeat(10, 1fr)"
        gap={4}
      >
        <GridItem colSpan={1} rowStart={1} rowEnd={11}>
          <Sidebar />
        </GridItem>
        <GridItem colStart={2} colEnd={6} rowSpan={1}>
          <Topbar />
        </GridItem>
        <GridItem colStart={2} colEnd={6} rowStart={2} rowEnd={11}>
          <Board />
        </GridItem>
      </Grid>
    </div>
  )
}

export default App
