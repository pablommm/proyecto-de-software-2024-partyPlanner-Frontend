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
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import instalacionService from 'src/Services/instalacionService'

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

const ModalMantenimiento = ({ openModal, cerrarModal, instalacion }) => {
    const { fechasReservadas } = instalacion || {}
    const [descripcion, setDescripcion] = useState('')
    const [mostrarMensajeExito, setMostrarMensajeExito] = useState(false)
    const [mostrarMensajeError, setMostrarMensajeError] = useState(false)
    const [errorMensaje, setErrorMensaje] = useState('')
    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(null)
    const [fechasDeshabilitadas, setFechasDeshabilitadas] = useState([])
    const [snackbarColor, setSnackbarColor] = useState('')

    useEffect(() => {
        if (fechasReservadas) {
            const fechasDeshabilitadasActualizadas = actualizarFechasDeshabilitadas(fechasReservadas)
            setFechasDeshabilitadas(fechasDeshabilitadasActualizadas)
        }
    }, [fechasReservadas])

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

        return formattedDates
    }

    const crearFechaMantenimiento = async () => {
        const mantenimiento = {
            descripcion,
            fechaIni: startDate.toISOString(),
            fechaFin: endDate.toISOString(),
            instalacionId: instalacion.id,
            //owner: 1
        }

        try {
            console.log('entre al request de mantenimiento instalacion con ', mantenimiento)
            const respuestaCrearMantenimiento = await instalacionService.crearMantenimiento(mantenimiento)
            console.log('Respuesta de creación de evento:', respuestaCrearMantenimiento)
            mostrarSnackbar('¡La fecha se bloqueó correctamente!', 'success')

            const nuevasFechasReservadas = [
                ...fechasReservadas,
                { fechaIni: startDate, fechaFin: endDate }
            ]
            setFechasDeshabilitadas(actualizarFechasDeshabilitadas(nuevasFechasReservadas))
            limpiarDatos()
        } catch (error) {
            console.error('Error al crear fecha de mantenimiento:', error)
            mostrarSnackbar('Error al crear fecha de mantenimiento', 'error')
        }
    }

    const limpiarDatos = () => {
        setDescripcion('')
        setStartDate(new Date())
        setEndDate(null)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        if (
            fechasDeshabilitadas.includes(startDate.toISOString()) ||
            fechasDeshabilitadas.includes(endDate.toISOString())
        ) {
            setErrorMensaje('Las fechas seleccionadas están deshabilitadas')
            setMostrarMensajeError(true)
            return
        }

        await crearFechaMantenimiento()
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
                    <Typography variant="h6" align="center" gutterBottom style={{ color: 'black' }}>
                        Bloquear Fecha
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <div style={{ display: 'flex', flexDirection: 'column', color: 'black' }}>
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
                            <TextField
                                id="standard-basic"
                                name="descripcion"
                                label="Descripción"
                                variant="standard"
                                value={descripcion}
                                onChange={(e) => setDescripcion(e.target.value)}
                                style={{ marginBottom: '1rem' }}
                            />
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
                                <Button variant="text" onClick={cerrarModal}>
                                    Volver
                                </Button>
                                <Button type="submit" variant="text">
                                    Bloquear
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

ModalMantenimiento.propTypes = {
    openModal: PropTypes.bool,
    cerrarModal: PropTypes.func,
    instalacion: PropTypes.object,
}

export default ModalMantenimiento
