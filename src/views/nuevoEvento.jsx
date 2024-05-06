import { useState } from 'react'
import { Button, Container, TextField, Typography } from "@mui/material"
import { useNavigate } from 'react-router-dom'
import { Evento } from "src/Dominio/evento"
import eventoService from 'src/Services/evento.service'

const NuevoEvento = () => {
    const navigate = useNavigate()
    const [nombreDelEvento, setNombreDelEvento] = useState('')
    const [fechaEventoIni, setFechaEventoIni] = useState('')
    const [fechaEventoFin, setFechaEventoFin] = useState('')

    const crear = async () => {
        const nuevoEvento = new Evento()
        nuevoEvento.nombreDelEvento = nombreDelEvento
        nuevoEvento.Lugar = 2
        nuevoEvento.fechaEventoIni = new Date(fechaEventoIni).toISOString()
        nuevoEvento.fechaEventoFin = new Date(fechaEventoFin).toISOString()
        nuevoEvento.owner = localStorage.getItem('usuId')

        console.log("Nuevo evento:", nuevoEvento)


        const respuestaCrearEvento = await eventoService.crearEvento(nuevoEvento)
        console.log("Respuesta de creación de evento:", respuestaCrearEvento)
        console.log("Evento creado exitosamente.")
        navigate('/instalaciones')

    }

    const handleSubmit = (event) => {
        event.preventDefault()
        console.log("Submit del formulario")
        crear()
    }

    return (
        <Container className="main" style={{ marginBottom: "5rem" }}>
            <Typography variant="h5" align="center" gutterBottom>
                Nuevo Evento
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Nombre"
                    name="nombreDelEvento"
                    fullWidth
                    margin="normal"
                    value={nombreDelEvento}
                    onChange={(e) => setNombreDelEvento(e.target.value)}
                />

                <TextField
                    label="Fecha Inicio"
                    name="fechaEventoIni"
                    type="date"
                    fullWidth
                    margin="normal"
                    value={fechaEventoIni}
                    onChange={(e) => setFechaEventoIni(e.target.value)}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <TextField
                    label="Fecha Final"
                    name="fechaEventoFin"
                    type="date"
                    fullWidth
                    margin="normal"
                    value={fechaEventoFin}
                    onChange={(e) => setFechaEventoFin(e.target.value)}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />

                <div>
                    <Button type="submit" variant="contained" fullWidth>
                        Crear
                    </Button>
                </div>
            </form>
        </Container>
    )
}

export default NuevoEvento