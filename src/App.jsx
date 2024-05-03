import { Box, ThemeProvider, createTheme } from '@mui/material'
import './App.css'
import { PartyRouter } from './router'
import UserContext from 'src/Services/context'
import { useState } from 'react'

function App() {

  const theme = createTheme({
    palette: {
      primary: {
        main: '#171718',
      },
      secondary: {
        main: '#ff9e80',
      },
    },
  })

  const [user, setUser] = useState(null)

  return (
    //<UserContext.Provider value={{name: "nada"}}>
    <UserContext.Provider value={[user, setUser]}>
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
            minWidth: '100vw'
          }}
        >
          <PartyRouter />
        </Box>
      </ThemeProvider>
    </UserContext.Provider>
  )
}

export default App
