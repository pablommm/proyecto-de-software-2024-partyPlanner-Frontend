import { Box, TextField, Button, Typography, Modal } from '@mui/material'
import PropTypes from 'prop-types'
import { useState } from 'react'

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



const CreditView = ({ openModal, cerrarModal }) => {
    const handleSubmit = (event) => {
        event.preventDefault()
    }

    
    const [cardholderName,setCardholderName] = useState('')
    /*
    const verificaNombreTitular = (event) =>{
        const nuevoValor = event.target.cardholderName.replace(/[^a-zA-Z\s]/g, '')
        setCardholderName(nuevoValor)
    }
    

    const verificaNombreTitular = (event) => {
        // Obtener el valor ingresado en el campo de entrada
        var inputValue = event.target.value
        // Eliminar números y símbolos del valor ingresado usando una expresión regular
        inputValue = inputValue.replace(/[^a-z]/g, '')
        // Convertir el valor a minúsculas
        inputValue = inputValue.toLowerCase()
        // Actualizar el estado con el valor limpio y en minúsculas
        setCardholderName(inputValue)
    }
    */

    return (
        <Modal
            open={openModal}
            onClose={cerrarModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography sx={{color:"black"}}variant="h6" align="center" gutterBottom>
                    Carga de Saldo
                </Typography>
                <form onSubmit={handleSubmit}>
                    <div style={{ display: 'flex', flexDirection: 'column', color: 'black' }}>
                        <TextField
                            id="cardholder-name"
                            name="cardholderName"
                            label="Nombre del Titular"
                            variant="standard"
                            type="text"
                            value={cardholderName}
                            //onChange={verificaNombreTitular}
                            required
                            style={{ marginBottom: "1rem" }}
                        />
                        <TextField
                            id="card-number"
                            name="cardNumber"
                            label="Número de Tarjeta"
                            variant="standard"
                            type="number"
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
                                type="month"
                                required
                                style={{ marginRight: "1rem", marginBottom: "1rem", width: "50%" }}
                            />
                            <TextField
                                id="cvc"
                                name="cvc"
                                label="CVC"
                                variant="standard"
                                type="number"                                
                                inputProps={{ maxLength: 3 }}
                                required
                                style={{ width: "50%" }}
                            />
                        </div>
                        <TextField
                            id="input-saldo"
                            name="saldo"
                            label="Saldo"
                            variant="standard"
                            type=""
                            
                            required
                            style={{ marginBottom: "1rem" }}
                        />
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <Button variant="text" onClick={cerrarModal}>
                                Volver
                            </Button>
                            <Button type="submit" variant="text">
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
    cerrarModal: PropTypes.func.isRequired,
}

export default CreditView
