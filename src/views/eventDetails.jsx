import {
  CardMedia,
  Container,
  Grid,
  IconButton,
  Typography,
  Fab,
  Box,
  Button,
} from '@mui/material'
import { EventNote, AccountBalance, LocationOn, Add } from '@mui/icons-material'
import QrCodeTwoToneIcon from '@mui/icons-material/QrCodeTwoTone'
import BasicModalService from 'src/components/modalServicio'
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useLocation } from 'react-router-dom'
import { format } from 'date-fns'
import QRCodeComponent from '../components/QR' // Importar la función format de date-fns
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft'
import { Link } from 'react-router-dom'
import CheckCircleTwoToneIcon from '@mui/icons-material/CheckCircleTwoTone'
import WarningTwoToneIcon from '@mui/icons-material/WarningTwoTone'
import ReportTwoToneIcon from '@mui/icons-material/ReportTwoTone'
import eventoService from 'src/Services/evento.service'
import servicioService from 'src/Services/servicio.service'

import WhatsAppIcon from '@mui/icons-material/WhatsApp'
import ShareIcon from '@mui/icons-material/Share'
import TelegramIcon from '@mui/icons-material/Telegram'
//import { Linking } from 'react-native'

const EventDetails = () => {
  const location = useLocation()
  const event = location.state.event
  const [selectedService, setSelectedService] = useState(null)
  const [openModal, setOpenModal] = useState(false)
  const [section, setSection] = useState(null)
  const [services, setServices] = useState([])
  const qrContent = `Evento: ${event.nombreDelEvento}\nLugar: ${event.lugar.nombreDeInstalacion}\nFecha: ${format(new Date(event.fechaEventoIni), 'dd/MM/yyyy')} - ${format(new Date(event.fechaEventoFin), 'dd/MM/yyyy')}`
  const [totalGastado, setTotalGastado] = useState(0)

  const traerServiciosAdquiridos = async () => {
    try {
      const response = await eventoService.traerServiciosAdquiridos(event.id)
      setServices(response)
    } catch (error) {
      console.error('Error al traer los servicios adquiridos:', error)
    }
  }
  const deleteService = async (serviceId) => {
    try {
      console.log('Eliminar servicio con ID:', serviceId)
      await servicioService.deleteServicio(serviceId)
      traerServiciosAdquiridos()
    } catch (error) {
      console.error('error', error)
    }
  }

  useEffect(() => {
    traerServiciosAdquiridos()
  }, [event.id])

  const handleCloseModal = () => {
    setOpenModal(false)
    setSelectedService(null)
    traerServiciosAdquiridos()
    consultaEstadoPresupuesto(event)
  }

  const handleSectionClick = (sectionName) => {
    setSection(sectionName === section ? null : sectionName)
  }

  const handleOpenModal = () => {
    setOpenModal(true)
  }

  const handleEditService = (service) => {
    setSelectedService(service)
    setOpenModal(true)
  }
  useEffect(() => {
    const totalServicios = services.reduce(
      (total, servicio) => total + servicio.monto,
      0,
    )
    const totalInstalacion =
      event.lugar.costoDeInstalacion - event.lugar.montoDeReserva
    setTotalGastado(totalServicios + totalInstalacion)
  }, [services, event.lugar.costoDeInstalacion, event.lugar.montoDeReserva])

  function consultaEstadoPresupuesto(event) {
    var estadoPresupuesto = event.estadoPresupuesto
    console.log('estoy mostrado el evento', event)
    console.log('estoy mostrado estado del presupuesto', estadoPresupuesto)
    var componenteAviso = 0

    if (estadoPresupuesto === 1) {
      componenteAviso = (
        <CheckCircleTwoToneIcon
          sx={{ color: '#00913f', fontSize: 40 }}
          Estas
          dentro
          de
          tu
          presupuesto
        />
      )
    } else if (estadoPresupuesto === 2) {
      componenteAviso = (
        <WarningTwoToneIcon
          sx={{ color: '#FFD300', fontSize: 40 }}
          te
          has
          pasado
          de
          tu
          presupuesto
        />
      )
    } else if (estadoPresupuesto === 3) {
      componenteAviso = (
        <ReportTwoToneIcon sx={{ color: '#FF0000', fontSize: 40 }}>
          {' '}
          te has pasado de tu presupuesto
        </ReportTwoToneIcon>
      )
    }

    return componenteAviso
  }

  const handleWhatsAppPress = () => {
    //window.open('https://api.whatsapp.com/send?text=te%20invitamos%20a%20nuestro%20casamiento!')
    //const url = 'https://api.whatsapp.com/send?text=fedequierealosladyboys'
    //Linking.openURL(url)
    const dateObject = new Date(event.fechaEventoIni) // Assuming event.fechaEventoIni is a valid Date object
    const formattedDate = dateObject.toLocaleDateString('es-AR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })
    const timeString = new Date(event.fecha).toLocaleTimeString('es-AR', {
      hour: 'numeric',
      minute: 'numeric',
    })
    const hours = dateObject.getHours().toString().padStart(2, '0') // Ensure two digits
    const minutes = dateObject.getMinutes().toString().padStart(2, '0') // Ensure two digits
    const seconds = dateObject.getSeconds().toString().padStart(2, '0')

    const message = `te invitamos a 
        ${event.nombreDelEvento} la fecha ${formattedDate} a las ${hours} en la localidad ${event.lugar.localidadDeInstalacion}`

    const url = `https://wa.me/?text=${message}`
    window.open(url)
  }

  const handletelegram = () => {

    const dateObject = new Date(event.fechaEventoIni) // Assuming event.fechaEventoIni is a valid Date object
    const formattedDate = dateObject.toLocaleDateString('es-AR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })
    const hours = dateObject.getHours().toString().padStart(2, '0') // Ensure two digits

    const message = `la fecha ${formattedDate} a las ${hours} en la localidad ${event.lugar.localidadDeInstalacion}`
    const url = `https://t.me/share/url?url=Te invitamos ${event.nombreDelEvento} : &text=${message}`
    window.open(url)
    
  }

  return (
    <Container
      sx={{
        width: '100%',
        height: 'auto',
        objectFit: 'cover',
        borderRadius: '0.5rem',
        paddingBottom: '2rem',
        backgroundColor: '#ffffff',
      }}
    >
      <IconButton component={Link} to="/eventos">
        <ArrowCircleLeftIcon
          color="9d9d9d"
          sx={{ fontSize: 50 }}
        ></ArrowCircleLeftIcon>
      </IconButton>
      <CardMedia
        component="img"
        sx={{
          width: '100%',
          height: 'auto',
          objectFit: 'cover',
          borderRadius: '0.5rem',
          marginBottom: '1rem',
        }}
        image={event.lugar.imagenPrincipal}
        alt="Live from space album cover"
      />

      <Grid
        container
        spacing={2}
        justifyContent="center"
        alignContent="center"
        sx={{
          marginBottom: '1rem',
          padding: '1rem',
          width: '100%',
          textAlign: 'center',
        }}
      >
        <Grid item>
          <IconButton
            onClick={() => handleSectionClick('evento')}
            sx={{
              transition: 'transform 0.2s',
              '&:hover': { transform: 'scale(1.1)' },
            }}
          >
            <EventNote />
          </IconButton>
        </Grid>
        <Grid item>
          <IconButton
            onClick={() => handleSectionClick('lugar')}
            sx={{
              transition: 'transform 0.2s',
              '&:hover': { transform: 'scale(1.1)' },
            }}
          >
            <LocationOn />
          </IconButton>
        </Grid>
        <Grid item>
          <IconButton
            onClick={() => handleSectionClick('servicios')}
            sx={{
              transition: 'transform 0.2s',
              '&:hover': { transform: 'scale(1.1)' },
            }}
          >
            <AccountBalance />
          </IconButton>
        </Grid>
        <Grid item>
          <IconButton
            onClick={() => handleSectionClick('qr')}
            sx={{
              transition: 'transform 0.2s',
              '&:hover': { transform: 'scale(1.1)' },
            }}
          >
            <ShareIcon />
          </IconButton>
        </Grid>
      </Grid>
      {section === 'evento' && (
        <Container
          sx={{
            backgroundColor: '#DFDFDF',
            padding: '1rem',
            borderRadius: '0.5rem',
            marginBottom: '1rem',
            border: '1px solid #000000',
          }}
        >
          <Typography
            variant="h5"
            sx={{ color: '#000006', marginBottom: '0.5rem' }}
          >
            {event.nombreDelEvento}
          </Typography>
          <Typography variant="body1" sx={{ color: '#000006' }}>
            Inicio: {format(new Date(event.fechaEventoIni), 'dd/MM/yyyy')}
          </Typography>
          <Typography variant="body1" sx={{ color: '#000006' }}>
            Fin: {format(new Date(event.fechaEventoFin), 'dd/MM/yyyy')}
          </Typography>
          <Typography variant="body1" sx={{ color: '#000006' }}>
            Lugar: {event.lugar.nombreDeInstalacion}
          </Typography>
        </Container>
      )}
      {section === 'lugar' && (
        <Container
          sx={{
            fontWeight: 'bold',
            backgroundColor: '#DFDFDF',
            padding: '1rem',
            borderRadius: '0.5rem',
            marginBottom: '1rem',
            border: '1px solid #000000',
          }}
        >
          <Typography
            variant="h5"
            sx={{ color: '#000006', marginBottom: '0.5rem' }}
          >
            Lugar: {event.lugar.nombreDeInstalacion}
          </Typography>
          <Typography variant="body1" sx={{ color: '#000006' }}>
            Capacidad: {event.lugar.capacidadInstalacion}
          </Typography>
          <Typography variant="body1" sx={{ color: '#000006 ' }}>
            Costo: {event.lugar.costoDeInstalacion}
          </Typography>
          <Typography variant="body1" sx={{ color: '#000006 ' }}>
            Descripción: {event.lugar.descripcionDeInstalacion}
          </Typography>
          <Typography variant="body1" sx={{ color: '#000006 ' }}>
            Localidad De Instalacion: {event.lugar.localidadDeInstalacion}
          </Typography>
          <Typography variant="body1" sx={{ color: '#000006 ' }}>
            Monto De Reserva: {event.lugar.montoDeReserva}
          </Typography>
        </Container>
      )}
      {section === 'qr' && (
        <Container
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
          }}
        >
          <QRCodeComponent value={qrContent} size={256} />

          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <IconButton>
              <WhatsAppIcon
                onClick={() => handleWhatsAppPress()}
                sx={{ color: '#008000', fontSize: 50, margin: 1 }}
              ></WhatsAppIcon>
            </IconButton>
            <IconButton>
              <TelegramIcon
                onClick={() => handletelegram()}
                sx={{ color: '#0088CC', fontSize: 50, margin: 1 }}
              ></TelegramIcon>
            </IconButton>
          </Box>
        </Container>
      )}

      {section === 'servicios' && services.length > 0 && (
        <Container
          sx={{
            backgroundColor: '#DFDFDF',
            padding: '1rem',
            borderRadius: '0.5rem',
            marginBottom: '1rem',
            border: '1px solid #000000',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1rem',
            }}
          >
            <Typography
              variant="h6"
              sx={{
                color: '#000006',
                fontWeight: 'bold',
                marginRight: '0.5rem',
              }}
            >
              Total Gastado: ${totalGastado}
            </Typography>
            {consultaEstadoPresupuesto(event)}
          </div>

          <Grid
            container
            spacing={3}
            justifyContent="center"
            className="table-container"
          >
            <Grid item xs={3} sm={3} sx={{ borderBottom: '1px solid #ccc' }}>
              <Typography
                variant="subtitle1"
                className="table-header"
                sx={{
                  color: '#000006',
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}
              >
                Categoría
              </Typography>
            </Grid>
            <Grid item xs={3} sm={3} sx={{ borderBottom: '1px solid #ccc' }}>
              <Typography
                variant="subtitle1"
                className="table-header"
                sx={{
                  color: '#000006',
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}
              >
                Nombre
              </Typography>
            </Grid>
            <Grid item xs={3} sm={3} sx={{ borderBottom: '1px solid #ccc' }}>
              <Typography
                variant="subtitle1"
                className="table-header"
                sx={{
                  color: '#000006',
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}
              >
                Monto
              </Typography>
            </Grid>
            <Grid item xs={3} sm={3} sx={{ borderBottom: '1px solid #ccc' }}>
              <Typography
                variant="subtitle1"
                className="table-header"
                sx={{
                  color: '#000006',
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}
              >
                Acciones
              </Typography>
            </Grid>
            {services.map((servicio) => (
              <React.Fragment key={servicio.id}>
                <Grid
                  item
                  xs={3}
                  sm={3}
                  sx={{
                    color: '#000006',
                    borderBottom: '1px solid #ccc',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Typography
                    variant={servicio.categoria.length > 6 ? 'body2' : 'body1'}
                    sx={{
                      textAlign: 'center',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {servicio.categoria}
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={3}
                  sm={3}
                  sx={{
                    color: '#000006',
                    borderBottom: '1px solid #ccc',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Typography variant="body2" sx={{ textAlign: 'center' }}>
                    {servicio.nombreDeServicio}
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={3}
                  sm={3}
                  sx={{
                    color: '#000006',
                    borderBottom: '1px solid #ccc',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Typography variant="body2" sx={{ textAlign: 'center' }}>
                    ${servicio.monto}
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={3}
                  sm={3}
                  sx={{
                    color: '#000006',
                    borderBottom: '1px solid #ccc',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <IconButton onClick={() => handleEditService(servicio)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => deleteService(servicio.id)}>
                    <DeleteIcon />
                  </IconButton>
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
        </Container>
      )}

      {section === 'servicios' && services.length === 0 && (
        <Container
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
          }}
        >
          <Typography variant="body1">No hay servicios adquiridos.</Typography>
        </Container>
      )}
      {section === 'servicios' && (
        <Button
          variant="contained"
          size="large"
          onClick={handleOpenModal}
          sx={{
            width: 250,
            fontSize: 15,
            position: 'fixed',
            bottom: '1rem',
            right: '1rem',
          }}
        >
          Agregar Servicio
        </Button>
      )}
      <BasicModalService
        openModal={openModal}
        cerrarModal={handleCloseModal}
        eventoID={event.id}
        servicio={selectedService}
      />
    </Container>
  )
}

EventDetails.propTypes = {
  event: PropTypes.shape({
    id: PropTypes.number.isRequired,
    nombreDelEvento: PropTypes.string.isRequired,
    fechaEventoIni: PropTypes.string.isRequired,
    fechaEventoFin: PropTypes.string.isRequired,
    lugar: PropTypes.shape({
      nombreDeInstalacion: PropTypes.string.isRequired,
      imagenPrincipal: PropTypes.string.isRequired,
      capacidadInstalacion: PropTypes.number.isRequired,
      costoDeInstalacion: PropTypes.number.isRequired,
      descripcionDeInstalacion: PropTypes.string.isRequired,
      localidadDeInstalacion: PropTypes.string.isRequired,
      montoDeReserva: PropTypes.number.isRequired,
      activo: PropTypes.bool.isRequired,
    }).isRequired,
    serviciosAdquiridos: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        categoria: PropTypes.string.isRequired,
        nombreDeServicio: PropTypes.string.isRequired,
        monto: PropTypes.number.isRequired,
      }).isRequired,
    ).isRequired,
  }).isRequired,
}

export default EventDetails
