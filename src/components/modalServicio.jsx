import { useState } from 'react'
import { Box, Modal, TextField, Button, Typography, Select, MenuItem, FormControl, InputLabel } from "@mui/material"
import PropTypes from 'prop-types'
import { Servicio } from 'src/Dominio/servicio'
import servicioService from 'src/Services/servicio.service'

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

const BasicModalService = ({ openModal, cerrarModal }) => {
    const [categoria, setCategoria] = useState('')
    const [nombreDeServicio, setNombreDeServicio] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [monto, setMonto] = useState('')

    const handleChangeCategoria = (event) => {
        setCategoria(event.target.value)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            console.log("Submitting form...")

            // Crear nuevo objeto de servicio
            const nuevoServicio = new Servicio()
            nuevoServicio.categoria = categoria
            nuevoServicio.nombreDeServicio = nombreDeServicio
            nuevoServicio.descripcion = descripcion
            nuevoServicio.monto = monto

            console.log("New servicio object:", nuevoServicio)

            // Llamar al servicio para crear el servicio
            const respuestaCrearServicio = await servicioService.crearServicio(nuevoServicio)
            console.log("Respuesta de creación de servicio:", respuestaCrearServicio)

            // Manejar la respuesta según sea necesario
            if (respuestaCrearServicio.status === 'success') {
                console.log("El servicio se creó exitosamente.")
                // Aquí puedes hacer algo como cerrar el modal o actualizar la lista de servicios, según tu aplicación
            } else {
                console.error("Hubo un error al crear el servicio:", respuestaCrearServicio.error)
                // Aquí puedes mostrar un mensaje de error al usuario o tomar otras acciones según tu aplicación
            }
        } catch (error) {
            console.error('Error al crear el servicio:', error)
        }
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
                    Nuevo Servicio
                </Typography>
                <form onSubmit={handleSubmit}>
                    <div style={{ display: "flex", flexDirection: "column", color: "black" }}>
                        <FormControl style={{ marginBottom: "1rem" }}>
                            <InputLabel id="categoria-label">Categoria</InputLabel>
                            <Select
                                labelId="categoria-label"
                                id="categoria"
                                name="categoria"
                                value={categoria}
                                onChange={handleChangeCategoria}
                                variant="standard"
                            >
                                <MenuItem value="entretenimiento">ENTRETENIMIENTO</MenuItem>
                                <MenuItem value="gastronomia">GASTRONOMIA</MenuItem>
                                <MenuItem value="accesorios">ACCESORIOS</MenuItem>
                            </Select>
                        </FormControl>

                        <TextField
                            id="nombreDeServicio"
                            name="nombreDeServicio"
                            label="Nombre"
                            variant="standard"
                            value={nombreDeServicio}
                            onChange={(event) => setNombreDeServicio(event.target.value)}
                            style={{ marginBottom: "1rem" }}
                        />
                        <TextField
                            id="descripcion"
                            name="descripcion"
                            label="Descripcion"
                            variant="standard"
                            value={descripcion}
                            onChange={(event) => setDescripcion(event.target.value)}
                            style={{ marginBottom: "1rem" }}
                        />
                        <TextField
                            id="gasto"
                            name="gasto"
                            label="Gasto"
                            variant="standard"
                            type="number"
                            value={monto}
                            onChange={(event) => setMonto(event.target.value)}
                            style={{ marginBottom: "1rem" }}
                        />


                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <Button variant="text" onClick={cerrarModal}>Volver</Button>
                            <Button type="submit" variant="text">Guardar</Button>
                        </div>
                    </div>
                </form>
            </Box>
        </Modal>
    )
}

BasicModalService.propTypes = {
    openModal: PropTypes.bool,
    cerrarModal: PropTypes.func,
}

export default BasicModalService
