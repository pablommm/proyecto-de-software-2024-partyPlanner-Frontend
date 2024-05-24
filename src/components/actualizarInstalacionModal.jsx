// import { useState, useEffect } from 'react'
// import instalacionService from 'src/Services/instalaciones.service'
// import { Modal, Box, Typography, TextField, Button } from '@mui/material'
// import PropTypes from 'prop-types'
// import { Instalaciones } from 'src/Dominio/Instalacion'







// const actualizarInstalacionModal = ({ handleClose, instalacionId, actualizarInstalacion }) => {
//     const [nombre, setNombre] = useState('')
//     const [localidad, setLocalidad] = useState('')
//     const [costoInstalacion, setCostoInstalacion] = useState(0)
//     const [capacidadInstalacion, setCapacidadInstalacion] = useState(0)
//     const [descripcionInstalacion, setDescripcionInstalacion] = useState('')

//     useEffect(() => {
//         const fetchInstalacion = async () => {
//             try {
//                 const instalacion = await instalacionService.traerInstalacionPorId(instalacionId)
//                 setNombre(instalacion.nombreDeInstalacion)
//                 setLocalidad(instalacion.localidadDeInstalacion)
//                 setCostoInstalacion(instalacion.costoDeInstalacion)
//                 setCapacidadInstalacion(instalacion.capacidadInstalacion)
//                 setDescripcionInstalacion(instalacion.descripcionDeInstalacion)
//             } catch (error) {
//                 console.error('Error al traer la instalación:', error)
//             }
//         }
//         fetchInstalacion()
//     }, [instalacionId])

//     const handleSubmit = async (e) => {
//         e.preventDefault()
//         try {
//             const instalacion = {
//                 id: instalacionId,
//                 nombreDeInstalacion: nombre,
//                 localidadDeInstalacion: localidad,
//                 costoDeInstalacion: costoInstalacion,
//                 capacidadInstalacion: capacidadInstalacion,
//                 descripcionDeInstalacion: descripcionInstalacion
//             }
//             await instalacionService.actualizarInstalacion(instalacion)
//             actualizarInstalacion()
//             handleClose()
//         } catch (error) {
//             console.error('Error al actualizar la instalación:', error)
//         }
//     }

//     return (
//         <Modal
//             open={openModal}
//             onClose={cerrarModal}
//             aria-labelledby="modal-modal-title"
//             aria-describedby="modal-modal-description"
//         >
//             <Box sx={style}>
//                 <Typography variant="h6" align="center" gutterBottom>
//                     Solicitar Instalación
//                 </Typography>
//                 <form onSubmit={handleSubmit}>
//                     <div style={{ display: "flex", flexDirection: "column", color: "black" }}>
//                         <TextField
//                             id="standard-basic"
//                             name="nombre"
//                             label="Nombre"
//                             variant="standard"
//                             value={nombre}
//                             onChange={(e) => setNombre(e.target.value)}
//                             style={{ marginBottom: "1rem" }}
//                         />
//                         <TextField
//                             id="standard-basic"
//                             name="localidad"
//                             label="Localidad"
//                             variant="standard"
//                             value={localidad}
//                             onChange={(e) => setLocalidad(e.target.value)}
//                             style={{ marginBottom: "1rem" }}
//                         />
//                         <TextField
//                             id="standard-basic"
//                             name="costo"
//                             label="Costo"
//                             variant="standard"
//                             value={costoInstalacion}
//                             onChange={(e) => setCostoInstalacion(e.target.value)}
//                             style={{ marginBottom: "1rem" }}
//                         />
//                         <TextField
//                             id="standard-basic"
//                             name="capacidad"
//                             label="Capacidad"
//                             variant="standard"
//                             value={capacidadInstalacion}
//                             onChange={(e) => setCapacidadInstalacion(e.target.value)}
//                             style={{ marginBottom: "1rem" }}
//                         />
//                         <TextField
//                             id="standard-basic"
//                             name="descripcion"
//                             label="Descripción"
//                             variant="standard"
//                             value={descripcionInstalacion}
//                             onChange={(e) => setDescripcionInstalacion(e.target.value)}
//                             style={{ marginBottom: "1rem" }}
//                         />
//                         <TextField
//                             id="standard-basic"
//                             name="imagen"
//                             label="Imagen"
//                             variant="standard" 
//                             value={imagenPrincipal}
//                             onChange={(e) => setImagenPrincipal(e.target.value)}
//                             style={{ marginBottom: "1rem" }}
//                         /> 

//                         {/* Agrega más campos si es necesario para la instalación */}
//                         <div style={{ display: "flex", justifyContent: "space-between" }}>
//                             <Button variant="text" onClick={cerrarModal}>Cancelar</Button>
//                             <Button type="submit" variant="text" onClick={actualizarInstalacionModal}>actualizar</Button>
//                         </div>
//                     </div>
//                 </form>
//             </Box>
//         </Modal>
//     )
// }


// InstalacionModal.propTypes = {
//     openModal: PropTypes.bool,
//     cerrarModal: PropTypes.func,
// }
// export default actualizarInstalacionModal