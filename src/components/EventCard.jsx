import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'

const EventCard = () => {
    return (

        <Card sx={{
            display: 'flex',
            borderRadius: '0.5rem',
            border: '1px solid black',
            boxShadow: '-2px 2px 4px 0px rgba(0, 0, 0, 0.75)',

        }}>
            <CardMedia
                component="img"
                sx={{ width: 100 }}
                image="https://starwalk.space/gallery/images/what-is-space/1920x1080.jpg"
                alt="Live from space album cover"
            />
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography component="div" variant="h6">
                        Boda de Martha
                    </Typography>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant="subtitle1" color="text.secondary" component="div">
                            Boda en
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary" component="div" sx={{ ml: 1 }}>
                            Mix Eventos
                        </Typography>
                    </div>
                    <Typography variant="subtitle1" color="text.secondary" component="div">
                        14/04/2024 / 18:00
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" component="div">
                        Gasto: $3,000,000
                    </Typography>
                </CardContent>
            </Box>
        </Card>

    )
}

export default EventCard
