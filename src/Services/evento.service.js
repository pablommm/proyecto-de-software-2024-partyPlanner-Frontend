import axios from 'axios'
import { REST_SERVER_URL } from '../Services/configuracion'
class EventoService {

    async createEvento(nuevoEvento) {
        try {
            await axios.post(`${REST_SERVER_URL}/CrearEventos`, nuevoEvento)
            return response.data
        } catch (error) {
            console.error('Error al crear el evento:', error)
            throw error
        }
    }

    async getEventos() {
        const response = await axios.get(`${REST_SERVER_URL}/eventos`)
        return response.data
    }

    async getEventoById(id) {
        const response = await axios.get(`${REST_SERVER_URL}/eventosById/${id}`)
        return response.data
    }

}   
export default EventoService


