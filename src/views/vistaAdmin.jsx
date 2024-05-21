import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { AppBar, Toolbar, Typography, Container, Grid, Paper, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, IconButton, Button } from '@mui/material'
import { Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon, Logout as LogoutIcon, Home as HomeIcon } from '@mui/icons-material'
import { useState, useEffect } from 'react'
import adminService from '../Services/admin.service'
import UserTable from 'src/components/tablaDeUsuarios'
import usuarioService from 'src/Services/usuario.service'

function InstallationTable({ installations }) {
    return (
        <TableContainer component={Paper} sx={{ maxHeight: 400 }}>
            <Table stickyHeader>
                <TableHead>
                    <TableRow>
                        <TableCell>Nombre</TableCell>
                        <TableCell>Ubicación</TableCell>
                        <TableCell>Capacidad</TableCell>
                        <TableCell>Monto</TableCell>
                        <TableCell>Descripción</TableCell>
                        <TableCell>Acciones</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {installations.map((installation) =>
                        <TableRow key={installation.id}>
                            <TableCell>{installation.name}</TableCell>
                            <TableCell>{installation.location}</TableCell>
                            <TableCell>{installation.capacity}</TableCell>
                            <TableCell>{installation.amount}</TableCell>
                            <TableCell>{installation.description}</TableCell>
                            <TableCell>
                                <IconButton>
                                    <EditIcon />
                                </IconButton>
                                <IconButton>
                                    <DeleteIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

InstallationTable.propTypes = {
    installations: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            location: PropTypes.string.isRequired,
            capacity: PropTypes.number.isRequired,
            amount: PropTypes.number.isRequired,
            description: PropTypes.string.isRequired,
        })
    ).isRequired,
}

export default function Dashboard() {
    const installations = [
        {
            id: 1,
            name: 'Instalación 1',
            location: 'Ubicación 1',
            capacity: 100,
            amount: 1000,
            description: 'Descripción de la instalación 1',
        },
    ]

    const [numeroTotalDeEventos, setNumeroTotalDeEventos] = useState(0)
    const [eventosActivos, setEventosActivos] = useState(0)
    const [totalUsuarios, setTotalUsuarios] = useState(0)
    const [usuarios, setUsuarios] = useState([])

    useEffect(() => {
        const fetchUsuarios = async () => {
            try {
                const usuariosData = await usuarioService.traerUsuarios()
                setUsuarios(usuariosData)
            } catch (error) {
                console.error("Error al traer los usuarios:", error)
            }
        }
        fetchUsuarios()
    }, [])

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
                    <UserTable users={usuarios} />
                </Paper>
                <Button variant="contained" color="primary" startIcon={<AddIcon />} sx={{ marginTop: 2 }}>
                    Agregar Usuario
                </Button>

                <Typography variant="h4" sx={{ marginTop: 4, color: '#000000' }}>Instalaciones</Typography>
                <Paper sx={{ backgroundColor: 'white', padding: 2, marginTop: 2 }}>
                    <InstallationTable installations={installations} />
                </Paper>
                <Button variant="contained" color="primary" startIcon={<AddIcon />} sx={{ marginTop: 2 }}>
                    Agregar Instalación
                </Button>
            </Container>
        </div>
    )
}