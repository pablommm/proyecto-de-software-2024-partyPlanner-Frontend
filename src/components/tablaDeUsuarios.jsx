// En el componente UserTable
import PropTypes from 'prop-types'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Checkbox, Paper } from '@mui/material'
import usuarioService from 'src/Services/usuario.service'

const UserTable = ({ users, actualizarLista }) => {
    const handleCheckboxChange = async (event, userId) => {
        try {
            await usuarioService.desactivarUsuario(userId)
            actualizarLista()
        } catch (error) {
            console.error('Error al desactivar el usuario:', error)
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
    // Prop para la función de actualización de la lista
    actualizarLista: PropTypes.func.isRequired,
}

export default UserTable
