import { Box, TextField, Button, Typography, Modal } from '@mui/material'
import PropTypes from 'prop-types'
import { useState,useContext } from 'react'
import usuarioService from 'src/Services/usuario.service'
import UserContext from 'src/Services/context'

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



const CreditView = ({ openModal, cerrarModal, usuario }) => {

    const [saldo,setSaldo] = useState(0)
    const [user, setUser] = useContext(UserContext)
    
    const handleSubmit = (event) => {
        event.preventDefault()
        cargarSaldo()
    }

   
    const cargarSaldo = async () => {
          try {
           console.log('estas cargando la cantidad de saldo: ', saldo)
           const usuarioNuevo = await usuarioService.cargarSaldo(usuario.id, saldo)
           console.log('del backend recibimos: ', usuarioNuevo)           
           setUser(usuarioNuevo)
          } catch (error) {
            console.error('Error al agregar saldo:', error)
          } 
    
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
                            onChange={(event) => setSaldo(event.target.value)}
                            required
                            style={{ marginBottom: "1rem" }}
                        />
                        <Button variant="contained" color="primary" fullWidth sx={{ marginTop: 1 }}type="submit">
        Cargar Saldo
      </Button>
                    <Button variant="contained" color="secondary" fullWidth sx={{backgroundColor: '#b71c1c', color: 'white', marginTop: 1 }} >
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
    usuario: PropTypes.object
}

export default CreditView
