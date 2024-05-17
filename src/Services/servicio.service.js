import axios from 'axios'
import { REST_SERVER_URL } from '../Services/configuracion'

class ServicioService {

    async crearServicio(nuevoServicio) {
        console.log("llegue al service")
        const response = await axios.post(`${REST_SERVER_URL}/CrearServicio`, nuevoServicio)
        return response.data

    }



    async traerServicios() {
        const servicios = await axios.get(`${REST_SERVER_URL}/servicios`)
        return servicios.data
    }

    async traerServicioPorId(id) {
        const servicio = await axios.get(`${REST_SERVER_URL}/serviciosById/${id}`)
        return servicio.data
    }
    async editarServicio(servicioModificado) {
        console.log("Editando servicio con ID:", servicioModificado.id)
        const response = await axios.put(`${REST_SERVER_URL}/EditarServicio/${servicioModificado.id}`, servicioModificado)
        return response.data
    }



}
const servicioService = new ServicioService()

export default servicioService