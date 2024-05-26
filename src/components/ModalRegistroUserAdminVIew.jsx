import {
  Box,
  Modal,
  TextField,
  Button,
  Typography,
  Grid
} from '@mui/material'
import PropTypes from 'prop-types'
import { useState} from 'react'
import { Link as RouterLink } from "react-router-dom"
import { useNavigate } from 'react-router-dom'
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
    
const UserModal = ({ openModal, cerrarModal,actualizarUser }) => {
  
  const [nombre, setNombre] = useState('')
  const [apellido, setApellido] = useState('')
  const [username, setUsername] = useState('')
  const [pwd, setPwd] = useState('')

  const crear = async () => {
    const nuevoUsuario = new UsuarioRegistro()
    nuevoUsuario.nombre = nombre
    nuevoUsuario.apellido = apellido
    nuevoUsuario.usuario = username
    nuevoUsuario.pwd = pwd

    console.log('Nuevo usuario:', nuevoUsuario)

    const respuestaCrearUsuario =
      await usuarioService.crearUsuario(nuevoUsuario)
    actualizarUser()
    limpiarDatos()
    console.log('Respuesta de creación de evento:', respuestaCrearUsuario)
    console.log('usuario creado exitosamente.')
  }

  const limpiarDatos = () => {
    setNombre('')
    setApellido('')
    setUsername('')
    setPwd('')
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

    </>
  )
}

UserModal.propTypes = {
  openModal: PropTypes.bool.isRequired,
  cerrarModal: PropTypes.func.isRequired,
  actualizarUser: PropTypes.func.isRequired,
}

export default UserModal
