import { useNavigate } from 'react-router-dom'
import { TextField, Button, Container, Box, Grid, Typography, Alert } from '@mui/material'
import { useState, useEffect } from 'react'
import usuarioService from '../Services/login.service'
import { Link as RouterLink } from 'react-router-dom'

import { useContext } from 'react'
import UserContext from 'src/Services/context'


const LoginView = () => {
  const navigate = useNavigate()
  const [usuario, setUsuario] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)

  const [user, setUser] = useContext(UserContext)


  const iniciarSesion = async () => {
    try {
      if (!usuario || !password) {
        setError('Por favor, complete todos los campos')

        return
      }
      const usuarioObjeto = await usuarioService.validarUsuario(usuario, password)
      console.log('Inicio de sesión exitoso. Usuario:', usuarioObjeto)
      const usuarioId = usuarioObjeto.id // Obtener el ID de usuario del objeto de usuario
      localStorage.setItem('usuId', usuarioId.toString())
      console.log("Inicio de sesión exitoso. ID de usuario:", usuarioId)
      setUser(usuarioObjeto) // Puedes almacenar el objeto completo del usuario si lo necesitas
      if(usuarioObjeto.rol == "CONSUMIDOR"){
        navigate('/instalaciones')
     
      }else {
        navigate('/vistaAdmin')
      
    }
    } catch (error) {
      console.error('Error al iniciar sesión:', error.message)
      setError('Error al iniciar sesión. Por favor, verifica tus datos.')
    }
  }

  useEffect(() => {
    console.log("Componente renderizado")
  }, [])


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
        <Typography component="h1" variant="h5" style={{ color:"black", marginBottom: '1rem' }} >
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
                value={usuario}
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
                value={password}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 1, mb: 2 }}
          >
            Iniciar Sesión
          </Button>

          <Box sx={{ textAlign: 'center' }}>
            <RouterLink to="/sign-up" variant="body2" >
              ¿Aún no tienes cuenta? Registrate
            </RouterLink>
          </Box>
          {error && <Alert severity="error" style={{ position: 'absolute', bottom: '60px' }}> {error}</Alert>
          }

        </form>
      </Box>
    </Container>
  )
}

export default LoginView