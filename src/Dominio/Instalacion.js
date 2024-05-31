export class Instalaciones {
    constructor() {
        this.id = 0
        this.nombreDeInstalacion = ""
        this.descripcionDeInstalacion = ""
        this.costoDeInstalacion = 0
        this.capacidadInstalacion = 0
        this.localidadDeInstalacion = ""
        this.imagenPrincipal = ""
        this.fechasReservadas = []
    }
    static fromJson(InstalacionJson) {
        const result = Object.assign(new Instalacion(), InstalacionJson)
        return result
    }
}