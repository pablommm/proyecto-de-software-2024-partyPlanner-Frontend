import { useState, useEffect } from 'react'
import { Box, Modal, TextField, Button, Typography, Snackbar, SnackbarContent } from '@mui/material'
import PropTypes from 'prop-types'
import eventoService from 'src/Services/evento.service'
import { Evento } from 'src/Dominio/evento'

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

const formatDate = (dateString) => {
    const date = new Date(dateString)
    const formattedDate = date.toISOString().split('T')[0]
    return formattedDate
}

const fechasDeshabilitadas = ['2024-06-15', '2024-06-20'] // Ejemplo de fechas deshabilitadas

const BasicModal = ({ openModal, cerrarModal, instalacion, evento }) => {
    const { nombreDeInstalacion, id } = instalacion || {}
    const [nombreDelEvento, setNombreDelEvento] = useState('')
    const [nombreInstalacion, setNombreInstalacion] = useState('')
    const [fechaEventoIni, setFechaEventoIni] = useState('')
    const [fechaEventoFin, setFechaEventoFin] = useState('')
    const [presupuesto, setPresupuesto] = useState('')
    const [mostrarMensajeExito, setMostrarMensajeExito] = useState(false)
    const [mostrarMensajeError, setMostrarMensajeError] = useState(false)
    const [errorMensaje, setErrorMensaje] = useState('')

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

    const crearOEditarEvento = async () => {
        const nuevoEvento = new Evento()
        nuevoEvento.nombreDelEvento = nombreDelEvento

        if (!evento) {
            nuevoEvento.Lugar = id
        } else {
            nuevoEvento.Lugar = evento.Lugar
        }

        nuevoEvento.fechaEventoIni = new Date(fechaEventoIni).toISOString()
        nuevoEvento.fechaEventoFin = new Date(fechaEventoFin).toISOString()
        nuevoEvento.owner = localStorage.getItem('usuId')
        nuevoEvento.presupuesto = presupuesto

        try {
            if (evento && evento.id) {
                nuevoEvento.id = evento.id
                const respuestaEditarEvento = await eventoService.editarEvento(nuevoEvento)
                console.log("Respuesta de edición de evento:", respuestaEditarEvento)
                mostrarSnackbar('¡El evento se editó correctamente!', 'success')
            } else {
                const respuestaCrearEvento = await eventoService.crearEvento(nuevoEvento)
                console.log("Respuesta de creación de evento:", respuestaCrearEvento)
                mostrarSnackbar('¡El evento se creó correctamente!', 'success')
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

        // Verificar si las fechas seleccionadas están deshabilitadas
        if (fechasDeshabilitadas.includes(fechaEventoIni) || fechasDeshabilitadas.includes(fechaEventoFin)) {
            setErrorMensaje('Las fechas seleccionadas están deshabilitadas')
            setMostrarMensajeError(true)
            return // Detener la ejecución si alguna fecha está deshabilitada
        }

        // Resto del código para crear o editar el evento
        await crearOEditarEvento()
    }

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

    const disableDates = (date) => {
        // Formatear la fecha para compararla con las fechas deshabilitadas
        const formattedDate = new Date(date).toISOString().split('T')[0]

        // Obtener la fecha actual en el mismo formato
        const today = new Date().toISOString().split('T')[0]

        // Devolver true si la fecha está en la lista de fechas deshabilitadas o es anterior a hoy
        return fechasDeshabilitadas.includes(formattedDate) || formattedDate < today
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
                        {evento ? 'Editar Evento' : 'Reservar'}
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <div style={{ display: 'flex', flexDirection: 'column', color: 'black' }}>
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
                                name="fecha Inicio"
                                variant="standard"
                                style={{ marginBottom: '1rem' }}
                                type="date"
                                value={fechaEventoIni}
                                onChange={(e) => setFechaEventoIni(e.target.value)}
                                disabled={!!evento}
                                InputProps={{
                                    inputProps: {
                                        min: formatDate(new Date()), // Deshabilitar fechas anteriores a hoy
                                        disabledDates: disableDates // Propiedad personalizada para deshabilitar fechas específicas
                                    },
                                }}
                            />
                            <TextField
                                id="standard-basic"
                                name="fecha Final"
                                variant="standard"
                                style={{ marginBottom: '1rem' }}
                                type="date"
                                value={fechaEventoFin}
                                onChange={(e) => setFechaEventoFin(e.target.value)}
                                disabled={!!evento}
                                InputProps={{
                                    inputProps: {
                                        min: formatDate(new Date()), // Deshabilitar fechas anteriores a hoy
                                        disabledDates: disableDates // Propiedad personalizada para deshabilitar fechas específicas
                                    },
                                }}
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
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
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
                        backgroundColor: mostrarMensajeExito.variant === 'success' ? '#388e3c' : '#f44336',
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
                <SnackbarContent style={{ backgroundColor: '#f44336' }} message={errorMensaje} />
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
