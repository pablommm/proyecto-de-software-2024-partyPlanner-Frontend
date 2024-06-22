import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import PropTypes from 'prop-types'
import {
  TextField,
  Button,
  Typography,
  Snackbar,
  SnackbarContent,
  FormControlLabel,
  Checkbox,
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
  maxHeight: '80vh',
  overflowY: 'auto',
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
  const [image] = useState([])
  const [montoDeReserva, setMontoDeReserva] = useState('')
  const [calle, setCalle] = useState('')
  const [altura, setAltura] = useState('')
  const [provincia, setProvincia] = useState('')
  const [numeroDeTelefono, setNumeroDeTelefono] = useState('')
  const [mail, setMail] = useState('')
  const [baños, setBaños] = useState('')
  const [terraza, setTerraza] = useState(false)
  const [jardin, setJardin] = useState(false)
  const [estacionamiento, setEstacionamiento] = useState(false)
  const [alojamiento, setAlojamiento] = useState(false)
  const [cocina, setCocina] = useState(false)

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
      setMontoDeReserva(instalacion.montoDeReserva || '')
      setCalle(instalacion.calle || '')
      setAltura(instalacion.altura || '')
      setProvincia(instalacion.provincia || '')
      setNumeroDeTelefono(instalacion.numeroDeTelefono || '')
      setMail(instalacion.mail || '')
      setBaños(instalacion.baños || '')
      setTerraza(instalacion.terraza || false)
      setJardin(instalacion.jardin || false)
      setEstacionamiento(instalacion.estacionamiento || false)
      setAlojamiento(instalacion.alojamiento || false)
      setCocina(instalacion.cocina || false)
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
      montoDeReserva: montoDeReserva,
      calle: calle,
      altura: altura,
      provincia: provincia,
      numeroDeTelefono: numeroDeTelefono,
      mail: mail,
      baños: baños,
      terraza: terraza,
      jardin: jardin,
      estacionamiento: estacionamiento,
      alojamiento: alojamiento,
      cocina: cocina,
      owner: localStorage.getItem('usuId'),
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
        console.log('Respuesta de creación de instalación:', respuestaCrearInstalacion)
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
    setMontoDeReserva('')
    setCalle('')
    setAltura('')
    setProvincia('')
    setNumeroDeTelefono('')
    setMail('')
    setBaños('')
    setTerraza(false)
    setJardin(false)
    setEstacionamiento(false)
    setAlojamiento(false)
    setCocina(false)
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
              <TextField
                id="montoDeReserva"
                name="montoDeReserva"
                label="Monto de Reserva"
                variant="standard"
                value={montoDeReserva}
                onChange={(e) => setMontoDeReserva(e.target.value)}
                style={{ marginBottom: '1rem' }}
              />
              <TextField
                id="calle"
                name="calle"
                label="Calle"
                variant="standard"
                value={calle}
                onChange={(e) => setCalle(e.target.value)}
                style={{ marginBottom: '1rem' }}
              />
              <TextField
                id="altura"
                name="altura"
                label="Altura"
                variant="standard"
                value={altura}
                onChange={(e) => setAltura(e.target.value)}
                style={{ marginBottom: '1rem' }}
              />
              <TextField
                id="provincia"
                name="provincia"
                label="Provincia"
                variant="standard"
                value={provincia}
                onChange={(e) => setProvincia(e.target.value)}
                style={{ marginBottom: '1rem' }}
              />
              <TextField
                id="numeroDeTelefono"
                name="numeroDeTelefono"
                label="Número de Teléfono"
                variant="standard"
                value={numeroDeTelefono}
                onChange={(e) => setNumeroDeTelefono(e.target.value)}
                style={{ marginBottom: '1rem' }}
              />
              <TextField
                id="mail"
                name="mail"
                label="Email"
                variant="standard"
                value={mail}
                onChange={(e) => setMail(e.target.value)}
                style={{ marginBottom: '1rem' }}
              />
              <TextField
                id="baños"
                name="baños"
                label="Cantidad de Baños"
                variant="standard"
                value={baños}
                onChange={(e) => setBaños(e.target.value)}
                style={{ marginBottom: '1rem' }}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={terraza}
                    onChange={(e) => setTerraza(e.target.checked)}
                    color="primary"
                  />
                }
                label="Terraza"
                style={{ marginBottom: '1rem' }}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={jardin}
                    onChange={(e) => setJardin(e.target.checked)}
                    color="primary"
                  />
                }
                label="Jardín"
                style={{ marginBottom: '1rem' }}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={estacionamiento}
                    onChange={(e) => setEstacionamiento(e.target.checked)}
                    color="primary"
                  />
                }
                label="Estacionamiento"
                style={{ marginBottom: '1rem' }}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={alojamiento}
                    onChange={(e) => setAlojamiento(e.target.checked)}
                    color="primary"
                  />
                }
                label="Alojamiento"
                style={{ marginBottom: '1rem' }}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={cocina}
                    onChange={(e) => setCocina(e.target.checked)}
                    color="primary"
                  />
                }
                label="Cocina"
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
