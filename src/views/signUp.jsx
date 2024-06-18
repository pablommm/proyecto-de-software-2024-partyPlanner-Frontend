import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { Checkbox, Container, FormControlLabel, Grid, Alert } from '@mui/material'
import { Link as RouterLink } from "react-router-dom"
import { useState } from 'react'
import { UsuarioRegistro } from 'src/Dominio/Usuario'
import usuarioService from 'src/Services/usuario.service'
import { useNavigate } from 'react-router-dom'

const SignUpView = () => {
    const navigate = useNavigate()
    const [nombre, setNombre] = useState('')
    const [apellido, setApellido] = useState('')
    const [username, setUsername] = useState('')
    const [pwd, setPwd] = useState('')
    const [rol, setRol] = useState(false)

    const [error, setError] = useState(false)

    const crear = async () => {
        const nuevoUsuario = new UsuarioRegistro()
        nuevoUsuario.nombre = nombre
        nuevoUsuario.apellido = apellido
        nuevoUsuario.usuario = username
        nuevoUsuario.pwd = pwd
        nuevoUsuario.rol = rol ? 'PROPIETARIO' : 'CONSUMIDOR'



        console.log("Nuevo usuario:", nuevoUsuario)
        try {

            const respuestaCrearUsuario = await usuarioService.crearUsuario(nuevoUsuario)
            console.log("Respuesta de creación de evento:", respuestaCrearUsuario)
            console.log("usuario creado exitosamente.")
            navigate('/login')
        }
        catch {
            setError('Este usuario ya existe. Intentelo nuevamente.')
        }

    }


    const handleSubmit = (event) => {
        event.preventDefault()
        console.log("se crea el usuario")
        crear()
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

                <Typography component="h1" variant="h5" style={{ marginBottom: '1rem' }}>
                    Registrate
                </Typography>
                <form onSubmit={handleSubmit}
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
                                name="Nombre"
                                required
                                fullWidth
                                id="nombre"
                                label="Nombre"
                                autoFocus
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="given-name"
                                name="Apellido"
                                required
                                fullWidth
                                id="Apellido"
                                label="Apellido"
                                autoFocus
                                value={apellido}
                                onChange={(e) => setApellido(e.target.value)}
                            />
                        </Grid>

                        <Grid item xs={12} >
                            <TextField
                                autoComplete="given-name"
                                name="UserName"
                                required
                                fullWidth
                                id="userName"
                                label="username"
                                autoFocus
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="password"
                                label="Contraseña"
                                type="password"
                                id="password"
                                autoComplete="new-password"
                                value={pwd}
                                onChange={(e) => setPwd(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                value="start"
                                labelPlacement="start"
                                label="¿Quiere publicar su Instalación?"
                                control={
                                    <Checkbox
                                        checked={rol}
                                        onChange={(e) => setRol(e.target.checked)}
                                        color="primary"
                                    />
                                }
                                sx={{ '& .MuiFormControlLabel-label': { color: 'black' } }}
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
                    <Box sx={{ textAlign: 'center' }}>
                        <RouterLink to="/login" variant="body2" >
                            ¿Ya tienes una cuenta? Inicia sesión
                        </RouterLink>
                    </Box>
                    {error && <Alert severity="error" style={{ position: 'absolute', bottom: '60px' }}> {error}</Alert>
                    }

                </form>
            </Box>
        </Container>

    )
}
export default SignUpView
