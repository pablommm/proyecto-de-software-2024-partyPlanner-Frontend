
import PropTypes from 'prop-types'
import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography } from "@mui/material"
import { useState } from "react"
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'

const EventRoomCard = ({ room, onClickReservar, onClickDetalles, context, onClickEditar, onClickFecha }) => {
    const { imagenPrincipal, nombreDeInstalacion, descripcionDeInstalacion, costoDeInstalacion, capacidadInstalacion, localidadDeInstalacion } = room
    const [expanded, setExpanded] = useState(false)

    const toggleExpanded = () => {
        setExpanded(!expanded)
    }

    const handleDetallesClick = () => {
        onClickDetalles(room)
    }
    const handleButtonClick = () => {
        if (context === 'PrincipalView') {
            onClickReservar(room)
        } else {
            onClickEditar(room)
        }
    }

    const handleButtonClickFecha = () => {
        onClickFecha()
    }
    return (
        <Card sx={{
            minWidth: 300,
            minHeight: 380,

            maxWidth: 300,
            maxHeight: 500,

            borderRadius: '0.5rem',
            border: '1px solid black',
            boxShadow: '-2px 2px 4px 0px rgba(0, 0, 0, 0.75)',
        }}>
            <CardActionArea onClick={handleDetallesClick}>
                <CardMedia
                    component="img"
                    height="140"
                    image={imagenPrincipal}
                    sx={{ objectFit: "fill" }}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {nombreDeInstalacion}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" >
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
            <CardActions style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                <Button
                    size="medium"
                    color="primary"
                    variant="contained"
                    onClick={handleButtonClick}
                    style={{ marginBottom: '8px', width: '200px' }}
                >
                    {context === 'PrincipalView' ? 'Reservar' : 'Editar Salón'}
                </Button>
                {context === 'Propietario' &&
                    <Button
                        size="medium"
                        variant="contained"
                        onClick={handleButtonClickFecha}
                        startIcon={<CalendarTodayIcon />}
                        style={{ backgroundColor: 'white', color: 'black', border: '1px solid black', width: '200px' }}
                    >
                        Bloquear Fecha
                    </Button>
                }
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
    onClickReservar: PropTypes.func.isRequired,
    onClickDetalles: PropTypes.func.isRequired,
    context: PropTypes.string.isRequired,
    onClickEditar: PropTypes.func.isRequired,
    onClickFecha: PropTypes.func.isRequired,


}

export default EventRoomCard