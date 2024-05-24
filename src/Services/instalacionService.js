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

async actualizarInstalacion(instalacion) {
    const instalacionActualizada = await axios.put(`${REST_SERVER_URL}/EditarInstalacion/${instalacion.id}`, instalacion)
    return instalacionActualizada.data

}
}

const instalacionService = new InstalacionService()
export default instalacionService



