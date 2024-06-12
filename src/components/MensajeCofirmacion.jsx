import PropTypes from 'prop-types'
import { Dialog, DialogActions, DialogContent, DialogTitle, Button,IconButton, Box } from '@mui/material'
import WhatsAppIcon from '@mui/icons-material/WhatsApp'
import TelegramIcon from '@mui/icons-material/Telegram'

const MensajeConfirmacion = ({ open, onClose, onConfirm, title, message, message2,datoExtra }) => {
    var parametroControl = false
    
    if(message2 != null){
        parametroControl = true
    }else{
        parametroControl = false
    }
    const handleWhatsAppPress = () => {
        const dateObject = new Date(datoExtra.fechaEventoIni) 
        const formattedDate = dateObject.toLocaleDateString('es-AR', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        })        
        const message = `El evento  ${datoExtra.nombreDelEvento}  de la fecha ${formattedDate} fue cancelado`
        const url = `https://wa.me/?text=${message}`
        window.open(url)
      }

      const handletelegram = () => {
        const dateObject = new Date(datoExtra.fechaEventoIni) // Assuming event.fechaEventoIni is a valid Date object
        const formattedDate = dateObject.toLocaleDateString('es-AR', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        })    
         const message = `El evento  ${datoExtra.nombreDelEvento}  de la fecha ${formattedDate} fue cancelado`
        const url = `https://t.me/share/url?url=Te invitamos ${datoExtra.nombreDelEvento} : &text=${message}`
        window.open(url)
    
      }
    

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle sx={{ textAlign: 'center', fontWeight: "bold" }}>{title}</DialogTitle>
            < DialogContent>
                <p>{message2} </p>
            </DialogContent>
            <div >
            {parametroControl &&
                
                <Box sx={{ textAlign: 'center' }}>
                <IconButton>
                  <WhatsAppIcon
                    onClick={() => handleWhatsAppPress()}
                    sx={{ color: '#008000', fontSize: 50, margin: 1 }}
                  ></WhatsAppIcon>
                </IconButton>
                <IconButton>
                  <TelegramIcon
                    onClick={() => handletelegram()}
                    sx={{ color: '#0088CC', fontSize: 50, margin: 1 }}
                  ></TelegramIcon>
                </IconButton>
              </Box>
                
                }

            </div>

            <DialogContent>
                <p>{message}</p>
            </DialogContent>
            
            <DialogActions sx={{ display: "flex", justifyContent: "space-between" }}>
                <Button onClick={onClose}>Cancelar</Button>
                <Button onClick={onConfirm} variant="contained" color="error">
                    Confirmar
                </Button>
            </DialogActions>
        </Dialog >
    )
}

MensajeConfirmacion.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    message2: PropTypes.string,
    datoExtra: PropTypes.object
}

export default MensajeConfirmacion
