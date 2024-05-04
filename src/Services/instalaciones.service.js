import axios from 'axios'
import { REST_SERVER_URL } from '../Services/configuracion'

class InstalacionService {

    async traerinstalaciones() {
        const instalaciones = await axios.get(`${REST_SERVER_URL}/Instalaciones`)
        return instalaciones.data
    }

    async traerInstalacionesActivas() {
        const instalacionesActivas = await axios.get(`${REST_SERVER_URL}/InstalacionesActivas`)
        return instalacionesActivas.data
    }

    async traerInstalacionPorId(id) {
        const instalacion = await axios.get(`${REST_SERVER_URL}/Instalaciones/${id}`)
        return instalacion.data
    }
}
export default InstalacionService