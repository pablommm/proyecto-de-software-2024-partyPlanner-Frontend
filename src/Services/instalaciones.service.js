import axios from 'axios'
import { REST_SERVER_URL } from '../Services/configuracion'


class InstalacionService {

    async crearInstalacion(nuevaInstalacion) {
        try {
            const crearInstalacion = await axios.post(`${REST_SERVER_URL}/CrearInstalacion`, nuevaInstalacion)
            console.log('Instalacion creada:', crearInstalacion.data)
            return crearInstalacion.data
        } catch (error) {
            console.error('Error creating instalacion:', error)
            throw error
        }
    }
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

    async busquedaDeInstalaciones(data) {
        const instalaciones = await axios.get(`${REST_SERVER_URL}/buscar/${data}`)
        console.log(instalaciones)
        return instalaciones
    }

    
}
const instalacionService = new InstalacionService()
export default instalacionService