import { Card, CardActionArea, CardContent, CardMedia, Typography, IconButton, Avatar, Box } from '@mui/material'
import PropTypes from 'prop-types'
import { format } from 'date-fns'
import EditIcon from '@mui/icons-material/Edit'
import { green, red } from '@mui/material/colors'

const EventCard = ({ event, onEventClick, onEditClick }) => {
    const { nombreDelEvento, lugar, fechaEventoIni, fechaEventoFin, activo } = event

    const handleEventClick = () => {
        onEventClick(event)
    }

    const handleEditClick = (e) => {
        e.stopPropagation()
        onEditClick(event)
    }

    const indicatorColor = activo ? green[500] : red[500]

    return (
        <Card sx={{ display: 'flex', borderRadius: '0.5rem', border: '1px solid black', boxShadow: '-2px 2px 4px 0px rgba(0, 0, 0, 0.75)', minWidth: 400 }}>
            <CardActionArea onClick={handleEventClick} sx={{ display: 'contents' }}>
                <CardMedia component="img" sx={{ minWidth: 100, width: '30%', aspectRatio: '1', objectFit: 'cover' }} image="https://i.pinimg.com/originals/d5/e0/b2/d5e0b288b501eee222c10589969063ba.jpg" alt="Live from space album cover" />
                <Box sx={{ display: 'flex', flexDirection: 'column', flex: '1 0 auto', position: 'relative', minWidth: 0 }}>
                    <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', flexGrow: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', width: '80%' }}>
                            <Typography
                                component="div"
                                variant="h6"
                                sx={{
                                    marginRight: 'auto',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap',
                                    flexGrow: 1,
                                    minWidth: 0,
                                    maxWidth: '70%',
                                }}
                            >
                                {nombreDelEvento}
                            </Typography>
                            <IconButton size="small" onClick={handleEditClick}>
                                <EditIcon />
                            </IconButton>
                            <Avatar sx={{ bgcolor: indicatorColor, width: 15, height: 15, position: 'absolute', top: '8px', right: '20px', color: 'white', fontSize: '0.75rem' }}>
                                {activo ? 'A' : 'I'}
                            </Avatar>
                        </Box>
                        <Typography variant="subtitle1" color="text.secondary" sx={{ mt: 1 }}>{lugar.nombreDeInstalacion}</Typography>
                        <Typography variant="subtitle1" color="text.secondary">{format(new Date(fechaEventoIni), 'dd/MM/yyyy')} / {format(new Date(fechaEventoFin), 'dd/MM/yyyy')}</Typography>
                    </CardContent>

                </Box>
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
        activo: PropTypes.bool.isRequired,
    }).isRequired,
    onEventClick: PropTypes.func.isRequired,
    onEditClick: PropTypes.func.isRequired,
}

export default EventCard
