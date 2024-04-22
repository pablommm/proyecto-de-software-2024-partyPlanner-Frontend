import PropTypes from 'prop-types'
import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography } from "@mui/material"
import { useState } from "react"

const EventRoomCard = ({ room, onClick }) => {
    const { imagen, nombre, descripcion, costo, capacidad, localidad } = room
    const [expanded, setExpanded] = useState(false)

    const toggleExpanded = () => {
        setExpanded(!expanded)
    }

    const handleReservarClick = () => {
        onClick(room)
    }

    return (
        <Card sx={{
            maxWidth: 345,
            borderRadius: '0.5rem',
            border: '1px solid black',
            boxShadow: '-2px 2px 4px 0px rgba(0, 0, 0, 0.75)',
        }}>
            <CardActionArea onClick={handleReservarClick}>
                <CardMedia
                    component="img"
                    height="140"
                    image={imagen}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {nombre}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {expanded ? descripcion : descripcion.slice(0, 30)}
                        {descripcion.length > 30 &&
                            <Button onClick={toggleExpanded}>
                                {expanded ? 'Leer menos' : 'Leer más'}
                            </Button>
                        }
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {capacidad}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions style={{ justifyContent: 'center' }}>
                <Button size="small" color="primary" style={{ justifyContent: 'center' }} onClick={handleReservarClick}>
                    Reservar
                </Button>
            </CardActions>
        </Card>
    )
}

EventRoomCard.propTypes = {
    room: PropTypes.shape({
        imagen: PropTypes.string.isRequired,
        nombre: PropTypes.string.isRequired,
        descripcion: PropTypes.string.isRequired,
        costo: PropTypes.number.isRequired,
        capacidad: PropTypes.number.isRequired,
        localidad: PropTypes.string.isRequired,
    }).isRequired,
    onClick: PropTypes.func.isRequired,
}

export default EventRoomCard
