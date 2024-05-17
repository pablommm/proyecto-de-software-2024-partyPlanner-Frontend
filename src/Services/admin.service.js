import axios from 'axios'
import { REST_SERVER_URL } from '../Services/configuracion'

class AdminService {

 async getTotalUser() {

        const usuariosTotales = await axios.get(`${REST_SERVER_URL}/TotalDeUSuariosRegistrados`)
        console.log('Eventos obtenidos en el service  para el usuario con ID', usuariosTotales)
        return usuariosTotales
    }

    async getTotalEventos() {

        const eventos= await axios.get(`${REST_SERVER_URL}/totalEvents`)
        console.log('Eventos obtenidos en el service  para el usuario con ID:', eventos.data)
        return eventos
    }

    async getTotalEventosActivos() {

        const eventosActivos = await axios.get(`${REST_SERVER_URL}/activeEvents`)
        console.log('Eventos obtenidos en el service  para el usuario ', eventosActivos)
        return eventosActivos
    }

}

const adminService = new AdminService()
export default adminService