import { Container, Grid } from "@mui/material"
import EventRoomCard from "src/components/roomCard"
import { useState, useEffect } from 'react'
import BasicModal from "src/components/modalReservar"
import InstalacionService from "src/Services/instalacionService"
import TextField from '@mui/material/TextField'
import instalacionService from "src/Services/instalaciones.service"

const PrincipalView = () => {
    const [openModal, setOpenModal] = useState(false)
    const [selectedRoom, setSelectedRoom] = useState(null)
    const [instalaciones, setInstalaciones] = useState([])
    const [terminoDeBusqueda, setTerminoDeBusqueda] = useState('') 

    useEffect(() => {
        const fetchInstalaciones = async () => {
            try {
                const response = await InstalacionService.traerInstalaciones()
                setInstalaciones(response.data)
            } catch (error) {
                console.error("Error al obtener las instalaciones:", error)
            }
        }
    


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
        setTerminoDeBusqueda(evento.target.value.toLowerCase()) // Normalizar término de búsqueda
      }

      const busqueda = async () => {
        try {
            console.log('Realizar búsqueda con:', terminoDeBusqueda)
          const response = await instalacionService.busquedaDeInstalaciones(terminoDeBusqueda)
          setTerminoDeBusqueda(response.data)
      }
        catch (error) {
          console.error("Error al obtener las instalaciones:", error)
        }
      }

      const manejarPresionarEnter = (event) => {
        if (event.key === 'Enter') {
          
          console.log('Realizar búsqueda con:', terminoDeBusqueda)

          busqueda()
            
        }
      }

    return (
        <Container className="main" style={{ marginBottom: "10rem" }}>
            <TextField
          label="Buscar salas"
          variant="outlined"
          margin="normal"
          fullWidth
          value={terminoDeBusqueda}
          onChange={manejarCambioBúsqueda}
          onKeyDown={manejarPresionarEnter} // Agregar el manejador de Enter
          placeholder="Nombre del salón o localidad"
          helperText="Filtrar por nombre del salón o localidad" // Texto de ayuda opcional
        />
        
            <Grid container spacing={3} justifyContent="center">
                {instalaciones.map((instalacion, index) =>
                    <Grid item key={index}>
                        <EventRoomCard room={instalacion} onClick={() => handleRoomClick(instalacion)} />
                    </Grid>
                )}
            </Grid>
            <BasicModal openModal={openModal} cerrarModal={handleCloseModal} instalacion={selectedRoom} />
        </Container>
    )
}

export default PrincipalView