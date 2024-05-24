import PropTypes from 'prop-types'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Checkbox, Paper, IconButton } from '@mui/material'
import { Edit as EditIcon } from '@mui/icons-material'
import instalacionService from 'src/Services/instalacionService'


const InstallationTable = ({ installations, actualizarInstalacion, onEdit }) => {

    const handleCheckboxChange = async (event, instalacionId) => {
        try {
            if (event.target.checked) {
                await instalacionService.activarInstalacion(instalacionId)
            } else {
                await instalacionService.desactivarInstalacion(instalacionId)
            }
            actualizarInstalacion()
        } catch (error) {
            console.error('Error al actualizar el estado de la instalación:', error)
        }
    }

    return (
        <TableContainer component={Paper} sx={{ maxHeight: 400 }}>
            <Table stickyHeader>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Nombre</TableCell>
                        <TableCell>Localidad</TableCell>
                        <TableCell>Capacidad</TableCell>
                        <TableCell>Costo</TableCell>
                        <TableCell>Estado</TableCell>
                        <TableCell>Editar</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {installations.map((installation) =>
                        <TableRow key={installation.id}>
                            <TableCell>{installation.id}</TableCell>
                            <TableCell>{installation.nombreDeInstalacion}</TableCell>
                            <TableCell>{installation.localidadDeInstalacion}</TableCell>
                            <TableCell>{installation.capacidadInstalacion}</TableCell>
                            <TableCell>{installation.costoDeInstalacion}</TableCell>
                            <TableCell>
                                <Checkbox
                                    checked={installation.activo}
                                    onChange={(event) => handleCheckboxChange(event, installation.id)}
                                />
                            </TableCell>
                            <TableCell>
                                <TableCell>{installation.Editar}</TableCell>
                                <IconButton onClick={() => onEdit(installation)}>
                                    <EditIcon />
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
            nombreDeInstalacion: PropTypes.string.isRequired,
            localidadDeInstalacion: PropTypes.string.isRequired,
            capacidadInstalacion: PropTypes.number.isRequired,
            costoDeInstalacion: PropTypes.number.isRequired,
            activo: PropTypes.bool.isRequired,
        })
    ).isRequired,
    actualizarInstalacion: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,

}

export default InstallationTable