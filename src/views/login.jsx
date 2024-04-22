import { useNavigate  } from 'react-router-dom'
import { TextField, Button, Container, Box, Grid, Typography } from '@mui/material'
import { useState } from 'react'
import LoginService from '../Services/login.service'

const LoginView = () => {
  const navigate = useNavigate()
  const [usuario, setUsuario] = useState('')
  const [password, setPassword] = useState('')
  const [snackbarOpen, setSnackbarOpen] = useState(false)

  const getLoginUser = async () => {
    const loginData = { user: usuario, pass: password }
    try {
      const userData = await LoginService.getUsuarioLogin(loginData)
      console.log('Usuario autenticado:', userData)
      //rolUser(userData)
      navigate('/instalaciones', {state:{usuario:userData}})
    } catch (error) {
      mostrarMensajeError(error, setErrorMessage)
      setSnackbarOpen(true)
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
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
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
              />
            </Grid>
          </Grid>
          <Button
            onClick={getLoginUser}
            //component={Link}
            //to="/instalaciones"
            //fullWidth
            variant="contained"
            sx={{ mt: 1, mb: 2 }}
          >
            Ingresar
          </Button>

          {snackbarOpen && 
                    <div className="notification is-danger">
                      <button
                        className="delete"
                        onClick={() => setSnackbarOpen(false)}
                      ></button>
                      {errorMessage}
                    </div>
                  }
        </form>
      </Box>
    </Container>
  )
}

export default LoginView
