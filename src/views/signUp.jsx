
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Link from '@mui/material/Link'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { Container, Grid } from '@mui/material'



const SignUpView = () => {

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

                <Typography component="h1" variant="h5" style={{ marginBottom: '1rem' }}>
                    Registrate
                </Typography>
                <form
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1rem',
                    }}
                >
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="given-name"
                                name="firstName"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                                autoComplete="family-name"
                            />
                        </Grid>
                        <Grid item xs={12} >
                            <TextField
                                autoComplete="given-name"
                                name="UserName"
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
                        Registrarme
                    </Button>
                    <Link href="#" variant="body2">
                        Ya tienes una cuenta? inicia sesion
                    </Link>
                </form>
            </Box>
        </Container>

    )
}
export default SignUpView
