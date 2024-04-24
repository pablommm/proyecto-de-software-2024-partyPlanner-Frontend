import axios from 'axios'
import { REST_SERVER_URL } from '../Services/configuracion'

class InstalacionService {
  async traerInstalaciones() {

    const InstalacionesActivas = await axios.get(`${REST_SERVER_URL}/InstalacionesActivas`)
    console.log(InstalacionesActivas)
    return InstalacionesActivas

  }
}

const instalacionService = new InstalacionService()
export default instalacionService


