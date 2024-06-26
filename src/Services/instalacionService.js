import axios from 'axios'
import { REST_SERVER_URL } from '../Services/configuracion'

class InstalacionService {

    async traerInstalaciones() {
        const InstalacionesActivas = await axios.get(`${REST_SERVER_URL}/InstalacionesActivas`)
        console.log(InstalacionesActivas)
        return InstalacionesActivas

    }
    async traerinstalaciones() {
        const instalaciones = await axios.get(`${REST_SERVER_URL}/Instalaciones`)
        return instalaciones.data
    }

    async instalacionesActivar(id) {
        const instalaciones = await axios.put(`${REST_SERVER_URL}/activarInstalacion/${id}`)
        return instalaciones.data
    }

    async instalacionesDesactivar(id) {
        try {
            const instalaciones = await axios.delete(`${REST_SERVER_URL}/deleteInstalacion/${id}`)
            return instalaciones.data
        } catch (error) {
            console.error('Error al desactivar la instalacion:', error)
            throw error
        }
    }

    async traerInstalacionPorId(id) {
        const instalacion = await axios.get(`${REST_SERVER_URL}/Instalaciones/${id}`)
        return instalacion.data
    }

    async busquedaDeInstalaciones(data) {
        const instalaciones = await axios.get(`${REST_SERVER_URL}/buscar/${data}`)
        console.log(instalaciones)
        return instalaciones
    }

    async actualizarInstalacion(instalacion) {
        const instalacionActualizada = await axios.put(`${REST_SERVER_URL}/EditarInstalacion/${instalacion.id}`, instalacion)
        return instalacionActualizada.data

    }
    async crearMantenimiento(mantenimiento) {
        const response = await axios.post('/CrearMantenimiento', mantenimiento)
        console.log('Mantenimiento creado:', response.data)
    }

}

const instalacionService = new InstalacionService()
export default instalacionService



