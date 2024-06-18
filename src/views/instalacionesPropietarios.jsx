import { Container, Grid, TextField } from '@mui/material'
import EventRoomCard from 'src/components/roomCard'
import { useState, useEffect } from 'react'
import BasicModal from 'src/components/modalReservar'
import SearchIcon from '@mui/icons-material/Search'
import { InputAdornment } from '@material-ui/core'
import usuarioService from 'src/Services/usuario.service'
import instalacionService from 'src/Services/instalacionService'

const InstalacionesPropietario = () => {
    const [openModal, setOpenModal] = useState(false)
    const [selectedRoom, setSelectedRoom] = useState(null)
    const [instalacionesProp, setInstalacionesProp] = useState([])
    const [terminoDeBusqueda, setTerminoDeBusqueda] = useState('')

    const fetchInstalaciones = async () => {
        const usuarioId = localStorage.getItem('usuId')
        if (!usuarioId) {
            console.error('User ID is not available in localStorage')
            return
        }

        try {
            const response = await usuarioService.traerInstalacionDePropietario(usuarioId)
            setInstalacionesProp(response)
            console.log("en la vista", response)
        } catch (error) {
            console.error('Error fetching installations:', error)
            setInstalacionesProp([])
        }
    }

    useEffect(() => {
        fetchInstalaciones()
    }, [])

    const handleRoomClick = (room) => {
        setSelectedRoom(room)
        setOpenModal(true)
    }

    const handleCloseModal = () => {
        setOpenModal(false)
    }

    const manejarCambioBúsqueda = (evento) => {
        setTerminoDeBusqueda(evento.target.value)
    }


    const busqueda = async () => {
        try {
            if (terminoDeBusqueda !== '') {
                const response = await instalacionService.busquedaDeInstalaciones(terminoDeBusqueda)
                setInstalacionesProp(response.data || [])
            } else {
                fetchInstalaciones()
            }
        } catch (error) {
            console.error('Error al obtener las instalaciones:', error)
            setInstalacionesProp([])
        }
    }
    const manejarPresionarEnter = (event) => {
        if (event.key === 'Enter') {
            busqueda()
        }
    }

    return (
        <Container className="main" style={{ marginBottom: '10rem' }}>
            <TextField
                label="Buscar salones"
                variant="outlined"
                margin="normal"
                fullWidth
                value={terminoDeBusqueda}
                onChange={manejarCambioBúsqueda}
                onKeyDown={manejarPresionarEnter}
                placeholder="Nombre del salón o localidad"
                helperText="Filtrar por nombre del salón o localidad"
                InputProps={{
                    startAdornment:
                        <InputAdornment position="end">
                            <SearchIcon sx={{ paddingRight: 1 }} />
                        </InputAdornment>
                }}
            />
            <Grid container spacing={3} justifyContent="center">
                {instalacionesProp && instalacionesProp.length > 0 ?
                    instalacionesProp.map((instalacion, index) =>
                        <Grid item key={index}>
                            <EventRoomCard
                                room={instalacion}
                                onClick={() => handleRoomClick(instalacion)}
                            />
                        </Grid>
                    )
                    :
                    <p>No installations available.</p>
                }
            </Grid>
            <BasicModal
                openModal={openModal}
                cerrarModal={handleCloseModal}
                instalacion={selectedRoom}
            />
        </Container>
    )
}

export default InstalacionesPropietario
