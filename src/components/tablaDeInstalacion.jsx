import PropTypes from 'prop-types'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Checkbox, Paper, IconButton } from '@mui/material'
import { Edit as EditIcon } from '@mui/icons-material'
import instalacionService from 'src/Services/instalacionService'
import MensajeConfirmacion from './MensajeCofirmacion'
import { useState } from 'react'


const InstallationTable = ({ installations, actualizarInstalacion, onEdit }) => {
    const [showConfirmDialog, setShowConfirmDialog] = useState(false)
    const [instaIdToActivate, setInstaIdToActivate] = useState(null)
    const [instaIdToDeactivate, setInstaIdToDeactivate] = useState(null)

    const handleCheckboxChange = async (event, instalacionId) => {
        try {
            if (event.target.checked) {
                setInstaIdToActivate(instalacionId)
                setShowConfirmDialog(true)
            } else {
                setInstaIdToDeactivate(instalacionId)
                setShowConfirmDialog(true)

            }
        } catch (error) {
            console.error('Error al actualizar el estado de la instalación:', error)
        }

    }

    const handleInstaActivation = async (instalacionId) => {
        try {
            await instalacionService.instalacionesActivar(instalacionId)
            actualizarInstalacion()
        } catch (error) {
            console.error('Error al activar instalacion:', error)
        }
    }

    const handleInstaDeactivation = async (instalacionId) => {
        try {
            await instalacionService.instalacionesDesactivar(instalacionId)
            actualizarInstalacion()
        } catch (error) {
            console.error('Error al desactivar el usuario:', error)
        }
    }
    const handleCloseConfirmDialog = () => {
        setShowConfirmDialog(false)
        setInstaIdToActivate(null)
        setInstaIdToDeactivate(null)
    }

    const handleConfirmDialogAction = async () => {
        setShowConfirmDialog(false)
        if (instaIdToActivate) {
            await handleInstaActivation(instaIdToActivate)
        } else if (instaIdToDeactivate) {
            await handleInstaDeactivation(instaIdToDeactivate)
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
            <MensajeConfirmacion
                open={showConfirmDialog}
                onClose={handleCloseConfirmDialog}
                onConfirm={handleConfirmDialogAction}
                title={instaIdToActivate ? 'Confirmar Activación' : 'Confirmar Desactivación'}
                message={instaIdToActivate ? '¿Estás seguro que deseas activar esta instalación?' : '¿Estás seguro que deseas desactivar esta instalación?'}
            />
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