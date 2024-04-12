import { Box, ThemeProvider, createTheme } from '@mui/material'
import './App.css'
import { PartyRouter } from './router'

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

  return (
  
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
      )
}

export default App
