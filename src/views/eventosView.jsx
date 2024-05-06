import { Container, Grid } from "@mui/material"
import { useState, useEffect } from "react"
import eventoService from "src/Services/evento.service"
import EventCard from "src/components/EventCard"
import { useNavigate } from 'react-router-dom'

const Eventos = () => {
    const [listaEventos, setEventos] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const traerEventos = async () => {
            try {
                const usuarioId = localStorage.getItem('usuId')
                const listaDeEventos = await eventoService.getEventosById(usuarioId)
                console.log("Lista de eventos:", listaDeEventos.data) // Agregar un console.log para depurar
                setEventos(listaDeEventos.data)
            } catch (error) {
                console.error("Error al traer los eventos:", error)
            }
        }
        traerEventos()
    }, [])

    const handleEventClick = (evento) => {
        console.log("Evento seleccionado:", evento)
        navigate(`/eventDetails`, { state: { event: evento } })
    }

    return (
        <Container className="main" style={{ marginBottom: "5rem" }}>
            <Grid container spacing={3} justifyContent="center">
                {listaEventos && listaEventos.length > 0 ?
                    listaEventos.map((evento, index) =>
                        <Grid item key={index} xs={12} sm={6} md={4} lg={4}>
                            <EventCard event={evento} onEventClick={handleEventClick} />
                        </Grid>
                    )
                    :
                    <Grid item xs={12}>
                        No hay eventos disponibles.
                    </Grid>
                }
            </Grid>
        </Container>
    )
}

export default Eventos
