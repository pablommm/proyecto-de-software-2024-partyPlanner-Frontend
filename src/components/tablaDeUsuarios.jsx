import PropTypes from 'prop-types'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Checkbox, Paper } from '@mui/material'
import usuarioService from 'src/Services/usuario.service'
import MensajeConfirmacion from './MensajeCofirmacion'
import { useState } from 'react'

const UserTable = ({ users, actualizarLista }) => {
    const [showConfirmDialog, setShowConfirmDialog] = useState(false)
    const [userIdToActivate, setUserIdToActivate] = useState(null)
    const [userIdToDeactivate, setUserIdToDeactivate] = useState(null)

    const handleCheckboxChange = async (event, userId) => {
        if (event.target.checked) {
            setUserIdToActivate(userId)
            setShowConfirmDialog(true)
        } else {
            setUserIdToDeactivate(userId)
            setShowConfirmDialog(true)
        }
    }

    const handleUserActivation = async (userId) => {
        try {
            await usuarioService.activarUsuario(userId)
            actualizarLista()
        } catch (error) {
            console.error('Error al activar el usuario:', error)
        }
    }

    const handleUserDeactivation = async (userId) => {
        try {
            await usuarioService.desactivarUsuario(userId)
            actualizarLista()
        } catch (error) {
            console.error('Error al desactivar el usuario:', error)
        }
    }

    const handleCloseConfirmDialog = () => {
        setShowConfirmDialog(false)
        setUserIdToActivate(null)
        setUserIdToDeactivate(null)
    }

    const handleConfirmDialogAction = async () => {
        setShowConfirmDialog(false)
        if (userIdToActivate) {
            await handleUserActivation(userIdToActivate)
        } else if (userIdToDeactivate) {
            await handleUserDeactivation(userIdToDeactivate)
        }
    }

    return (
        <TableContainer component={Paper} sx={{ maxHeight: 400 }}>
            <Table stickyHeader>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Nombre y Apellido</TableCell>
                        <TableCell>Eventos Creados</TableCell>
                        <TableCell>Estado</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.map((user) =>
                        <TableRow key={user.id}>
                            <TableCell>{user.id}</TableCell>
                            <TableCell>{user.nombreYApellido}</TableCell>
                            <TableCell>{user.eventos.length}</TableCell>
                            <TableCell>
                                <Checkbox
                                    checked={user.activo}
                                    onChange={(event) => handleCheckboxChange(event, user.id)}
                                />
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <MensajeConfirmacion
                open={showConfirmDialog}
                onClose={handleCloseConfirmDialog}
                onConfirm={handleConfirmDialogAction}
                title={userIdToActivate ? 'Confirmar Activación' : 'Confirmar Desactivación'}
                message={userIdToActivate ? '¿Estás seguro que deseas activar este usuario?' : '¿Estás seguro que deseas desactivar este usuario?'}
            />
        </TableContainer>
    )
}

UserTable.propTypes = {
    users: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            nombreYApellido: PropTypes.string.isRequired,
            eventos: PropTypes.array.isRequired,
            activo: PropTypes.bool.isRequired,
        })
    ).isRequired,
    actualizarLista: PropTypes.func.isRequired,
}

export default UserTable
