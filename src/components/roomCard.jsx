import PropTypes from 'prop-types'
import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography } from "@mui/material"
import { useState } from "react"

const EventRoomCard = ({ room, onClick }) => {
    const { imagenPrincipal, nombreDeInstalacion, descripcionDeInstalacion, costoDeInstalacion, capacidadInstalacion, localidadDeInstalacion } = room
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
                    image={imagenPrincipal}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {nombreDeInstalacion}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {expanded ? descripcionDeInstalacion : descripcionDeInstalacion.slice(0, 30)}
                        {descripcionDeInstalacion.length > 30 &&
                            <Button onClick={(e) => { toggleExpanded(); e.stopPropagation() }}>
                                {expanded ? 'Leer menos' : 'Leer más'}
                            </Button>
                        }
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Ubicacion:    {localidadDeInstalacion}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Capacidad:   {capacidadInstalacion}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Costo:    ${costoDeInstalacion}
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
        imagenPrincipal: PropTypes.string.isRequired,
        nombreDeInstalacion: PropTypes.string.isRequired,
        descripcionDeInstalacion: PropTypes.string.isRequired,
        costoDeInstalacion: PropTypes.number.isRequired,
        capacidadInstalacion: PropTypes.number.isRequired,
        localidadDeInstalacion: PropTypes.string.isRequired,
    }).isRequired,
    onClick: PropTypes.func.isRequired,
}

export default EventRoomCard
