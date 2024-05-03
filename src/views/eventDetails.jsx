import { useState } from 'react'
import { CardMedia, Container, IconButton, Grid } from "@mui/material"
import { EventNote, AccountBalance, LocationOn } from "@mui/icons-material"
import BasicModalService from 'src/components/modalServicio'

const EventDetails = () => {
    const [openModal, setOpenModal] = useState(false)

    const handleCloseModal = () => {
        setOpenModal(false)
    }

    return (
        <Container className="card-header-container" sx={{ width: '100%', height: 'auto', objectFit: 'cover', borderRadius: "0.5rem" }}>
            <CardMedia
                component="img"
                sx={{ width: '100%', height: 'auto', objectFit: 'cover', borderRadius: "0.5rem" }}
                image="https://starwalk.space/gallery/images/what-is-space/1920x1080.jpg"
                alt="Live from space album cover"
            />
            <Grid container spacing={2} justifyContent="center" alignItems="center">
                <Grid item>
                    <IconButton >
                        <EventNote />
                    </IconButton>
                </Grid>
                <Grid item>
                    <IconButton >
                        <LocationOn />
                    </IconButton>
                </Grid>
                <Grid item>
                    <IconButton>
                        <AccountBalance />
                    </IconButton>
                </Grid>
            </Grid>

            <BasicModalService openModal={openModal} cerrarModal={handleCloseModal} />
        </Container >
    )
}

export default EventDetails
