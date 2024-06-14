import { Container, Grid,Box } from '@mui/material'
import EventRoomCard from 'src/components/roomCard'
import { useState, useEffect } from 'react'
import BasicModal from 'src/components/modalReservar'
import InstalacionService from 'src/Services/instalacionService'
import TextField from '@mui/material/TextField'
import instalacionService from 'src/Services/instalaciones.service'
import SearchIcon from '@mui/icons-material/Search'
import IconButton from '@mui/material/IconButton'
import { InputAdornment } from '@material-ui/core'

const PrincipalView = () => {
  const [openModal, setOpenModal] = useState(false)
  const [selectedRoom, setSelectedRoom] = useState(null)
  const [instalaciones, setInstalaciones] = useState([])
  const [terminoDeBusqueda, setTerminoDeBusqueda] = useState('')

  const fetchInstalaciones = async () => {
    try {
      const response = await InstalacionService.traerInstalaciones()
      setInstalaciones(response.data)
    } catch (error) {
      console.error('Error al obtener las instalaciones:', error)
    }
  }

  useEffect(() => {
    fetchInstalaciones()
  }, [])

  const handleRoomClick = (room) => {
    setSelectedRoom(room)
    setOpenModal(true)
  }

  const handleCloseModal = () => {
    setOpenModal(false)
  }

  const manejarCambioBúsqueda = (evento) => {
    setTerminoDeBusqueda(evento.target.value) // Normalizar término de búsqueda
  }

  const busqueda = async () => {
    try {
      console.log('Realizar búsqueda con:', terminoDeBusqueda)
      if (terminoDeBusqueda !== '') {
        const response =
          await instalacionService.busquedaDeInstalaciones(terminoDeBusqueda)
        setInstalaciones(response.data)
      }else {
        fetchInstalaciones()
      }

      
    } catch (error) {
      console.error('Error al obtener las instalaciones:', error)
    }
  }

  const manejarPresionarEnter = (event) => {
    if (event.key === 'Enter') {
      console.log('Realizar búsqueda con:', terminoDeBusqueda)

      busqueda()
    }
  }

 

  return (
    <Container className="main" style={{ marginBottom: '10rem' }}>
     
      <TextField
        label="Buscar salones"
        variant="outlined"
        margin="normal"
        fullWidth
        value={terminoDeBusqueda}
        onChange={manejarCambioBúsqueda}
        onKeyDown={manejarPresionarEnter} // Agregar el manejador de Enter
        placeholder="Nombre del salón o localidad"
        helperText="Filtrar por nombre del salón o localidad" // Texto de ayuda opcional        
        InputProps={{
          startAdornment: 
          <InputAdornment position="end">
            
              <SearchIcon sx={{paddingRight:1}}/>
            
          </InputAdornment>
        }}
      />
       
    
      
      <Grid container spacing={3} justifyContent="center">
        {instalaciones.map((instalacion, index) => (
          <Grid item key={index}>
            <EventRoomCard
              room={instalacion}
              onClick={() => handleRoomClick(instalacion)}
            />
          </Grid>
        ))}
      </Grid>
      <BasicModal
        openModal={openModal}
        cerrarModal={handleCloseModal}
        instalacion={selectedRoom}
      />
    </Container>
  )
}

export default PrincipalView
