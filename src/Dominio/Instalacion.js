export class Usuario{
    constructor(){
        this.nombreDeInstalacion = ""
        this.descripcionDeInstalacion = ""
        this.costoDeInstalacion=0
        this.CapacidadInstalacion=0
        this.LocalidadDeInstalacion = ""
    }
    static fromJson(UsuarioJSON) {
        const result = Object.assign(new Usuario(), UsuarioJSON)
        return result
    }
}