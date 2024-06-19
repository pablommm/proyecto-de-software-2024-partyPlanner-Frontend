import { Box, Button, Modal, Typography } from "@mui/material"
import PropTypes from 'prop-types'
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 300,
    maxHeight: '90vh',
    bgcolor: 'background.paper',
    p: 4,
    borderRadius: '0.5rem',
    border: '1px solid black',
    boxShadow: '-2px 2px 4px 0px rgba(0, 0, 0, 0.75)',
}
const DetallesInstalacion = ({ openModal, cerrarModal, instalacion }) => {
    return (
        <Modal
            open={openModal}
            onClose={cerrarModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>

                <div style={{ padding: 20 }}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        {instalacion?.nombreDeInstalacion}
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        {instalacion?.descripcionDeInstalacion}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Ubicación: {instalacion?.localidadDeInstalacion}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Capacidad: {instalacion?.capacidadInstalacion}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Costo: ${instalacion?.costoDeInstalacion}
                    </Typography>
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
                        <Button variant="text" onClick={cerrarModal}>
                            Volver
                        </Button>

                    </div>
                </div>
            </Box>

        </Modal>
    )
}

DetallesInstalacion.propTypes = {
    openModal: PropTypes.bool.isRequired,
    cerrarModal: PropTypes.func.isRequired,
    instalacion: PropTypes.object,
}

export default DetallesInstalacion