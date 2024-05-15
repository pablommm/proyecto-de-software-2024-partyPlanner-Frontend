import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import PropTypes from 'prop-types'
import { TextField, Button, Typography } from "@mui/material"
import { useState } from 'react'
import instalacionService from 'src/Services/instalaciones.service'
import { Instalaciones } from 'src/Dominio/Instalacion'


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

const InstalacionModal = ({ openModal, cerrarModal }) => {
    const [nombre, setNombre] = useState('')
    const [localidad, setLocalidad] = useState('')
    const [costoInstalacion, setCostoInstalacion] = useState(0)
    const [capacidadInstalacion, setCapacidadInstalacion] = useState(0)
    const [descripcionInstalacion, setDescripcionInstalacion] = useState('')
    const [imagenPrincipal, setImagenPrincipal] = useState('')
    // Añade más estados si es necesario para otros datos de la instalación

    const crearInstalacionNueva = async () => {
        const nuevaInstalacion = new Instalaciones()
        nuevaInstalacion.nombreDeInstalacion = nombre
        nuevaInstalacion.localidadDeInstalacion = localidad
        nuevaInstalacion.costoDeInstalacion = costoInstalacion
        nuevaInstalacion.capacidadInstalacion = capacidadInstalacion
        nuevaInstalacion.descripcionDeInstalacion = descripcionInstalacion
        nuevaInstalacion.imagenPrincipal = imagenPrincipal


        const respuestaCrearInstalacion = await instalacionService.crearInstalacion(nuevaInstalacion)
        console.log("Respuesta de creación de instalación:", respuestaCrearInstalacion)
        console.log("Instalación creada exitosamente.")

        
        cerrarModal()
        limpiarDatos()
    }

    const limpiarDatos = () => {
        setNombre('')
        setLocalidad('')
        
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        console.log("Submit del formulario")

        crearInstalacionNueva()
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
                    Solicitar Instalación
                </Typography>
                <form onSubmit={handleSubmit}>
                    <div style={{ display: "flex", flexDirection: "column", color: "black" }}>
                        <TextField
                            id="standard-basic"
                            name="nombre"
                            label="Nombre"
                            variant="standard"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            style={{ marginBottom: "1rem" }}
                        />
                        <TextField
                            id="standard-basic"
                            name="localidad"
                            label="Localidad"
                            variant="standard"
                            value={localidad}
                            onChange={(e) => setLocalidad(e.target.value)}
                            style={{ marginBottom: "1rem" }}
                        />
                        <TextField
                            id="standard-basic"
                            name="costo"
                            label="Costo"
                            variant="standard"
                            value={costoInstalacion}
                            onChange={(e) => setCostoInstalacion(e.target.value)}
                            style={{ marginBottom: "1rem" }}
                        />
                        <TextField
                            id="standard-basic"
                            name="capacidad"
                            label="Capacidad"
                            variant="standard"
                            value={capacidadInstalacion}
                            onChange={(e) => setCapacidadInstalacion(e.target.value)}
                            style={{ marginBottom: "1rem" }}
                        />
                        <TextField
                            id="standard-basic"
                            name="descripcion"
                            label="Descripción"
                            variant="standard"
                            value={descripcionInstalacion}
                            onChange={(e) => setDescripcionInstalacion(e.target.value)}
                            style={{ marginBottom: "1rem" }}
                        />
                        <TextField
                            id="standard-basic"
                            name="imagen"
                            label="Imagen"
                            variant="standard" 
                            value={imagenPrincipal}
                            onChange={(e) => setImagenPrincipal(e.target.value)}
                            style={{ marginBottom: "1rem" }}
                        /> 

                        {/* Agrega más campos si es necesario para la instalación */}
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <Button variant="text" onClick={cerrarModal}>Cancelar</Button>
                            <Button type="submit" variant="text" onClick={crearInstalacionNueva}>Solicitar</Button>
                        </div>
                    </div>
                </form>
            </Box>
        </Modal>
    )
}

InstalacionModal.propTypes = {
    openModal: PropTypes.bool,
    cerrarModal: PropTypes.func,
}

export default InstalacionModal
