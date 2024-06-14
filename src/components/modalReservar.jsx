import { useState, useEffect } from 'react'
import {
  Box,
  Modal,
  TextField,
  Button,
  Typography,
  Snackbar,
  SnackbarContent,
} from '@mui/material'
import PropTypes from 'prop-types'
import eventoService from 'src/Services/evento.service'
import { Evento } from 'src/Dominio/evento'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 300,
  maxHeight: '90vh',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  const formattedDate = date.toISOString().split('T')[0]
  return formattedDate
}

const calcularDiasEntreFechas = (startDate, endDate) => {
  const start = new Date(startDate)
  const end = new Date(endDate)
  const diffInTime = end - start
  const diffInDays = Math.ceil(diffInTime / (1000 * 60 * 60 * 24)) + 1
  return diffInDays
}

const BasicModal = ({ openModal, cerrarModal, instalacion, evento }) => {
  const { nombreDeInstalacion, id, fechasReservadas, montoDeReserva } = instalacion || {}
  const [nombreDelEvento, setNombreDelEvento] = useState('')
  const [nombreInstalacion, setNombreInstalacion] = useState('')
  const [fechaEventoIni, setFechaEventoIni] = useState('')
  const [fechaEventoFin, setFechaEventoFin] = useState('')
  const [presupuesto, setPresupuesto] = useState('')
  const [mostrarMensajeExito, setMostrarMensajeExito] = useState(false)
  const [mostrarMensajeError, setMostrarMensajeError] = useState(false)
  const [errorMensaje, setErrorMensaje] = useState('')
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(null)
  const [fechasDeshabilitadas, setFechasDeshabilitadas] = useState([])
  const [cantidadDias, setCantidadDias] = useState(0)
  const [snackbarColor, setSnackbarColor] = useState('')

  useEffect(() => {
    if (evento) {
      setNombreDelEvento(evento.nombreDelEvento)
      setNombreInstalacion(evento.lugar.nombreDeInstalacion)
      setFechaEventoIni(formatDate(evento.fechaEventoIni))
      setFechaEventoFin(formatDate(evento.fechaEventoFin))
      setPresupuesto(evento.presupuesto)
      
    } else {
      setNombreInstalacion(nombreDeInstalacion)
      limpiarDatos()
    }
  }, [evento, nombreDeInstalacion])

  useEffect(() => {
    if (fechasReservadas) {
      actualizarFechasDeshabilitadas(fechasReservadas)
    }
  }, [fechasReservadas])

  useEffect(() => {
    if (startDate && endDate) {
      const dias = calcularDiasEntreFechas(startDate, endDate)
      setCantidadDias(dias)
    }
  }, [startDate, endDate])

  const actualizarFechasDeshabilitadas = (fechas) => {
    const formattedDates = fechas.map(({ fechaIni, fechaFin }) => {
      const dates = []
      const currentDate = new Date(fechaIni)
      const endDate = new Date(fechaFin)

      while (currentDate <= endDate) {
        dates.push(new Date(currentDate))
        currentDate.setDate(currentDate.getDate() + 1)
      }

      return dates
    }).flat()

    setFechasDeshabilitadas(formattedDates)
  }

  const crearOEditarEvento = async () => {
    const nuevoEvento = new Evento()
    nuevoEvento.nombreDelEvento = nombreDelEvento

    if (!evento) {
      nuevoEvento.Lugar = id
    } else {
      nuevoEvento.Lugar = evento.Lugar
    }

    nuevoEvento.fechaEventoIni = new Date(startDate).toISOString()
    nuevoEvento.fechaEventoFin = new Date(endDate).toISOString()
    nuevoEvento.owner = localStorage.getItem('usuId')
    nuevoEvento.presupuesto = presupuesto
    nuevoEvento.dias = cantidadDias

    try {
      if (evento && evento.id) {
        nuevoEvento.id = evento.id
        const respuestaEditarEvento = await eventoService.editarEvento(nuevoEvento)
        console.log('Respuesta de edición de evento:', respuestaEditarEvento)
        mostrarSnackbar('¡El evento se editó correctamente!', 'success')
      } else {
        const respuestaCrearEvento = await eventoService.crearEvento(nuevoEvento)
        console.log('Respuesta de creación de evento:', respuestaCrearEvento)
        mostrarSnackbar('¡El evento se creó correctamente!', 'success')
        // Actualizar fechas reservadas con las nuevas fechas del evento creado
        const nuevasFechasReservadas = [
          ...fechasReservadas,
          { fechaIni: startDate, fechaFin: endDate }
        ]
        actualizarFechasDeshabilitadas(nuevasFechasReservadas)
      }

      limpiarDatos()
    } catch (error) {
      console.error('Error al crear o editar el evento:', error)
      mostrarSnackbar('Error al crear o editar el evento', 'error')
    }
  }

  const limpiarDatos = () => {
    setNombreDelEvento('')
    setFechaEventoIni('')
    setFechaEventoFin('')
    setPresupuesto('')
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (
      fechasDeshabilitadas.includes(fechaEventoIni) ||
      fechasDeshabilitadas.includes(fechaEventoFin)
    ) {
      setErrorMensaje('Las fechas seleccionadas están deshabilitadas')
      setMostrarMensajeError(true)
      return
    }

    await crearOEditarEvento()
  }

  useEffect(() => {
    if (mostrarMensajeExito.variant === 'success') {
      setSnackbarColor('#388e3c')
    } else if (mostrarMensajeExito.variant === 'error') {
      setSnackbarColor('#f44336')
    }
  }, [mostrarMensajeExito])

  const mostrarSnackbar = (mensaje, variant) => {
    setMostrarMensajeExito({ mostrar: true, mensaje, variant })
  }

  const handleCloseSnackbar = () => {
    setMostrarMensajeExito(false)
    cerrarModal()
  }

  const handleCloseErrorSnackbar = () => {
    setMostrarMensajeError(false)
  }

  const onChange = (dates) => {
    const [start, end] = dates
    setStartDate(start)
    setEndDate(end)
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
          <Typography
            variant="h6"
            align="center"
            gutterBottom
            style={{ color: evento ? 'black' : 'black' }}
          >
            {evento ? 'Editar Evento' : 'Reservar'}
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
                id="standard-basic"
                name="nombre"
                label="Nombre"
                variant="standard"
                value={nombreDelEvento}
                onChange={(e) => setNombreDelEvento(e.target.value)}
                style={{ marginBottom: '1rem' }}
              />
              <TextField
                id="standard-basic"
                name="lugar"
                label="Lugar"
                variant="standard"
                style={{ marginBottom: '1rem' }}
                value={nombreInstalacion}
                disabled
              />

              <TextField
                id="standard-basic"
                name="presupuesto"
                label="Presupuesto"
                variant="standard"
                value={presupuesto}
                onChange={(e) => setPresupuesto(e.target.value)}
                style={{ marginBottom: '1rem' }}
                disabled={!!evento}
              />
              <Typography variant="subtitle1" style={{ marginBottom: '0.5rem', marginTop: '1rem' }}>
                Fecha de Reserva
              </Typography>
              <DatePicker
                minDate={new Date()}
                selected={startDate}
                onChange={onChange}
                startDate={startDate}
                endDate={endDate}
                excludeDates={fechasDeshabilitadas}
                selectsRange
                selectsDisabledDaysInRange
              />

              <Typography variant="subtitle1" style={{ marginTop: '1rem' }}>
                Días entre fechas: {cantidadDias}
              </Typography>
              <Typography variant="subtitle1" style={{ marginTop: '1rem' }}>
                La cantidad a pagar : {montoDeReserva * cantidadDias}
              </Typography>
            
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
                <Button variant="text" onClick={cerrarModal}>
                  Volver
                </Button>
                <Button type="submit" variant="text">
                  {evento ? 'Editar' : 'Reservar'}
                </Button>
              </div>
            </div>
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
           backgroundColor: snackbarColor,
          }}
          message={mostrarMensajeExito.mensaje}
        />

      </Snackbar>

      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={mostrarMensajeError}
        autoHideDuration={2500}
        onClose={handleCloseErrorSnackbar}
      >
        <SnackbarContent
          style={{ backgroundColor: '#f44336' }}
          message={errorMensaje}
        />
      </Snackbar>
    </>
  )
}

BasicModal.propTypes = {
  openModal: PropTypes.bool,
  cerrarModal: PropTypes.func,
  instalacion: PropTypes.object,
  evento: PropTypes.object,
}

export default BasicModal
