export class Instalaciones{
    constructor(){
        this.nombreDeInstalacion = ""
        this.descripcionDeInstalacion = ""
        this.costoDeInstalacion= 0
        this.CapacidadInstalacion= 0
        this.LocalidadDeInstalacion = ""
    }
    static fromJson(InstalacionJson) {
        const result = Object.assign(new Instalacion(), InstalacionJson)
        return result
    }
}