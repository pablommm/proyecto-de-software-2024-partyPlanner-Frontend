import PropTypes from 'prop-types'
import { Card, CardActionArea, CardContent, Box } from "@mui/material"
import AddHomeIcon from '@mui/icons-material/AddHome'

const AddInstalacionCard = ({ onClick }) => {
    const handleClick = () => {
        onClick()
    }

    return (
        <Card sx={{
            minWidth: 300,
            minHeight: 380,
            maxWidth: 300,
            maxHeight: 500,
            borderRadius: '1rem',
            border: '2px dashed #1976d2',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
            transition: 'transform 0.2s ease-in-out',
            '&:hover': {
                transform: 'scale(1.05)',
                boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.2)',
                borderColor: '#42a5f5',
            },
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#e3f2fd',
        }}>
            <CardActionArea onClick={handleClick}>
                <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                        <AddHomeIcon sx={{ fontSize: 80, color: '#1976d2' }} />
                    </Box>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

AddInstalacionCard.propTypes = {
    onClick: PropTypes.func.isRequired,
}

export default AddInstalacionCard
