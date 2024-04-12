import { TextField, Button, Container, Box, InputAdornment, InputLabel } from '@mui/material'
import LockIcon from '@mui/icons-material/Lock'
import PersonIcon from '@mui/icons-material/Person'


const LoginView = () => {

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


        <form
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          }}
        >
          <InputLabel htmlFor="username" sx={{ alignSelf: 'flex-start' }}>
            Usuario
          </InputLabel>
          <TextField
            variant="outlined"
            type="text"
            placeholder="Usuario"
            InputProps={{
              startAdornment:
                <InputAdornment position="start">
                  <PersonIcon />
                </InputAdornment>
              ,
            }}
            sx={{ width: '100%' }}
          />
          <InputLabel htmlFor="password" sx={{ alignSelf: 'flex-start' }}>
            Contraseña
          </InputLabel>
          <TextField
            variant="outlined"
            type="password"
            placeholder="Contraseña"
            InputProps={{
              startAdornment:
                <InputAdornment position="start">
                  <LockIcon />
                </InputAdornment>
              ,
            }}
            sx={{ width: '100%' }}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Ingresar
          </Button>
        </form>
      </Box>
    </Container>
  )
}

export default LoginView
