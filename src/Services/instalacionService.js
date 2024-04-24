import axios from 'axios'
import { REST_SERVER_URL } from '../Services/configuracion'

  class InstalacionService  {
    async traerInstalaciones() {
      
      const Instalaciones = await axios.get(`${REST_SERVER_URL}/Instalaciones`)
      console.log(Instalaciones)
      return Instalaciones
  
    }
  }
  
  const instalacionService = new InstalacionService()
  export default instalacionService
  

  