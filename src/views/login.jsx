import { TextField, Button, Container, Box, Grid, Typography } from '@mui/material'

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
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 1, mb: 2 }}
          >
            Ingresar
          </Button>
        </form>
      </Box>
    </Container>
  )
}

export default LoginView
