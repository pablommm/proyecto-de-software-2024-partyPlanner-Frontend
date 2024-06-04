import axios from 'axios'
import { REST_SERVER_URL } from '../Services/configuracion'

class EventoService {
    async crearEvento(nuevoEvento) {
        try {
            console.log(nuevoEvento)
            console.log("llegue al service")
            const crearEvento = await axios.post(`${REST_SERVER_URL}/CrearEventos`, nuevoEvento)
            console.log('Evento creado:', crearEvento.data)
            return crearEvento.data
        } catch (error) {
            console.error('Error creating evento:', error)
            throw error
        }
    }

    async getEventosById(usuarioId) {

        const eventosByid = await axios.get(`${REST_SERVER_URL}/MisEventos/${usuarioId}`)
        console.log('Eventos obtenidos en el service  para el usuario con ID', usuarioId, ':', eventosByid.data)
        return eventosByid

    }

    async editarEvento(eventoModificado) {
        try {
            console.log("llegue al service")
            console.log("Editando evento con ID:")
            const editarEvento = await axios.put(`${REST_SERVER_URL}/EditarEvento/${eventoModificado.id}`, eventoModificado)
            console.log('Evento editado:', editarEvento.data)
            return editarEvento.data
        } catch (error) {
            console.error('Error editing evento:', error)
            throw error
        }
    }


    async traerServiciosAdquiridos(eventoId) {
        const servicios = await axios.get(`${REST_SERVER_URL}/serviciosAdquiridos/${eventoId}`)
        return servicios.data
    }

    async delete(eventoId) {
        const servicios = await axios.delete(`${REST_SERVER_URL}/DeletarEvento/${eventoId}`)
        return servicios.data
    }
}
const eventoService = new EventoService()
export default eventoService
