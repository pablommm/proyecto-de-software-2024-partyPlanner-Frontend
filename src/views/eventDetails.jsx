import { CardMedia, Container, Grid, IconButton, Typography, Fab } from "@mui/material"
import { EventNote, AccountBalance, LocationOn, Add } from "@mui/icons-material"
import BasicModalService from 'src/components/modalServicio'
import React, { useState } from "react"
import PropTypes from 'prop-types'
import { useLocation } from "react-router-dom"
import { format } from 'date-fns' // Importar la función format de date-fns


const EventDetails = () => {
    const location = useLocation()
    const event = location.state.event

    const [openModal, setOpenModal] = useState(false)
    const [section, setSection] = useState(null)

    const handleCloseModal = () => {
        setOpenModal(false)
    }

    const handleSectionClick = (sectionName) => {
        setSection(sectionName === section ? null : sectionName)
    }

    const handleOpenModal = () => {
        setOpenModal(true)
    }





    // Calcular el total gastado
    const totalGastado = event.serviciosAdquiridos.reduce((total, servicio) => total + servicio.monto, 0)

    return (

        <Container sx={{
            width: '100%',
            height: 'auto',
            objectFit: 'cover',
            borderRadius: "0.5rem",
            paddingBottom: "2rem",
        }}>
            <CardMedia
                component="img"
                sx={{
                    width: '100%',
                    height: 'auto',
                    objectFit: 'cover',
                    borderRadius: "0.5rem",
                    marginBottom: "1rem"
                }}
                image="https://starwalk.space/gallery/images/what-is-space/1920x1080.jpg"
                alt="Live from space album cover"
            />
            <Grid container spacing={2} justifyContent="center" alignContent="center" sx={{
                marginBottom: "1rem",
                padding: "1rem", // Espaciado interno para la fila
                width: "100%", // Abarcar todo el ancho
                textAlign: "center" // Centrar los íconos horizontalmente


            }}>
                <Grid item>
                    <IconButton
                        onClick={() => handleSectionClick('evento')}
                        sx={{
                            transition: "transform 0.2s",
                            "&:hover": { transform: "scale(1.1)" }
                        }}
                    >
                        <EventNote />
                    </IconButton>
                </Grid>
                <Grid item>
                    <IconButton
                        onClick={() => handleSectionClick('lugar')}
                        sx={{
                            transition: "transform 0.2s",
                            "&:hover": { transform: "scale(1.1)" }
                        }}
                    >
                        <LocationOn />
                    </IconButton>
                </Grid>
                <Grid item>
                    <IconButton
                        onClick={() => handleSectionClick('servicios')}
                        sx={{
                            transition: "transform 0.2s",
                            "&:hover": { transform: "scale(1.1)" }
                        }}
                    >
                        <AccountBalance />
                    </IconButton>
                </Grid>
            </Grid>
            {section === 'evento' &&
                <Container sx={{ backgroundColor: "#f0f0f0", padding: "1rem", borderRadius: "0.5rem", marginBottom: "1rem" }}>
                    <Typography variant="h5" sx={{ marginBottom: "0.5rem" }}>{event.nombreDelEvento}</Typography>
                    <Typography variant="body1" sx={{ color: "rgba(0, 0, 0, 0.6)" }}>Inicio: {format(new Date(event.fechaEventoIni), 'dd/MM/yyyy')}</Typography>
                    <Typography variant="body1" sx={{ color: "rgba(0, 0, 0, 0.6)" }}>Fin: {format(new Date(event.fechaEventoFin), 'dd/MM/yyyy')}</Typography>
                    <Typography variant="body1" sx={{ color: "rgba(0, 0, 0, 0.6)" }}>Lugar: {event.lugar.nombreDeInstalacion}</Typography>

                </Container>
            }
            {section === 'lugar' &&
                <Container sx={{ backgroundColor: "#f0f0f0", padding: "1rem", borderRadius: "0.5rem", marginBottom: "1rem" }}>
                    <Typography variant="h5" sx={{ marginBottom: "0.5rem" }}>Lugar: {event.lugar.nombreDeInstalacion}</Typography>
                    <Typography variant="body1" sx={{ color: "rgba(0, 0, 0, 0.6)" }}>Capacidad: {event.lugar.capacidadInstalacion}</Typography>
                    <Typography variant="body1" sx={{ color: "rgba(0, 0, 0, 0.6)" }}>Costo: {event.lugar.costoDeInstalacion}</Typography>
                    <Typography variant="body1" sx={{ color: "rgba(0, 0, 0, 0.6)" }}>Descripción: {event.lugar.descripcionDeInstalacion}</Typography>
                    <Typography variant="body1" sx={{ color: "rgba(0, 0, 0, 0.6)" }}>Localidad De Instalacion: {event.lugar.localidadDeInstalacion}</Typography>
                    <Typography variant="body1" sx={{ color: "rgba(0, 0, 0, 0.6)" }}>Monto De Reserva: {event.lugar.montoDeReserva}</Typography>
                </Container>
            }
            {section === 'servicios' && event.serviciosAdquiridos.length > 0 &&
                <Container>
                    <Typography variant="h6" sx={{ marginBottom: "1rem", display: 'flex', justifyContent: 'center' }}>Total Gastado: ${totalGastado}</Typography>
                    <Grid container spacing={3} justifyContent="center" className="table-container">
                        <Grid item xs={4} sm={4} sx={{ borderBottom: "1px solid #ccc" }}>
                            <Typography variant="h6" className="table-header" sx={{ fontWeight: 'bold', textAlign: "center" }}>Categoría</Typography>
                        </Grid>
                        <Grid item xs={4} sm={4} sx={{ borderBottom: "1px solid #ccc" }}>
                            <Typography variant="h6" className="table-header" sx={{ fontWeight: 'bold', textAlign: "center" }}>Nombre</Typography>
                        </Grid>
                        <Grid item xs={4} sm={4} sx={{ borderBottom: "1px solid #ccc" }}>
                            <Typography variant="h6" className="table-header" sx={{ fontWeight: 'bold', textAlign: "center" }}>Monto</Typography>
                        </Grid>
                        {event.serviciosAdquiridos.map(servicio =>
                            <React.Fragment key={servicio.id}>
                                <Grid item xs={4} sm={4} sx={{ borderBottom: "1px solid #ccc" }}>
                                    <Typography variant="body2" sx={{ textAlign: "center" }}>{servicio.categoria}</Typography>
                                </Grid>
                                <Grid item xs={4} sm={4} sx={{ borderBottom: "1px solid #ccc" }}>
                                    <Typography variant="body2" sx={{ textAlign: "center" }}>{servicio.nombreDeServicio}</Typography>
                                </Grid>
                                <Grid item xs={4} sm={4} sx={{ borderBottom: "1px solid #ccc" }}>
                                    <Typography variant="body2" sx={{ textAlign: "center" }}>${servicio.monto}</Typography>
                                </Grid>
                            </React.Fragment>
                        )}
                    </Grid>
                </Container>
            }
            {section === 'servicios' && event.serviciosAdquiridos.length === 0 &&
                <Container sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                    <Typography variant="body1">No hay servicios adquiridos.</Typography>
                </Container>
            }
            {section === 'servicios' &&
                <Fab color="primary" aria-label="add" sx={{ position: 'fixed', bottom: '1rem', right: '1rem' }} onClick={handleOpenModal}>
                    <Add />
                </Fab>
            }
            <BasicModalService openModal={openModal} cerrarModal={handleCloseModal} />
        </Container>
    )
}

EventDetails.propTypes = {
    event: PropTypes.shape({
        nombreDelEvento: PropTypes.string.isRequired,
        fechaEventoIni: PropTypes.string.isRequired,
        fechaEventoFin: PropTypes.string.isRequired,
        lugar: PropTypes.shape({
            nombreDeInstalacion: PropTypes.string.isRequired,
            capacidadInstalacion: PropTypes.number.isRequired,
            costoDeInstalacion: PropTypes.number.isRequired,
            descripcionDeInstalacion: PropTypes.string.isRequired,
            localidadDeInstalacion: PropTypes.string.isRequired,
            montoDeReserva: PropTypes.number.isRequired,
            activo: PropTypes.bool.isRequired,

        }).isRequired,
        serviciosAdquiridos: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.number.isRequired,
                categoria: PropTypes.string.isRequired,
                nombreDeServicio: PropTypes.string.isRequired,
                monto: PropTypes.number.isRequired,
            }).isRequired
        ).isRequired,
    }).isRequired,
}

export default EventDetails
