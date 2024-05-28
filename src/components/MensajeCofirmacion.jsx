import PropTypes from 'prop-types'
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material'

const MensajeConfirmacion = ({ open, onClose, onConfirm, title, message }) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle sx={{ textAlign: 'center' }}>{title}</DialogTitle>
            <DialogContent>
                <p>{message}</p>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancelar</Button>
                <Button onClick={onConfirm} variant="contained" color="error">
                    Confirmar
                </Button>
            </DialogActions>
        </Dialog>
    )
}

MensajeConfirmacion.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
}

export default MensajeConfirmacion
