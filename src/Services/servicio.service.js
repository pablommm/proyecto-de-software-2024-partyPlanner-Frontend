import axios from 'axios'
import { REST_SERVER_URL } from '../Services/configuracion'

class ServicioService {

    async crearServicio(nuevoServicio) {
        try {
            await axios.post(`${REST_SERVER_URL}/CrearServicio`, nuevoServicio)
            return response.data
        }
        catch (error) {
            console.error('Error al crear el servicio:', error)
            throw error
        }
        
    }

    async traerServicios() {
        const servicios = await axios.get(`${REST_SERVER_URL}/servicios`)
        return servicios.data
    }

    async traerServicioPorId(id) {
        const servicio = await axios.get(`${REST_SERVER_URL}/serviciosById/${id}`)
        return servicio.data
    }

    
}
export default ServicioService