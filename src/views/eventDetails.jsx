import { CardMedia, Container, Grid, IconButton, Typography, Box, Button, } from '@mui/material'
import { EventNote, AccountBalance, LocationOn } from '@mui/icons-material'
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
import MensajeConfirmacion from 'src/components/MensajeCofirmacion'
//import { Linking } from 'react-native'


const EventDetails = () => {
  const location = useLocation()
  var event = location.state.event
  var [evento, setEvento] = useState(event)
  const [selectedService, setSelectedService] = useState(null)
  const [openModal, setOpenModal] = useState(false)
  const [section, setSection] = useState(null)
  const [services, setServices] = useState([])
  const qrContent = `Evento: ${event.nombreDelEvento}\nLugar: ${event.lugar.nombreDeInstalacion}\nFecha: ${format(new Date(event.fechaEventoIni), 'dd/MM/yyyy')} - ${format(new Date(event.fechaEventoFin), 'dd/MM/yyyy')}`
  const [totalGastado, setTotalGastado] = useState(0)
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const [showConfirmDialogEvent, setShowConfirmDialogEvent] = useState(false)
  const [serviceToDelete, setServiceToDelete] = useState(null)
  const [estadoPresupuesto, setEstadoPresupuesto] = useState(0)
  const [porcentajeGastado, setPorcentajeGastado] = useState(0)
  const [textoAviso, setTextoAviso] = useState('estado presupuesto')
  const [eventToDelete, seteventToDelete] = useState(null)

  useEffect(() => {
    const calculoPorcentaje = () => {

      const porcentaje = totalGastado * 100 / event.presupuesto
      console.log("el estado del porcentaje es:", porcentaje)

      setPorcentajeGastado(porcentaje)
      actualizarEstadoPresupuesto(porcentaje)
      console.log("el estado del presupuesto es:", estadoPresupuesto)
    }
    calculoPorcentaje()
  }, [totalGastado, event.presupuesto,])




  function actualizarEstadoPresupuesto(porcentaje) {
    console.log("entre a la funcion actualizarEstadoPresupuesto()")
    if (porcentaje <= 60) {
      setEstadoPresupuesto(1)
      setTextoAviso("Estás dentro de tu presupuesto")
    } else if (porcentaje <= 95) {
      setEstadoPresupuesto(2)
      setTextoAviso("Estás al límite de tu presupuesto")
    } else {
      setEstadoPresupuesto(3)
      setTextoAviso("Has superado tu presupuesto")
    }
  }

  function consultaEstadoPresupuesto() {
    if (estadoPresupuesto === 1) {
      return (
        <>
          <CheckCircleTwoToneIcon sx={{ color: '#00913f', fontSize: 40 }} />
          <Typography
            variant="h6"
            sx={{ color: '#000006', fontWeight: 'bold', marginLeft: '0.5rem' }}
          >
            {textoAviso}
          </Typography>
        </>
      )
    } else if (estadoPresupuesto === 2) {
      return (
        <>
          <WarningTwoToneIcon sx={{ color: '#FFD300', fontSize: 40 }} />
          <Typography
            variant="h6"
            sx={{ color: '#000006', fontWeight: 'bold', marginLeft: '0.5rem' }}
          >
            {textoAviso}
          </Typography>
        </>
      )
    } else if (estadoPresupuesto === 3) {
      return (
        <>
          <ReportTwoToneIcon sx={{ color: '#FF0000', fontSize: 40 }} />
          <Typography
            variant="h6"
            sx={{ color: '#000006', fontWeight: 'bold', marginLeft: '0.5rem' }}
          >
            {textoAviso}
          </Typography>
        </>
      )
    }
    return null
  }


  const traerServiciosAdquiridos = async () => {
    try {
      const response = await eventoService.traerServiciosAdquiridos(event.id)
      setServices(response)
    } catch (error) {
      console.error('Error al traer los servicios adquiridos:', error)
    }
  }
  const handleDeleteConfirmed = async () => {
    if (serviceToDelete) {
      try {
        console.log('Eliminar servicio con ID:', serviceToDelete)
        await servicioService.deleteServicio(serviceToDelete)
        traerServiciosAdquiridos()
      } catch (error) {
        console.error('Error al eliminar servicio:', error)
      } finally {
        setShowConfirmDialog(false)
        setServiceToDelete(null)
      }
    }
  }
  const handleDeleteConfirmedEvent = async () => {

    if (eventToDelete) {
      try {
        console.log('Eliminar evento con ID:', eventToDelete)
        await eventoService.delete(eventToDelete)
      } catch (error) {
        console.error('Error al eliminar evento:', error)
      } finally {
        setShowConfirmDialogEvent(false)
        seteventToDelete(null)
      }
    }
    actualizarEvento()
  }

  useEffect(() => {





  }, [event.id])

  const handleCloseModal = () => {
    setOpenModal(false)
    setSelectedService(null)
    traerServiciosAdquiridos()
    consultaEstadoPresupuesto(event)
    actualizarEstadoPresupuesto()

  }

  const handleSectionClick = (sectionName) => {
    setSection(sectionName === section ? null : sectionName)
    traerServiciosAdquiridos()
  }

  const handleOpenModal = () => {
    setOpenModal(true)
  }

  const handleEditService = (service) => {
    setSelectedService(service)
    setOpenModal(true)
    console.log("el estado del presupuesto es", estadoPresupuesto)
    consultaEstadoPresupuesto(event)
    calculoPorcentaje()
    actualizarEstadoPresupuesto()
  }

  useEffect(() => {
    const totalServicios = services.reduce(
      (total, servicio) => total + servicio.monto,
      0,
    )
    const totalInstalacion = event.lugar.costoDeInstalacion - event.lugar.montoDeReserva
    setTotalGastado(totalServicios + totalInstalacion)
  }, [services, event.lugar.costoDeInstalacion, event.lugar.montoDeReserva])



  // Función para abrir el modal de confirmación
  const confirmDelete = (serviceId) => {
    setServiceToDelete(serviceId)
    setShowConfirmDialog(true)
    consultaEstadoPresupuesto(event)
    calculoPorcentaje()
  }
  const confirmDeleteEvent = () => {
    seteventToDelete(event.id)
    setShowConfirmDialogEvent(true)

  }
  const handleCloseConfirmDialogEvent = () => {
    setShowConfirmDialogEvent(false)
    seteventToDelete(null)
    actualizarEvento()
  }
  // Función para cerrar el modal de confirmación
  const handleCloseConfirmDialog = () => {
    setShowConfirmDialog(false)
    setServiceToDelete(null)
    actualizarEvento()
  }

  const actualizarEvento = async () => {
    try {
      const eventoActualizado = await eventoService.getUnEvento(event.id)
      setEvento(eventoActualizado)
      console.log("el estado del evento es ", eventoActualizado.activo)
      console.log("deposito el evento", eventoActualizado)

    } catch (error) {
      console.error('Error al traer los servicios adquiridos:', error)
    }
  }




  function mensajeRedesSociales() {
    // en esta parte llenamos los datos que vamos a necesitar para el menasaje nomnbre, hora, lugar etc
    const dateObject = new Date(event.fechaEventoIni)
    const formattedDate = dateObject.toLocaleDateString('es-AR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })
    const hours = dateObject.getHours().toString().padStart(2, '0')
    // en esta parte cambiamos el mensaje segun la necesidad
    if (evento.activo == false) {
      const message = `Decidimos cancelar el evento ${event.nombreDelEvento} que era en el dia ${formattedDate}`

      return message
    } if (evento.activo == true) {
      const message = `te invitamos a 
        ${event.nombreDelEvento} la fecha ${formattedDate} a las ${hours} en la localidad de ${event.lugar.localidadDeInstalacion}`

      return message

    } else {
      return "no se envio nada"
    }

  }

  const handleWhatsAppPress = () => {

    const url = `https://wa.me/?text=${mensajeRedesSociales()}`
    window.open(url)
  }

  const handletelegram = () => {

    const url = `https://t.me/share/url?url= &text=${mensajeRedesSociales()}`
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
      {section === 'evento' &&
        <Container
          sx={{
            backgroundColor: '#DFDFDF',
            padding: '1rem',
            borderRadius: '0.5rem',
            marginBottom: '3rem',
            border: '1px solid #000000',
          }}
        >
          <Typography
            variant="h5"
            sx={{
              color: '#000006', marginBottom: '0.5rem', fontWeight: 'bold',
            }}
          >
            {event.nombreDelEvento}
          </Typography>
          <Typography variant="body1" sx={{ color: '#000006' }}>
            <strong>Inicio:</strong>{format(new Date(event.fechaEventoIni), 'dd/MM/yyyy')}
          </Typography>
          <Typography variant="body1" sx={{ color: '#000006' }}>
            <strong>Fin:</strong> {format(new Date(event.fechaEventoFin), 'dd/MM/yyyy')}
          </Typography>
          <Typography variant="body1" sx={{ color: '#000006' }}>
            <strong>Lugar:</strong>  {event.lugar.nombreDeInstalacion}
          </Typography>
        </Container>
      }
      {section === 'lugar' &&
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
            sx={{
              color: '#000006', marginBottom: '0.5rem', fontWeight: 'bold',
            }}
          >
            <strong>Lugar:</strong> {event.lugar.nombreDeInstalacion}
          </Typography>
          <Typography variant="body1" sx={{ color: '#000006' }}>
            <strong>Lugar:</strong>  {event.lugar.capacidadInstalacion}
          </Typography>
          <Typography variant="body1" sx={{ color: '#000006 ' }}>
            <strong>Costo:</strong> {event.lugar.costoDeInstalacion}
          </Typography>
          <Typography variant="body1" sx={{ color: '#000006 ' }}>
            <strong>Descripción:</strong>  {event.lugar.descripcionDeInstalacion}
          </Typography>
          <Typography variant="body1" sx={{ color: '#000006 ' }}>
            <strong>Localidad De Instalacion:</strong> {event.lugar.localidadDeInstalacion}
          </Typography>
          <Typography variant="body1" sx={{ color: '#000006 ' }}>
            <strong>Monto De Reserva:</strong> {event.lugar.montoDeReserva}
          </Typography>
          <Typography variant="body1" sx={{ color: '#000006 ' }}>
            <strong>Correo:</strong> {event.lugar.mail}
          </Typography>
          <Typography variant="body1" sx={{ color: '#000006 ' }}>
            <strong>Numero de contacto:</strong>  {event.lugar.numeroDeTelefono}
          </Typography>
        </Container>
      }
      {section === 'qr' &&
        <Container
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
          }}
        >
          <QRCodeComponent value={qrContent} size={256} />

          <Box sx={{ padding: 3 }}>
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
      }

      {section === 'servicios' && services.length > 0 &&
        <Container
          sx={{
            backgroundColor: '#DFDFDF',
            padding: '1rem',
            borderRadius: '0.5rem',
            marginBottom: '3rem',
            border: '1px solid #000000',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1rem',
              color: 'black'
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
            {services.map((servicio) =>
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
                  <IconButton onClick={() => confirmDelete(servicio.id)}>
                    <DeleteIcon />
                  </IconButton>
                </Grid>
              </React.Fragment>
            )}

          </Grid>
          <MensajeConfirmacion
            open={showConfirmDialog}
            onClose={handleCloseConfirmDialog}
            onConfirm={handleDeleteConfirmed}
            title={'Confirmar Eliminación'}
            message={'¿Estás seguro que deseas eliminar este servicio?'}
          />
        </Container>

      }

      {section === 'servicios' && services.length === 0 &&
        <Container
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
          }}
        >
          <Typography style={{ marginTop: '2rem', color: 'black' }}>
            No hay servicios adquiridos

          </Typography>        </Container>
      }
      {section === 'servicios' &&
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'fixed',
            bottom: '1rem',
            width: '100%',
          }}
        >
          <Button
            variant="contained"
            size="large"
            onClick={handleOpenModal}
            sx={{
              width: 250,
              fontSize: 15,
            }}
          >
            Agregar Servicio
          </Button>
        </div>
      }
      <BasicModalService
        openModal={openModal}
        cerrarModal={handleCloseModal}
        eventoID={event.id}
        servicio={selectedService}
      />
      {section === 'evento' &&
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'fixed',
            bottom: '1rem',
            width: '100%',
          }}
        >
          <Button
            variant="contained"
            size="large"
            style={{ backgroundColor: '#b71c1c', color: 'white' }}
            onClick={() => confirmDeleteEvent(event.id)}
            sx={{
              fontSize: 15,
              whiteSpace: 'nowrap',
              width: 200,
            }}
          >
            Cancelar evento
          </Button>
        </div>
      }
      <MensajeConfirmacion
        open={showConfirmDialogEvent}
        onClose={handleCloseConfirmDialogEvent}
        onConfirm={handleDeleteConfirmedEvent}
        title={'El evento sera desactivado'}
        message={'¿Estás seguro que deseas cancelar este evento?'}

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
    presupuesto: PropTypes.number.isRequired,
    activo: PropTypes.bool.isRequired,
    lugar: PropTypes.shape({
      nombreDeInstalacion: PropTypes.string.isRequired,
      imagenPrincipal: PropTypes.string.isRequired,
      capacidadInstalacion: PropTypes.number.isRequired,
      costoDeInstalacion: PropTypes.number.isRequired,
      descripcionDeInstalacion: PropTypes.string.isRequired,
      localidadDeInstalacion: PropTypes.string.isRequired,
      montoDeReserva: PropTypes.number.isRequired,
      activo: PropTypes.bool.isRequired,
      numeroDeTelefono: PropTypes.number.isRequired,
      mail: PropTypes.string.isRequired,


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
