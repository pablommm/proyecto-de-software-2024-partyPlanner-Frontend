import { Box, Modal, TextField, Button, Typography, Select, MenuItem, FormControl, InputLabel, Snackbar, SnackbarContent } from "@mui/material"
import PropTypes from 'prop-types'
import { Servicio } from 'src/Dominio/servicio'
import servicioService from 'src/Services/servicio.service'
import { useState, useEffect } from 'react'

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

const BasicModalService = ({ openModal, cerrarModal, eventoID, servicio }) => {
    const [categoria, setCategoria] = useState('')
    const [nombreDeServicio, setNombreDeServicio] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [monto, setMonto] = useState('')
    const [mostrarMensajeExito, setMostrarMensajeExito] = useState(false)

    useEffect(() => {
        if (servicio) {
            setCategoria(servicio.categoria)
            setNombreDeServicio(servicio.nombreDeServicio)
            setDescripcion(servicio.descripcion)
            setMonto(servicio.monto)
        } else {
            limpiarDatos()
        }
    }, [servicio])

    const handleChangeCategoria = (event) => {
        setCategoria(event.target.value)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        const nuevoServicio = new Servicio()
        nuevoServicio.nombreDeServicio = nombreDeServicio
        nuevoServicio.descripcion = descripcion
        nuevoServicio.categoria = categoria.toUpperCase()
        nuevoServicio.monto = monto
        nuevoServicio.eventoID = eventoID

        try {
            if (servicio && servicio.id) {
                nuevoServicio.id = servicio.id
                const respuestaEditarServicio = await servicioService.editarServicio(nuevoServicio)
                console.log("Respuesta de edición de servicio:", respuestaEditarServicio)
                mostrarSnackbar('¡El servicio se editó correctamente!', 'success')
            } else {
                const respuestaCrearServicio = await servicioService.crearServicio(nuevoServicio)
                console.log("Respuesta de creación de servicio:", respuestaCrearServicio)
                mostrarSnackbar('¡El servicio se creó correctamente!', 'success')
            }

            cerrarModal()
            limpiarDatos()
        } catch (error) {
            console.error('Error al crear o editar el servicio:', error)
            mostrarSnackbar('Error al crear o editar el servicio', 'error')
        }
    }

    const limpiarDatos = () => {
        setCategoria('')
        setNombreDeServicio('')
        setDescripcion('')
        setMonto('')
    }

    const mostrarSnackbar = (mensaje, variant) => {
        setMostrarMensajeExito({ mostrar: true, mensaje, variant })
    }

    const handleCloseSnackbar = () => {
        setMostrarMensajeExito(false)
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
                    <Typography variant="h6" align="center" gutterBottom style={{color: servicio ? "black" : "black" }}>
                        {servicio ? 'Editar Servicio' : 'Nuevo Servicio'}
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <div style={{ display: "flex", flexDirection: "column", color: "black" }}>
                            <FormControl style={{ marginBottom: "1rem" }}>
                                <InputLabel id="categoria-label">Categoría</InputLabel>
                                <Select
                                    labelId="categoria-label"
                                    id="categoria"
                                    name="categoria"
                                    value={categoria}
                                    onChange={handleChangeCategoria}
                                    variant="standard"
                                >
                                    <MenuItem value="ENTRETENIMIENTO">ENTRETENIMIENTO</MenuItem>
                                    <MenuItem value="GASTRONOMIA">GASTRONOMIA</MenuItem>
                                    <MenuItem value="ACCESORIOS">ACCESORIOS</MenuItem>
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
                                label="Descripción"
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

            <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                open={mostrarMensajeExito.mostrar}
                autoHideDuration={2500}
                onClose={handleCloseSnackbar}
            >
                <SnackbarContent
                    style={{ backgroundColor: mostrarMensajeExito.variant === 'success' ? '#388e3c' : '#f44336' }}
                    message={mostrarMensajeExito.mensaje}
                />
            </Snackbar>
        </>
    )
}

BasicModalService.propTypes = {
    openModal: PropTypes.bool.isRequired,
    cerrarModal: PropTypes.func.isRequired,
    eventoID: PropTypes.number.isRequired,
    servicio: PropTypes.shape({
        id: PropTypes.number,
        categoria: PropTypes.string,
        nombreDeServicio: PropTypes.string,
        descripcion: PropTypes.string,
        monto: PropTypes.number,
    }),
}

export default BasicModalService
