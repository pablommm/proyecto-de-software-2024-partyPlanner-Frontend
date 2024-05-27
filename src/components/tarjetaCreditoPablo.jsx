import Box from '@mui/material/Box'
import { TextField, Button, Typography } from "@mui/material"

import Modal from '@mui/material/Modal'
import PropTypes from 'prop-types'

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


const CreditView = ({openModal, cerrarModal}) => {

  


    return (
        <Modal
            open={openModal}
            onClose={cerrarModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography variant="h6" align="center" gutterBottom>
                    Pagar Reserva
                </Typography>

                
                <form >
                    <div style={{ display: "flex", flexDirection: "column", color: "black" }}>
                        <TextField
                            id="cardholder-name"
                            name="cardholderName"
                            label="Nombre del Titular"
                            variant="standard"
                            required
                            style={{ marginBottom: "1rem" }}
                        />
                        <TextField
                            id="card-number"
                            name="cardNumber"
                            label="Número de Tarjeta"
                            variant="standard"
                            type="tel"
                            inputProps={{ maxLength: 16 }}
                            required
                            style={{ marginBottom: "1rem" }}
                        />
                        <div style={{ display: "flex" }}>
                            <TextField
                                id="expiration-date"
                                name="expirationDate"
                                label="Fecha de Vencimiento"
                                variant="standard"
                                //type="month"
                                required
                                style={{ marginRight: "1rem", marginBottom: "1rem", width: "50%" }}
                            />
                            <TextField
                                id="cvc"
                                name="cvc"
                                label="CVC"
                                variant="standard"
                                type="tel"
                                inputProps={{ maxLength: 3 }}
                                required
                                style={{ width: "50%" }}
                            />
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <Button variant="text" onClick={cerrarModal}>
                                Volver
                            </Button>
                            <Button variant="text" onClick={cerrarModal}>
                                Pagar Reserva
                            </Button>
                        </div>
                    </div>
                </form>
                
            </Box>
        </Modal>
    )
}

CreditView.propTypes = {
    openModal: PropTypes.bool.isRequired,
    cerrarModal: PropTypes.func.isRequired


}

export default CreditView