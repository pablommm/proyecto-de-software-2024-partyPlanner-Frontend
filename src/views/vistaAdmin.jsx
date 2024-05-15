import PropTypes from 'prop-types'
import { Link } from 'react-router-dom' // Importa Link desde react-router-dom
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import TableContainer from '@mui/material/TableContainer'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import IconButton from '@mui/material/IconButton'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'
import LogoutIcon from '@mui/icons-material/Logout' // Importa el icono de Logout
import { Button } from '@mui/material'
import InstalacionModal from 'src/components/InstalacionModal'
import { useState } from 'react'

// Función para generar datos de ejemplo
function generateData(rows) {
    const data = []
    for (let i = 0; i < rows; i++) {
        data.push({
            id: i + 1,
            name: `User ${i + 1}`,
            eventsCreated: Math.floor(Math.random() * 100),
        })
    }
    return data
}

function UserTable({ users }) {
    const limitedUsers = users.slice(0, 10)

    return (
        <TableContainer component={Paper} sx={{ maxHeight: 400 }}>
            <Table stickyHeader>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Nombre</TableCell>
                        <TableCell>Eventos Creados</TableCell>
                        
                    </TableRow>
                </TableHead>
                <TableBody>
                    {limitedUsers.map((user) =>
                        <TableRow key={user.id}>
                            <TableCell>{user.id}</TableCell>
                            <TableCell>{user.name}</TableCell>
                            <TableCell>{user.eventsCreated}</TableCell>
                            <TableCell>
                                
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

UserTable.propTypes = {
    users: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            eventsCreated: PropTypes.number.isRequired,
        })
    ).isRequired,
}

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
    const users = generateData(20) // Cambia 20 al número deseado
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

    const [openModal, setOpenModal] = useState(false)

    const handleOpenModal = () => {
        setOpenModal(true)
    }

    const handleCloseModal = () => {
        setOpenModal(false)
    }

    return (
        <div>
            {/* Barra de navegación */}
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Panel de Control
                    </Typography>
                    {/* Icono de cerrar sesión */}
                    <IconButton color="inherit" component={Link} to="/login">
                        <LogoutIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>

            {/* Contenido del panel */}
            <Container sx={{ paddingTop: 4, paddingBottom: 4 }}> {/* Agrega margen inferior para separar del borde inferior */}
                {/* Sección de resumen */}
                <Grid container spacing={3}>
                    <Grid item xs={12} md={4}>
                        <Paper sx={{ padding: 2, backgroundColor: '#66BB6A', color: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <Typography variant="h6">Total de Eventos Creados</Typography>
                            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>157</Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Paper sx={{ padding: 2, backgroundColor: '#FFA726', color: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <Typography variant="h6">Total de Eventos Activos</Typography>
                            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>30</Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Paper sx={{ padding: 2, backgroundColor: '#1976D2', color: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <Typography variant="h6">Usuarios Registrados</Typography>
                            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>459</Typography>
                        </Paper>
                    </Grid>
                </Grid>

                {/* Sección de usuarios */}
                <Typography variant="h4" sx={{ marginTop: 4 }}>Usuarios</Typography>
                <Paper sx={{ backgroundColor: 'white', padding: 2, marginTop: 2 }}>
                    <UserTable users={users} />
                </Paper>
                {/* Botón para agregar un nuevo usuario */}
                <Button variant="contained" color="primary" startIcon={<AddIcon />} sx={{ marginTop: 2 }}>
                    Agregar Usuario
                </Button>

                {/* Sección de instalaciones */}
                <Typography variant="h4" sx={{ marginTop: 4 }}>Instalaciones</Typography>

                <Paper sx={{ backgroundColor: 'white', padding: 2, marginTop: 2 }}>
                    <InstallationTable installations={installations} />
                </Paper>
                <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={handleOpenModal} sx={{ marginTop: 2 }}>
                    Agregar Instalación
                </Button>
                <InstalacionModal openModal={openModal} cerrarModal={handleCloseModal} />
            </Container>
        </div>
    )
}
