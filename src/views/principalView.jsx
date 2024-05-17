import { Container, Grid } from "@mui/material"
import EventRoomCard from "src/components/roomCard"
import { useState, useEffect } from 'react'
import BasicModal from "src/components/modalReservar"
import InstalacionService from "src/Services/instalacionService"
const PrincipalView = () => {
    const [openModal, setOpenModal] = useState(false)
    const [selectedRoom, setSelectedRoom] = useState(null)
    const [instalaciones, setInstalaciones] = useState([])

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

    return (
        <Container className="main" style={{ marginBottom: "10rem" }}>
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