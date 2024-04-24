export class Instalaciones {
    constructor() {
        this.nombreDeInstalacion = ""
        this.descripcionDeInstalacion = ""
        this.costoDeInstalacion = 0
        this.capacidadInstalacion = 0
        this.localidadDeInstalacion = ""
        this.imagenPrincipal = ""
    }
    static fromJson(InstalacionJson) {
        const result = Object.assign(new Instalacion(), InstalacionJson)
        return result
    }
}