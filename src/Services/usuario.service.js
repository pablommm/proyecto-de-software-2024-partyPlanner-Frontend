
import axios from 'axios'
import { REST_SERVER_URL } from '../Services/configuracion'

class UsuarioService {

    async crearUsuario(nuevoUsuario) {
        try {
            console.log("estoy pasando el usuario:", nuevoUsuario)
            const usuario = await axios.post(`${REST_SERVER_URL}/CrearUsuario`, nuevoUsuario)
            console.log("en el service recibo", usuario.data)
            return usuario.data
        }
        catch (error) {
            console.error('Error al crear el usuario:', error)
            throw error
        }
    }

    async traerUsuarios() {
        const usuarios = await axios.get(`${REST_SERVER_URL}/Usuarios`)
        return usuarios.data
    }

    async traerUsuarioPorId(id) {
        const usuario = await axios.get(`${REST_SERVER_URL}/usuariosById/${id}`)
        return usuario.data
    }

    async actualizarUsuario(usuarioModificado) {
        try {
            await axios.post(`${REST_SERVER_URL}/UsuarioUpdate/${usuarioModificado.id}`, usuarioModificado)
            return response.data
        }
        catch (error) {
            console.error('Error al actualizar usuario:', error)
            throw error
        }

    }
    async desactivarUsuario(id) {
        try {
            const response = await axios.delete(`${REST_SERVER_URL}/deleUsuario/${id}`)
            return response.data
        } catch (error) {
            console.error('Error al desactivar el usuario:', error)
            throw error
        }
    }
    async activarUsuario(id) {
        try {
            const response = await axios.put(`${REST_SERVER_URL}/activarUser/${id}`)
            return response.data
        } catch (error) {
            console.error('Error al activar el usuario:', error)
            throw error
        }
    }



}
const usuarioService = new UsuarioService()
export default usuarioService




// val usuario1 = Usuario(
//     nombreYApellido = "Juan perez",
//     username = "Jperez",
//     contrasenia = "1234",
//     rol = Rol.ADMINISTRADOR,
//     eventos = mutableListOf(bodaMYB)
// )
// val admin = Usuario(
//     nombreYApellido = "admin",
//     username = "admin",
//     contrasenia = "admin",
//     rol = Rol.ADMINISTRADOR,

// )
// val test = Usuario(
//     nombreYApellido = "admin",
//     username = "admin",
//     contrasenia = "admin",
//     rol = Rol.ADMINISTRADOR,

//     )
