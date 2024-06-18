import { Container, Grid } from '@mui/material'
import EventRoomCard from 'src/components/roomCard'
import AddInstalacionCard from 'src/components/addInstalacionCard'
import { useState, useEffect, useContext } from 'react'
import BasicModal from 'src/components/modalReservar'
import InstalacionService from 'src/Services/instalacionService'
import TextField from '@mui/material/TextField'
import instalacionService from 'src/Services/instalaciones.service'
import SearchIcon from '@mui/icons-material/Search'
import { InputAdornment } from '@material-ui/core'
import AgregarInstalacion from 'src/components/modalNuevaInsta'
import UserContext from 'src/Services/context'

const PrincipalView = () => {
  const [openModal, setOpenModal] = useState(false)
  const [selectedRoom, setSelectedRoom] = useState(null)
  const [instalaciones, setInstalaciones] = useState([])
  const [terminoDeBusqueda, setTerminoDeBusqueda] = useState('')
  const [openModalInstalacion, setOpenModalInstalacion] = useState(false)
  const [user, setUser] = useContext(UserContext)


  const fetchInstalaciones = async () => {
    try {
      const response = await InstalacionService.traerInstalaciones()
      setInstalaciones(response.data)
    } catch (error) {
      console.error('Error al obtener las instalaciones:', error)
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
        setInstalaciones(response.data)
      } else {
        fetchInstalaciones()
      }
    } catch (error) {
      console.error('Error al obtener las instalaciones:', error)
    }
  }

  const manejarPresionarEnter = (event) => {
    if (event.key === 'Enter') {
      busqueda()
    }
  }
  const handleCloseModalInsta = () => {
    setOpenModalInstalacion(false)
  }

  const handleAddInstalacionClick = () => {
    setOpenModalInstalacion(true)
    console.log('Agregar nueva instalación')
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
          ,
        }}
      />
      <Grid container spacing={3} justifyContent="center">
        {user.rol === 'PROPIETARIO' &&
          <Grid item>
            <AddInstalacionCard onClick={handleAddInstalacionClick} />
          </Grid>
        }
        {instalaciones.map((instalacion, index) =>
          <Grid item key={index}>
            <EventRoomCard
              room={instalacion}
              onClick={() => handleRoomClick(instalacion)}
            />
          </Grid>
        )}
      </Grid>
      <BasicModal
        openModal={openModal}
        cerrarModal={handleCloseModal}
        instalacion={selectedRoom}

      />
      <AgregarInstalacion
        openModal={openModalInstalacion}
        cerrarModal={handleCloseModalInsta}

      />
    </Container>
  )
}

export default PrincipalView
