import { Box, Button, Modal, Typography, Grid } from '@mui/material'
import PropTypes from 'prop-types'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import PeopleIcon from '@mui/icons-material/People'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'

import WcIcon from '@mui/icons-material/Wc'
import TerraceIcon from '@mui/icons-material/House'
import GardenIcon from '@mui/icons-material/Nature'
import ParkingIcon from '@mui/icons-material/LocalParking'
import HotelIcon from '@mui/icons-material/Hotel'
import KitchenIcon from '@mui/icons-material/Kitchen'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 350,
    maxHeight: '85vh',
    overflowY: 'auto',
    bgcolor: 'background.paper',
    p: 4,
    borderRadius: '0.5rem',
    border: '1px solid rgba(0, 0, 0, 0.1)',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.25)',
    pt: 0,
}

const DetallesInstalacion = ({ openModal, cerrarModal, instalacion }) => {
    const renderBooleanField = (condition, IconComponent, label) => {
        return condition ?
            <Grid item xs={6} key={label} sx={{ display: 'flex', alignItems: 'center' }}>
                <IconComponent sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="body2" color="text.primary">
                    {label}
                </Typography>
            </Grid>
            : null
    }

    return (
        <Modal
            open={openModal}
            onClose={cerrarModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <div style={{ padding: 15 }}>
                    <img
                        src={instalacion?.imagenPrincipal}
                        alt={instalacion?.nombreDeInstalacion}
                        style={{ width: '100%', borderRadius: '0.5rem', marginBottom: '1rem' }}
                    />
                    <Typography id="modal-modal-title" variant="h6" component="h2" align="center">
                        {instalacion?.nombreDeInstalacion}
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }} color="text.secondary">
                        {instalacion?.descripcionDeInstalacion}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                        <LocationOnIcon sx={{ mr: 1, color: 'primary.main' }} /> {instalacion?.localidadDeInstalacion}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                        <PeopleIcon sx={{ mr: 1, color: 'primary.main' }} /> Capacidad: {instalacion?.capacidadInstalacion}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                        <AttachMoneyIcon sx={{ mr: 1, color: 'primary.main' }} /> Costo: ${instalacion?.costoDeInstalacion}
                    </Typography>

                    <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                        <WcIcon sx={{ mr: 1, color: 'primary.main' }} /> Baños: {instalacion?.baños}
                    </Typography>
                    <Grid container spacing={1} sx={{ mt: 1 }}>
                        {renderBooleanField(instalacion?.terraza, TerraceIcon, 'Terraza')}
                        {renderBooleanField(instalacion?.jardin, GardenIcon, 'Jardín')}
                        {renderBooleanField(instalacion?.estacionamiento, ParkingIcon, 'Parking')}
                        {renderBooleanField(instalacion?.alojamiento, HotelIcon, 'Alojamiento')}
                        {renderBooleanField(instalacion?.cocina, KitchenIcon, 'Cocina')}
                    </Grid>
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
                        <Button variant="contained" color="primary" onClick={cerrarModal}>
                            Volver
                        </Button>
                    </div>
                </div>
            </Box>
        </Modal>
    )
}

DetallesInstalacion.propTypes = {
    openModal: PropTypes.bool.isRequired,
    cerrarModal: PropTypes.func.isRequired,
    instalacion: PropTypes.object,
}

export default DetallesInstalacion
