export class Usuario{
    constructor(){
        this.nombreYApellido = ""
        this.username = ""
        this.contrasenia = ""
        this.eventosRealizados = []
        this.rol = ""
        this.saldo= 0
    }
    static fromJson(UsuarioJSON) {
        const result = Object.assign(new Usuario(), UsuarioJSON)
        return result
    }
}