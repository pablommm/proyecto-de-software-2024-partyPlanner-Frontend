import { Box, TextField, Button, Typography, Modal } from '@mui/material'
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



const CreditView = ({ openModal, cerrarModal }) => {
    const handleSubmit = (event) => {
        event.preventDefault()
    }

    
    /*  const [cardholderName,setCardholderName] = useState('')
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
                            id="input-saldo"
                            name="saldo"
                            label="Saldo"
                            variant="standard"
                            type=""
                            
                            required
                            style={{ marginBottom: "1rem" }}
                        />
                        <Button variant="contained" color="primary" fullWidth sx={{ marginTop: 1 }}>
        Cargar Saldo
      </Button>
                    <Button variant="contained" color="secondary" fullWidth sx={{ marginTop: 1 }} >
        Cancelar
      </Button>
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
