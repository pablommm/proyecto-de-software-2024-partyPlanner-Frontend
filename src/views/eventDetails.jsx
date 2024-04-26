import { useState } from 'react'
import { Card, CardContent, CardMedia, Container, IconButton, Typography } from "@mui/material"
import AddIcon from '@mui/icons-material/Add'
import BasicModalService from 'src/components/modalServicio'

const EventDetails = () => {
    const [openModal, setOpenModal] = useState(false)

    const handleAddService = () => {
        setOpenModal(true)
    }

    const handleCloseModal = () => {
        setOpenModal(false)
    }

    return (
        <Container className="main" sx={{ paddingBottom: '5rem' }}>
            <Card sx={{ boxShadow: '-2px 2px 4px 0px rgba(0, 0, 0, 0.75)' }}>
                <CardMedia
                    component="img"
                    sx={{ width: "100%", height: "auto", borderRadius: '0.5rem 0.5rem 0 0' }}
                    image="https://starwalk.space/gallery/images/what-is-space/1920x1080.jpg"
                    alt="Live from space album cover"
                />
                <CardContent sx={{ borderBottom: '1px solid #ccc', paddingBottom: 2 }}>
                    <Typography variant="h6">Evento</Typography>
                </CardContent>
                <CardContent sx={{ borderBottom: '1px solid #ccc', paddingBottom: 2 }}>
                    <Typography variant="h6">Instalación</Typography>
                </CardContent>
                <CardContent sx={{ borderBottom: '1px solid #ccc', paddingBottom: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Typography variant="h6" sx={{ flex: '1' }}>Servicios</Typography>
                    <IconButton onClick={handleAddService} sx={{ fontSize: '2rem' }}>
                        <AddIcon />
                    </IconButton>
                </CardContent>
            </Card>
            <BasicModalService openModal={openModal} cerrarModal={handleCloseModal} />
        </Container>
    )
}

export default EventDetails
