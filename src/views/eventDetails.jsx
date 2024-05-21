import { CardMedia, Container, Grid, IconButton, Typography, Fab } from "@mui/material"
import { EventNote, AccountBalance, LocationOn, Add } from "@mui/icons-material"
import QrCodeTwoToneIcon from '@mui/icons-material/QrCodeTwoTone'
import BasicModalService from 'src/components/modalServicio'
import React, { useEffect, useState } from "react"
import PropTypes from 'prop-types'
import { useLocation } from "react-router-dom"
import { format } from 'date-fns'
import QRCodeComponent from '../components/QR' // Importar la función format de date-fns
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft'
import { Link } from 'react-router-dom'
import CheckCircleTwoToneIcon from '@mui/icons-material/CheckCircleTwoTone'
import WarningTwoToneIcon from '@mui/icons-material/WarningTwoTone'
import ReportTwoToneIcon from '@mui/icons-material/ReportTwoTone'
import eventoService from "src/Services/evento.service"

const EventDetails = () => {
    const location = useLocation()
    const event = location.state.event
    const [selectedService, setSelectedService] = useState(null)
    const [openModal, setOpenModal] = useState(false)
    const [section, setSection] = useState(null)
    const [services, setServices] = useState([])
    const qrContent = `Evento: ${event.nombreDelEvento}\nLugar: ${event.lugar.nombreDeInstalacion}\nFecha: ${format(new Date(event.fechaEventoIni), 'dd/MM/yyyy')} - ${format(new Date(event.fechaEventoFin), 'dd/MM/yyyy')}`

    const traerServiciosAdquiridos = async () => {
        try {
            const response = await eventoService.traerServiciosAdquiridos(event.id)
            setServices(response)
        } catch (error) {
            console.error('Error al traer los servicios adquiridos:', error)
        }
    }

    useEffect(() => {
        traerServiciosAdquiridos()
    }, [event.id])

    const handleCloseModal = () => {
        setOpenModal(false)
        setSelectedService(null)
        traerServiciosAdquiridos()
    }


    const handleSectionClick = (sectionName) => {
        setSection(sectionName === section ? null : sectionName)
    }

    const handleOpenModal = () => {
        setOpenModal(true)
    }
    const handleDeleteService = (serviceId) => {
        console.log("Eliminar servicio con ID:", serviceId)
    }
    const handleEditService = (service) => {
        setSelectedService(service)
        setOpenModal(true)
    }


    // Calcular el total gastado
    const totalGastado = event.serviciosAdquiridos.reduce((total, servicio) => total + servicio.monto + (event.lugar.costoDeInstalacion - event.lugar.montoDeReserva), 0)

    return (

        <Container sx={{
            width: '100%',
            height: 'auto',
            objectFit: 'cover',
            borderRadius: "0.5rem",
            paddingBottom: "2rem",
            backgroundColor: "#ffffff"
        }}>
            <IconButton component={Link} to="/eventos">
                <ArrowCircleLeftIcon color="9d9d9d" sx={{ fontSize: 50 }}></ArrowCircleLeftIcon>
            </IconButton>
            <CardMedia
                component="img"
                sx={{
                    width: '100%',
                    height: 'auto',
                    objectFit: 'cover',
                    borderRadius: "0.5rem",
                    marginBottom: "1rem",


                }}
                image={event.lugar.imagenPrincipal}
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
                <Grid item>

                    <IconButton
                        onClick={() => handleSectionClick('qr')}
                        sx={{
                            transition: "transform 0.2s",
                            "&:hover": { transform: "scale(1.1)" }
                        }}
                    >
                        <QrCodeTwoToneIcon />
                    </IconButton>
                </Grid>

            </Grid>
            {section === 'evento' &&
                <Container sx={{ backgroundColor: "#9d9d9d", padding: "1rem", borderRadius: "0.5rem", marginBottom: "1rem" }}>
                    <Typography variant="h5" sx={{ color: "#000006", marginBottom: "0.5rem" }}>{event.nombreDelEvento}</Typography>
                    <Typography variant="body1" sx={{ color: "#000006" }}>Inicio: {format(new Date(event.fechaEventoIni), 'dd/MM/yyyy')}</Typography>
                    <Typography variant="body1" sx={{ color: "#000006" }}>Fin: {format(new Date(event.fechaEventoFin), 'dd/MM/yyyy')}</Typography>
                    <Typography variant="body1" sx={{ color: "#000006" }}>Lugar: {event.lugar.nombreDeInstalacion}</Typography>

                </Container>
            }
            {section === 'lugar' &&
                <Container sx={{ fontWeight: 'bold', backgroundColor: "#9d9d9d", padding: "1rem", borderRadius: "0.5rem", marginBottom: "1rem" }}>
                    <Typography variant="h5" sx={{ color: "#000006", marginBottom: "0.5rem" }}>Lugar: {event.lugar.nombreDeInstalacion}</Typography>
                    <Typography variant="body1" sx={{ color: "#000006" }}>Capacidad: {event.lugar.capacidadInstalacion}</Typography>
                    <Typography variant="body1" sx={{ color: "#000006 " }}>Costo: {event.lugar.costoDeInstalacion}</Typography>
                    <Typography variant="body1" sx={{ color: "#000006 " }}>Descripción: {event.lugar.descripcionDeInstalacion}</Typography>
                    <Typography variant="body1" sx={{ color: "#000006 " }}>Localidad De Instalacion: {event.lugar.localidadDeInstalacion}</Typography>
                    <Typography variant="body1" sx={{ color: "#000006 " }}>Monto De Reserva: {event.lugar.montoDeReserva}</Typography>
                </Container>

            }
            {section === 'qr' &&
                <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                    <QRCodeComponent value={qrContent} size={256} />
                </Container>
            }

            {section === 'servicios' && event.serviciosAdquiridos.length > 0 &&
                <Container sx={{ backgroundColor: "#9d9d9d", padding: "1rem", borderRadius: "0.5rem", marginBottom: "1rem" }}>
                    <Typography variant="h6" sx={{ color: "#000006", marginBottom: "1rem", textAlign: 'center', fontWeight: 'bold' }}>Total Gastado: ${totalGastado}</Typography>
                    <CheckCircleTwoToneIcon sx={{ color: '#00913f', fontSize: 40 }} /> Esta todo bien
                    <WarningTwoToneIcon sx={{ color: '#FFD300', fontSize: 40 }} /> Al limite de tu presupuesto
                    <ReportTwoToneIcon sx={{ color: '#FF0000', fontSize: 40 }} /> Excediste tu presupuesto
                    <Grid container spacing={3} justifyContent="center" className="table-container">
                        <Grid item xs={3} sm={3} sx={{ borderBottom: "1px solid #ccc" }}>
                            <Typography variant="subtitle1" className="table-header" sx={{ color: "#000006", fontWeight: 'bold', textAlign: "center" }}>Categoría</Typography>
                        </Grid>
                        <Grid item xs={3} sm={3} sx={{ borderBottom: "1px solid #ccc" }}>
                            <Typography variant="subtitle1" className="table-header" sx={{ color: "#000006", fontWeight: 'bold', textAlign: "center" }}>Nombre</Typography>
                        </Grid>
                        <Grid item xs={3} sm={3} sx={{ borderBottom: "1px solid #ccc" }}>
                            <Typography variant="subtitle1" className="table-header" sx={{ color: "#000006", fontWeight: 'bold', textAlign: "center" }}>Monto</Typography>
                        </Grid>
                        <Grid item xs={3} sm={3} sx={{ borderBottom: "1px solid #ccc" }}>
                            <Typography variant="subtitle1" className="table-header" sx={{ color: "#000006", fontWeight: 'bold', textAlign: "center" }}>Acciones</Typography>
                        </Grid>
                        {services.map(servicio =>
                            <React.Fragment key={servicio.id}>
                                <Grid item xs={3} sm={3} sx={{ color: "#000006", borderBottom: "1px solid #ccc", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Typography variant={servicio.categoria.length > 6 ? "body2" : "body1"} sx={{ textAlign: "center", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{servicio.categoria}</Typography>
                                </Grid>
                                <Grid item xs={3} sm={3} sx={{ color: "#000006", borderBottom: "1px solid #ccc", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Typography variant="body2" sx={{ textAlign: "center" }}>{servicio.nombreDeServicio}</Typography>
                                </Grid>
                                <Grid item xs={3} sm={3} sx={{ color: "#000006", borderBottom: "1px solid #ccc", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Typography variant="body2" sx={{ textAlign: "center" }}>${servicio.monto}</Typography>
                                </Grid>
                                <Grid item xs={3} sm={3} sx={{ color: "#000006", borderBottom: "1px solid #ccc", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <IconButton onClick={() => handleEditService(servicio)}><EditIcon /></IconButton>
                                    <IconButton onClick={() => handleDeleteService(servicio.id)}><DeleteIcon /></IconButton>
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
                <Fab color="#000006" aria-label="add" sx={{ position: 'fixed', bottom: '1rem', right: '1rem' }} onClick={handleOpenModal}>
                    <Add />
                </Fab>
            }
            <BasicModalService openModal={openModal} cerrarModal={handleCloseModal} eventoID={event.id} servicio={selectedService}
            />
        </Container>
    )
}

EventDetails.propTypes = {
    event: PropTypes.shape({
        id: PropTypes.number.isRequired,
        nombreDelEvento: PropTypes.string.isRequired,
        fechaEventoIni: PropTypes.string.isRequired,
        fechaEventoFin: PropTypes.string.isRequired,
        lugar: PropTypes.shape({
            nombreDeInstalacion: PropTypes.string.isRequired,
            imagenPrincipal: PropTypes.string.isRequired,
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
