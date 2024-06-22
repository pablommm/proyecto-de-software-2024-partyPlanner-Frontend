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
        this.montoDeReserva = 0
        this.calle = ""
        this.altura = 0
        this.provincia = ""
        this.numeroDeTelefono = 0
        this.mail = ""
        this.baños = ""
        this.terraza = ""
        this.jardin = ""
        this.estacionamiento = ""
        this.alojamiento = ""
        this.cocina = ""

    }
    static fromJson(InstalacionJson) {
        const result = Object.assign(new Instalacion(), InstalacionJson)
        return result
    }
}