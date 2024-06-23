

import { Container, Grid, Typography } from "@mui/material"
import { useState, useEffect } from "react"
import eventoService from "src/Services/evento.service"
import EventCard from "src/components/EventCard"
import { useNavigate } from 'react-router-dom'
import BasicModal from "src/components/modalReservar"

const Eventos = () => {
    const [listaEventos, setEventos] = useState([])
    const [selectedEvento, setSelectedEvento] = useState(null)
    const [openModal, setOpenModal] = useState(false)
    const navigate = useNavigate()

    const traerEventos = async () => {
        try {
            const usuarioId = localStorage.getItem('usuId')
            const listaDeEventos = await eventoService.getEventosById(usuarioId)
            console.log("Lista de eventos:", listaDeEventos)
            setEventos(listaDeEventos.data)
        } catch (error) {
            console.error("Error al traer los eventos:", error)
        }
    }

    useEffect(() => {
        traerEventos()
    }, [])

    const handleEventClick = (evento) => {
        console.log("Evento seleccionado:", evento)
        navigate(`/eventDetails`, { state: { event: evento } })
    }

    const handleEditClick = (evento) => {
        setSelectedEvento(evento)
        setOpenModal(true)
    }

    const handleCloseModal = () => {
        setOpenModal(false)
        setSelectedEvento(null)
        traerEventos()
    }

    return (
        <Container className="main" style={{ marginBottom: "5rem" }}>
            <Grid container spacing={2} justifyContent="center" marginTop="0.5rem">
                {listaEventos && listaEventos.length > 0 ?
                    listaEventos.map((evento, index) =>
                        <Grid item key={index} xs={12} sm={6.5} md={5} lg={5}>
                            <EventCard event={evento} onEventClick={handleEventClick} onEditClick={handleEditClick} />
                        </Grid>
                    )
                    :
                    <Grid item xs={12} style={{ textAlign: 'center' }}>
                        <Typography style={{ marginTop: '2rem', color: 'black' }}>
                            No hay eventos disponibles

                        </Typography>
                    </Grid>
                }
            </Grid>
            <BasicModal
                openModal={openModal}
                cerrarModal={handleCloseModal}
                evento={selectedEvento}
            />
        </Container>
    )
}

export default Eventos