import { Container, Grid } from "@mui/material"
import EventRoomCard from "src/components/roomCard"
import { useState, useEffect } from 'react'
import BasicModal from "src/components/modalReservar"
import InstalacionService from "src/Services/instalacionService"
import TextField from '@mui/material/TextField'

const PrincipalView = () => {
    const [openModal, setOpenModal] = useState(false)
    const [selectedRoom, setSelectedRoom] = useState(null)
    const [instalaciones, setInstalaciones] = useState([])
    const [términoDeBúsqueda, setTerminoDeBúsqueda] = useState('') 

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
        setTerminoDeBúsqueda(evento.target.value.toLowerCase()) // Normalizar término de búsqueda
      }

      const manejarPresionarEnter = (event) => {
        if (event.key === 'Enter') {
          // Implement your search logic here
          console.log('Realizar búsqueda con:', términoDeBúsqueda)
        }
      }

    return (
        <Container className="main" style={{ marginBottom: "10rem" }}>
            <TextField
          label="Buscar salas"
          variant="outlined"
          margin="normal"
          fullWidth
          value={términoDeBúsqueda}
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