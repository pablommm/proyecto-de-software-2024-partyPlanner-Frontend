import { Box, Modal, TextField, Button, Typography, Select, MenuItem, FormControl, InputLabel } from "@mui/material"
import PropTypes from 'prop-types'
import React from "react"

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
    const [categoria, setCategoria] = React.useState('')

    const handleChangeCategoria = (event) => {
        setCategoria(event.target.value)
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
                <form>
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
                                <MenuItem value="entretenimiento">Entretenimiento</MenuItem>
                                <MenuItem value="gastronomia">Gastronomía</MenuItem>
                                <MenuItem value="accesorios">Accesorios</MenuItem>
                            </Select>
                        </FormControl>

                        <TextField
                            id="nombreDeServicio"
                            name="nombreDeServicio"
                            label="Nombre"
                            variant="standard"
                            style={{ marginBottom: "1rem" }}
                        />
                        <TextField
                            id="descripcion"
                            name="descripcion"
                            label="Descripcion"
                            variant="standard"
                            style={{ marginBottom: "1rem" }}
                        />
                        <TextField
                            id="gasto"
                            name="gasto"
                            label="Gasto"
                            variant="standard"
                            type="number"
                            style={{ marginBottom: "1rem" }}
                        />


                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <Button variant="text" onClick={cerrarModal}>Volver</Button>
                            <Button variant="text" onClick={cerrarModal}>Guardar</Button>
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
