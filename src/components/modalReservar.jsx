import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import PropTypes from 'prop-types'
import { TextField, Button, Typography } from "@mui/material"

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

const BasicModal = ({ openModal, cerrarModal }) => {

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
                <form>
                    <div style={{ display: "flex", flexDirection: "column", color: "black" }}>
                        <TextField
                            id="standard-basic"
                            name="nombre"
                            label="Nombre"
                            variant="standard"
                            style={{ marginBottom: "1rem" }}
                        />
                        <TextField
                            id="standard-basic"
                            name="lugar"
                            label="Lugar"
                            variant="standard"
                            style={{ marginBottom: "1rem" }}
                        />
                        <TextField
                            id="standard-basic"
                            name="fecha"
                            variant="standard"
                            style={{ marginBottom: "1rem" }}
                            type="date"
                        />
                        <TextField
                            id="standard-basic"
                            name="hora"
                            variant="standard"
                            style={{ marginBottom: "1rem" }}
                            type="time"
                        />
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <Button variant="text" onClick={cerrarModal}>Volver</Button>
                            <Button variant="text" onClick={cerrarModal}>Reservar</Button>
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
}

export default BasicModal
