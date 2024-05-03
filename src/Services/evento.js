import axios from 'axios'
import { REST_SERVER_URL } from '../Services/configuracion'
class EventoService {

    async createEvento(nuevoEvento) {
        try {
            await axios.post(`${REST_SERVER_URL}/CrearEventos`, nuevoEvento)
            return response.data
        } catch (error) {
            console.error('Error creating evento:', error)
            throw error
        }
    }

}

export default EventoService
