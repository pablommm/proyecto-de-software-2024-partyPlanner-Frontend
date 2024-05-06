import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material'
import PropTypes from 'prop-types'
import { format } from 'date-fns'

const EventCard = ({ event, onEventClick }) => {
    const { nombreDelEvento, lugar, fechaEventoIni, fechaEventoFin } = event

    const handleEventClick = () => {
        onEventClick(event)
    }

    return (
        <Card sx={{ display: 'flex', borderRadius: '0.5rem', border: '1px solid black', boxShadow: '-2px 2px 4px 0px rgba(0, 0, 0, 0.75)', minWidth: 300 }}>
            <CardActionArea onClick={handleEventClick} sx={{ display: 'contents' }}>
                <CardMedia component="img" sx={{ minWidth: 100, width: '30%', aspectRatio: '1', objectFit: 'cover' }} image="https://i.pinimg.com/originals/d5/e0/b2/d5e0b288b501eee222c10589969063ba.jpg" alt="Live from space album cover" />
                <CardContent sx={{ display: 'flex', flexDirection: 'column', flex: '1 0 auto' }}>
                    <Typography component="div" variant="h6">{nombreDelEvento}</Typography>
                    <Typography variant="subtitle1" color="text.secondary" component="div" sx={{ ml: 1 }}>{lugar.nombreDeInstalacion}</Typography>
                    <Typography variant="subtitle1" color="text.secondary" component="div">{format(new Date(fechaEventoIni), 'dd/MM/yyyy')} / {format(new Date(fechaEventoFin), 'dd/MM/yyyy')}</Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

EventCard.propTypes = {
    event: PropTypes.shape({
        nombreDelEvento: PropTypes.string.isRequired,
        lugar: PropTypes.shape({
            nombreDeInstalacion: PropTypes.string.isRequired,
        }).isRequired,
        fechaEventoIni: PropTypes.string.isRequired,
        fechaEventoFin: PropTypes.string.isRequired,
    }).isRequired,
    onEventClick: PropTypes.func.isRequired,
}

export default EventCard
