import axios from 'axios'
import { REST_SERVER_URL } from '../Services/configuracion'

  class UsuarioService  {
    async validarUsuario(usuario,contrasenia) {
      console.log("llegue al service")
      const usuarioId = await axios.post(`${REST_SERVER_URL}/usuarioLogin`, { contrasenia: contrasenia, usuario: usuario})
      console.log(usuarioId.data)
      return usuarioId.data
  
    }
  }
  
  const usuarioService = new UsuarioService()
  export default usuarioService
  

  