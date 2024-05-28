import {
  Box,
  Modal,
  TextField,
  Button,
  Typography,
  Grid,
  SnackbarContent,
  Snackbar
} from '@mui/material'
import PropTypes from 'prop-types'
import { useState } from 'react'
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 300,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}
import { UsuarioRegistro } from 'src/Dominio/Usuario'
import usuarioService from 'src/Services/usuario.service'

const UserModal = ({ openModal, cerrarModal, actualizarUser }) => {

  const [nombre, setNombre] = useState('')
  const [apellido, setApellido] = useState('')
  const [username, setUsername] = useState('')
  const [pwd, setPwd] = useState('')
  const [mostrarMensajeExito, setMostrarMensajeExito] = useState({ mostrar: false, mensaje: '', variant: '' })

  const crear = async () => {
    const nuevoUsuario = new UsuarioRegistro()
    nuevoUsuario.nombre = nombre
    nuevoUsuario.apellido = apellido
    nuevoUsuario.usuario = username
    nuevoUsuario.pwd = pwd

    console.log('Nuevo usuario:', nuevoUsuario)

    try {
      const respuestaCrearUsuario =
        await usuarioService.crearUsuario(nuevoUsuario)
      mostrarSnackbar('¡El usuario se creó correctamente!', 'success')
      actualizarUser()
      limpiarDatos()
      console.log('Respuesta de creación de evento:', respuestaCrearUsuario)
      console.log('usuario creado exitosamente.')
    } catch (error) {
      console.error('Error al crear el usuario:', error)
      mostrarSnackbar('Error al crear el usuario. Inténtelo nuevamente.', 'error')
    }
  }

  const limpiarDatos = () => {
    setNombre('')
    setApellido('')
    setUsername('')
    setPwd('')
  }

  const mostrarSnackbar = (mensaje, variant) => {
    setMostrarMensajeExito({ mostrar: true, mensaje, variant })
  }

  const handleCloseSnackbar = () => {
    setMostrarMensajeExito({ mostrar: false, mensaje: '', variant: '' })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log("se crea el usuario")
    crear()
    cerrarModal()
    limpiarDatos()
  }

  return (
    <>
      <Modal
        open={openModal}
        onClose={cerrarModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}
        >

          <Typography
            component="h1"
            variant="h5"
            style={{ marginBottom: '1rem' }}
          >
            Registrate
          </Typography>
          <form
            onSubmit={handleSubmit}
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

              <Grid item xs={12}>
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
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 1, mb: 2 }}
            >
              Registrarme
            </Button>

          </form>
        </Box>
      </Modal>
      <Snackbar
        anchorOrigin={{ vertical: 'center', horizontal: 'center' }}
        open={mostrarMensajeExito.mostrar}
        autoHideDuration={2500}
        onClose={handleCloseSnackbar}
      >
        <SnackbarContent
          style={{
            backgroundColor: mostrarMensajeExito.variant === 'success' ? '#388e3c' : '#f44336',
          }}
          message={mostrarMensajeExito.mensaje}
        />
      </Snackbar>
    </>
  )
}

UserModal.propTypes = {
  openModal: PropTypes.bool.isRequired,
  cerrarModal: PropTypes.func.isRequired,
  actualizarUser: PropTypes.func.isRequired,
}

export default UserModal
