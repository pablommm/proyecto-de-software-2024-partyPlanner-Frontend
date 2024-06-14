import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import PropTypes from 'prop-types'
import {
  TextField,
  Button,
  Typography,
  Snackbar,
  SnackbarContent,
} from '@mui/material'
import { useState, useEffect } from 'react'
import instalacionService from 'src/Services/instalaciones.service'

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

const InstalacionModal = ({
  openModal,
  cerrarModal,
  instalacion,
  actualizarInstalacion,
}) => {
  const [nombre, setNombre] = useState('')
  const [localidad, setLocalidad] = useState('')
  const [costoInstalacion, setCostoInstalacion] = useState('')
  const [capacidadInstalacion, setCapacidadInstalacion] = useState('')
  const [descripcionInstalacion, setDescripcionInstalacion] = useState('')
  const [imagenPrincipal, setImagenPrincipal] = useState('')
  const [image, setImage] = useState([])

  const uploadToServer = async (e) => {
    const imageFile = e.target.files[0]
    const url = `https://api.imgbb.com/1/upload?&key=bf6dc07a9169a884477289872654d8fd&name=${imageFile.name})`
    const data = new FormData()
    data.append('image', imageFile)
    try {
      const response = await fetch(url, {
        method: 'POST',
        body: data,
      })
      const responseData = await response.json()
      setImagenPrincipal(responseData.data.url)
    } catch (error) {
      console.error(error)
    }
  }

  const [mostrarMensajeExito, setMostrarMensajeExito] = useState({
    mostrar: false,
    mensaje: '',
    variant: '',
  })

  const [snackbarColor, setSnackbarColor] = useState('')

  useEffect(() => {
    if (instalacion) {
      setNombre(instalacion.nombreDeInstalacion || '')
      setLocalidad(instalacion.localidadDeInstalacion || '')
      setCostoInstalacion(instalacion.costoDeInstalacion || '')
      setCapacidadInstalacion(instalacion.capacidadInstalacion || '')
      setDescripcionInstalacion(instalacion.descripcionDeInstalacion || '')
      setImagenPrincipal(instalacion.imagenPrincipal || '')
    } else {
      limpiarDatos()
    }
  }, [instalacion])

  useEffect(() => {
    if (mostrarMensajeExito.variant === 'success') {
      setSnackbarColor('#388e3c')
    } else if (mostrarMensajeExito.variant === 'error') {
      setSnackbarColor('#f44336')
    }
  }, [mostrarMensajeExito])

  const handleSubmit = async (event) => {
    event.preventDefault()

    const datosInstalacion = {
      nombreDeInstalacion: nombre,
      localidadDeInstalacion: localidad,
      costoDeInstalacion: costoInstalacion,
      capacidadInstalacion: capacidadInstalacion,
      descripcionDeInstalacion: descripcionInstalacion,
      imagenPrincipal: imagenPrincipal,
    }

    try {
      if (instalacion) {
        const respuestaEditar = await instalacionService.actualizarInstalacion({
          ...datosInstalacion,
          id: instalacion.id,
        })
        mostrarSnackbar(
          '¡La instalación se actualizó correctamente!',
          'success',
        )
        console.log('Respuesta de edición de instalación:', respuestaEditar)
        console.log('Instalación editada exitosamente.')
      } else {
        const respuestaCrearInstalacion =
          await instalacionService.crearInstalacion(datosInstalacion)
        mostrarSnackbar('¡La instalación se creó correctamente!', 'success')
        console.log('Respuesta de creación de instalación:',respuestaCrearInstalacion)
        console.log('Instalación creada exitosamente.')
      }
      cerrarModal()
      limpiarDatos()
      actualizarInstalacion()

    } catch (error) {
      console.error('Error al guardar la instalación:', error)
      mostrarSnackbar(
        'Error al guardar la instalación. Inténtelo nuevamente.',
        'error',
      )
    }
  }

  const limpiarDatos = () => {
    setNombre('')
    setLocalidad('')
    setCostoInstalacion('')
    setCapacidadInstalacion('')
    setDescripcionInstalacion('')
    setImagenPrincipal('')
  }

  const mostrarSnackbar = (mensaje, variant) => {
    setMostrarMensajeExito({ mostrar: true, mensaje, variant })
  }

  const handleCloseSnackbar = () => {
    setMostrarMensajeExito({ mostrar: false, mensaje: '', variant: '' })
  }

  return (
    <>
      <Modal
        open={openModal}
        onClose={cerrarModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography variant="h6" align="center" gutterBottom>
            {instalacion ? 'Editar Instalación' : 'Crear Instalación'}
          </Typography>
          <form onSubmit={handleSubmit}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                color: 'black',
              }}
            >
              <TextField
                id="nombre"
                name="nombre"
                label="Nombre"
                variant="standard"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                style={{ marginBottom: '1rem' }}
              />
              <TextField
                id="localidad"
                name="localidad"
                label="Localidad"
                variant="standard"
                value={localidad}
                onChange={(e) => setLocalidad(e.target.value)}
                style={{ marginBottom: '1rem' }}
              />
              <TextField
                id="costo"
                name="costo"
                label="Costo"
                variant="standard"
                value={costoInstalacion}
                onChange={(e) => setCostoInstalacion(e.target.value)}
                style={{ marginBottom: '1rem' }}
              />
              <TextField
                id="capacidad"
                name="capacidad"
                label="Capacidad"
                variant="standard"
                value={capacidadInstalacion}
                onChange={(e) => setCapacidadInstalacion(e.target.value)}
                style={{ marginBottom: '1rem' }}
              />
              <TextField
                id="descripcion"
                name="descripcion"
                label="Descripción"
                variant="standard"
                value={descripcionInstalacion}
                onChange={(e) => setDescripcionInstalacion(e.target.value)}
                style={{ marginBottom: '1rem' }}
              />
              <TextField
                id="imagen"
                name="imagen"
                label="Imagen"
                type="file"
                onChange={uploadToServer}
                variant="standard"
                value={image}
                //onChange={(e) => setImagenPrincipal(e.target.value)}
                style={{ marginBottom: '1rem' }}
              />
              <TextField
                id="descripcion2"
                name="descripcion2"
                label="Descripción2"
                variant="standard"
                value={imagenPrincipal}
                onChange={(e) => setImagenPrincipal(e.target.value)}
                disabled={true}
                style={{ marginBottom: '1rem' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button variant="text" onClick={cerrarModal}>
                  Cancelar
                </Button>
                <Button type="submit" variant="text">
                  {instalacion ? 'Guardar Cambios' : 'Crear'}
                </Button>
              </div>
            </div>
          </form>
        </Box>
      </Modal>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={mostrarMensajeExito.mostrar}
        autoHideDuration={2500}
        onClose={handleCloseSnackbar}
      >
        <SnackbarContent
          style={{
            backgroundColor: snackbarColor,
          }}
          message={mostrarMensajeExito.mensaje}
        />
      </Snackbar>
    </>
  )
}

InstalacionModal.propTypes = {
  openModal: PropTypes.bool,
  cerrarModal: PropTypes.func,
  instalacion: PropTypes.object,
  actualizarInstalacion: PropTypes.func.isRequired,
}

export default InstalacionModal
