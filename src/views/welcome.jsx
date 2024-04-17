import { Container, Box, Typography, Button } from '@mui/material'
import { Link } from 'react-router-dom'

const Welcome = () => {
  return (
    <Container maxWidth="xs" className='main'>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          mt: 10,
          gap: '1rem',
        }}
      >
        <Typography variant="h4" gutterBottom>
          ¡Bienvenido!
        </Typography>


        <Button
          component={Link} to="/login"
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ my: 1 }}
        >
          Iniciar Sesión
        </Button>

        <Button
          component={Link} to="/sign-up"
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ my: 1 }}
        >
          Registrarse
        </Button>
      </Box>
    </Container>
  )
}

export default Welcome
