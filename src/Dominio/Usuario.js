export class Usuario {
    constructor() {
        this.nombreYApellido = ""
        this.username = ""
        this.contrasenia = ""
        this.eventosRealizados = []
        this.rol = ""
        this.saldo = 0
        this.activo = ""
    }
    static fromJson(UsuarioJSON) {
        const result = Object.assign(new Usuario(), UsuarioJSON)
        return result
    }
}

export class UsuarioRegistro {
    constructor() {
        this.nombre = ""
        this.apellido = ""
        this.usuario = ""
        this.pwd = ""
    }
    static fromJson(UsuarioJSON) {
        const result = Object.assign(new UsuarioRegistro(), UsuarioJSON)
        return result
    }
}

export class UsuarioActualizado {
    constructor() {
        this.nombreYApellido = ""
        this.username = ""
        this.contrasenia = ""
        this.saldo = 0

    }
    static fromJson(UsuarioJSON) {
        const result = Object.assign(new UsuarioActualizado(), UsuarioJSON)
        return result
    }
}
