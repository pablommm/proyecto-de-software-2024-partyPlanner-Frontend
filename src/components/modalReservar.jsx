import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import PropTypes from 'prop-types'
import { TextField, Button, Typography } from "@mui/material"
import { useState } from 'react'
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

const BasicModal = ({ openModal, cerrarModal, instalacion }) => {
    const { nombreDeInstalacion, id } = instalacion || {}
    const [nombreDelEvento, setNombreDelEvento] = useState('')
    const [fechaEventoIni, setFechaEventoIni] = useState('')
    const [fechaEventoFin, setFechaEventoFin] = useState('')

    const crearEventoNuevo = async () => {
        const nuevoEvento = new Evento()
        nuevoEvento.nombreDelEvento = nombreDelEvento
        nuevoEvento.Lugar = id
        nuevoEvento.fechaEventoIni = new Date(fechaEventoIni).toISOString()
        nuevoEvento.fechaEventoFin = new Date(fechaEventoFin).toISOString()
        nuevoEvento.owner = localStorage.getItem('usuId')

        console.log("Nuevo evento:", nuevoEvento)

        const respuestaCrearEvento = await eventoService.crearEvento(nuevoEvento)
        console.log("Respuesta de creación de evento:", respuestaCrearEvento)
        console.log("Evento creado exitosamente.")

        // Cerrar el modal y limpiar los datos
        cerrarModal()
        limpiarDatos()
    }

    const limpiarDatos = () => {
        setNombreDelEvento('')
        setFechaEventoIni('')
        setFechaEventoFin('')
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        console.log("Submit del formulario")
        crearEventoNuevo()
    }

    return (
        <Modal
            open={openModal}
            onClose={cerrarModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography variant="h6" align="center" gutterBottom>
                    Reservar
                </Typography>
                <form onSubmit={handleSubmit}>
                    <div style={{ display: "flex", flexDirection: "column", color: "black" }}>
                        <TextField
                            id="standard-basic"
                            name="nombre"
                            label="Nombre"
                            variant="standard"
                            value={nombreDelEvento}
                            onChange={(e) => setNombreDelEvento(e.target.value)}
                            style={{ marginBottom: "1rem" }}
                        />
                        <TextField
                            id="standard-basic"
                            name="lugar"
                            label="Lugar"
                            variant="standard"
                            style={{ marginBottom: "1rem" }}
                            defaultValue={nombreDeInstalacion}
                        />
                        <TextField
                            id="standard-basic"
                            name="fecha Inicio"
                            variant="standard"
                            style={{ marginBottom: "1rem" }}
                            type="date"
                            value={fechaEventoIni}
                            onChange={(e) => setFechaEventoIni(e.target.value)}
                        />
                        <TextField
                            id="standard-basic"
                            name="fecha Final"
                            variant="standard"
                            style={{ marginBottom: "1rem" }}
                            type="date"
                            value={fechaEventoFin}
                            onChange={(e) => setFechaEventoFin(e.target.value)}
                        />
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <Button variant="text" onClick={cerrarModal}>Volver</Button>
                            <Button type="submit" variant="text">Reservar</Button>
                        </div>
                    </div>
                </form>
            </Box>
        </Modal>
    )
}

BasicModal.propTypes = {
    openModal: PropTypes.bool,
    cerrarModal: PropTypes.func,
    instalacion: PropTypes.object
}

export default BasicModal
