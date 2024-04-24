import { useNavigate  } from 'react-router-dom'
import { TextField, Button, Container, Box, Grid, Typography,Alert } from '@mui/material'
import { useState } from 'react'
import usuarioService from '../Services/login.service'

const LoginView = () => {
  const navigate = useNavigate()
  const [usuario, setUsuario] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const iniciarSesion = async () => {
    try {
      if (!usuario || !password) {
        setError('Por favor, complete todos los campos')
        return
      }
      const usuarioId = await usuarioService.validarUsuario(usuario, password)
     
      console.log('Inicio de sesión exitoso. ID de usuario:', usuarioId)
      localStorage.setItem('usuId', usuarioId.toString())
      navigate('/instalaciones')
    } catch (error) {

      console.error('Error al iniciar sesión:', error.message)
      setError('Error al iniciar sesión. Por favor, verifica tus datos.')
    }
  }

  return (
    <Container maxWidth="xs" className='main'>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          mt: 3,
        }}
      >
        <img src="/logoIII.png" alt="Logo" style={{ width: '150px', marginBottom: '1rem' }} />
        <Typography component="h1" variant="h5" style={{ marginBottom: '1rem' }} >
          Iniciar sesión
        </Typography>

        <form
          onSubmit={(event) => {
            event.preventDefault()
            iniciarSesion()
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                onChange={(event) => setUsuario(event.target.value)}
                autoComplete="given-name"
                name="User-name"
                required
                fullWidth
                id="userName"
                label="User Name"
                autoFocus
                value = {usuario}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={(event) => setPassword(event.target.value)}
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                value = {password}
              />
            </Grid>
          </Grid>
          <Button
            type = "Submit"
  
            variant="contained"
            sx={{ mt: 1, mb: 2 }}
          >
            Ingresar
          </Button>
          {error && <Alert severity="error" style={{ position: 'absolute', bottom: '60px' }}> {error}</Alert>
        }
         
        </form>
      </Box>
    </Container>
  )
}

export default LoginView
