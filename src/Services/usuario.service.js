
import axios from 'axios'
import { REST_SERVER_URL } from '../Services/configuracion'

class UsuarioService {
    
        async crearUsuario(nuevoUsuario) {
            try {
                console.log("estoy pasando el usuario:",nuevoUsuario)
                const usuario = await axios.post(`${REST_SERVER_URL}/CrearUsuario`, nuevoUsuario)
                console.log("en el service recibo",usuario.data)
                return usuario.data
            }
            catch (error) {
                console.error('Error al crear el usuario:', error)
                throw error
            }            
        }
        
        async traerUsuarios() {
            const usuarios = await axios.get(`${REST_SERVER_URL}/usuarios`)
            return usuarios.data
        }
    
        async traerUsuarioPorId(id) {
            const usuario = await axios.get(`${REST_SERVER_URL}/usuariosById/${id}`)
            return usuario.data
        }

        async actualizarUsuario(usuarioModificado) {
            try {
                await axios.post(`${REST_SERVER_URL}/UsuarioUpdate`, usuarioModificado)
                return response.data
            }
            catch (error) {
                console.error('Error al actualizar usuario:', error)
                throw error
            }
            
        }
    
        
}
const usuarioService = new UsuarioService()
export default usuarioService