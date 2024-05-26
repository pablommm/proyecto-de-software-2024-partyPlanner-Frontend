import { Link } from 'react-router-dom'
import { AppBar, Toolbar, Typography, Container, Grid, Paper, IconButton, Button } from '@mui/material'
import { Add as AddIcon, Logout as LogoutIcon, Home as HomeIcon } from '@mui/icons-material'
import { useState, useEffect } from 'react'
import adminService from '../Services/admin.service'
import UserTable from 'src/components/tablaDeUsuarios' // Ajusta la ruta según sea necesario
import usuarioService from 'src/Services/usuario.service'
import InstallationTable from 'src/components/tablaDeInstalacion' // Ajusta la ruta según sea necesario
import instalacionService from 'src/Services/instalacionService'
import InstalacionModal from 'src/components/InstalacionModal' // Ajusta la ruta según sea necesario
import ModalRegistroUserAdminVIew from 'src/components/ModalRegistroUserAdminVIew'

export default function Dashboard() {
    
    const [installations, setInstallations] = useState([])
    const [numeroTotalDeEventos, setNumeroTotalDeEventos] = useState(0)
    const [eventosActivos, setEventosActivos] = useState(0)
    const [totalUsuarios, setTotalUsuarios] = useState(0)
    const [usuarios, setUsuarios] = useState([])

    const [openModal, setOpenModal] = useState(false)
    const [selectedInstallation, setSelectedInstallation] = useState(null)
    const [openModalUser, setOpenModalUser] = useState(false)

    const handleOpenModal = () => {
        setOpenModal(true)
    }
    
    const handleOpenModalUser = () => {
        setOpenModalUser(true)
    }
    const handleCloseModal = () => {
        setOpenModal(false)
        setSelectedInstallation(null)
    }
    const handleCloseModalUser = () => {
        setOpenModalUser(false)
        fetchUsuarios()
    }
    const handleEditInstallation = (installation) => {
        setSelectedInstallation(installation)
        setOpenModal(true)
    }

    const fetchUsuarios = async () => {
        try {
            const usuariosData = await usuarioService.traerUsuarios()
            setUsuarios(usuariosData)
        } catch (error) {
            console.error("Error al traer los usuarios:", error)
        }
    }

    const fetchInstallations = async () => {
        try {
            const installationsData = await instalacionService.traerinstalaciones()
            setInstallations(installationsData)
        } catch (error) {
            console.error("Error al traer las instalaciones:", error)
        }

    }

    useEffect(() => {
        const fetchTotalEventos = async () => {
            try {
                const totalEventos = await adminService.getTotalEventos()
                setNumeroTotalDeEventos(totalEventos.data)
            } catch (error) {
                console.error("Error al traer los eventos:", error)
            }
        }

        const fetchEventosActivos = async () => {
            try {
                const eventActive = await adminService.getTotalEventosActivos()
                setEventosActivos(eventActive.data)
            } catch (error) {
                console.error("Error al traer los eventos:", error)
            }
        }

        const fetchTotalUsuarios = async () => {
            try {
                const userNumber = await adminService.getTotalUser()
                setTotalUsuarios(userNumber.data)
            } catch (error) {
                console.error("Error al traer los usuarios:", error)
            }
        }
        const fetchInstallations = async () => {
            try {
                const installationsData = await instalacionService.traerinstalaciones()
                setInstallations(installationsData)
            } catch (error) {
                console.error("Error al traer las instalaciones:", error)
            }

        }
        fetchInstallations()
        fetchUsuarios()
        fetchInstallations()
        fetchTotalEventos()
        fetchEventosActivos()
        fetchTotalUsuarios()

    }, [])

    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Panel de Control
                    </Typography>
                    <IconButton color="inherit" component={Link} to="/instalaciones">
                        <HomeIcon />
                    </IconButton>
                    <IconButton color="inherit" component={Link} to="/login">
                        <LogoutIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>

            <Container sx={{ paddingTop: 4, paddingBottom: 4 }}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={4}>
                        <Paper sx={{ padding: 2, backgroundColor: '#66BB6A', color: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <Typography variant="h6">Total de Eventos Creados</Typography>
                            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>{numeroTotalDeEventos}</Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Paper sx={{ padding: 2, backgroundColor: '#FFA726', color: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <Typography variant="h6">Total de Eventos Activos</Typography>
                            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>{eventosActivos}</Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Paper sx={{ padding: 2, backgroundColor: '#1976D2', color: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <Typography variant="h6">Usuarios Registrados</Typography>
                            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>{totalUsuarios}</Typography>
                        </Paper>
                    </Grid>
                </Grid>

                <Typography variant="h4" sx={{ marginTop: 4, color: '#000000' }}>Usuarios</Typography>
                <Paper sx={{ backgroundColor: 'white', padding: 2, marginTop: 2 }}>
                    <UserTable users={usuarios} actualizarLista={fetchUsuarios} />
                </Paper>
                <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={handleOpenModalUser}sx={{ marginTop: 2 }}>
                    Agregar Usuario
                </Button>
                <ModalRegistroUserAdminVIew openModal={openModalUser} cerrarModal={handleCloseModalUser} actualizarUser={fetchUsuarios}
                />
              

                {/* Sección de instalaciones */}
                <Typography variant="h4" sx={{ marginTop: 4 }}>Instalaciones</Typography>

                <Typography variant="h4" sx={{ marginTop: 4, color: '#000000' }}>Instalaciones</Typography>
                <Paper sx={{ backgroundColor: 'white', padding: 2, marginTop: 2 }}>
                    <InstallationTable
                        installations={installations}
                        actualizarInstalacion={fetchInstallations}
                        onEdit={handleEditInstallation}
                    />
                </Paper>
                <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={handleOpenModal} sx={{ marginTop: 2 }}>
                    Agregar Instalación
                </Button>
                <InstalacionModal openModal={openModal} cerrarModal={handleCloseModal} instalacion={selectedInstallation} actualizarInstalacion={fetchInstallations}
                />
            </Container>
        </div>
    )
}

