export class Servicio {
    constructor() {
        this.nombreDeServicio = ""
        this.descripcion = ""
        this.categoria = ""
        this.monto = 0
        this.eventoID = 0
    }

    static fromJson(servicioJson) {
        const servicio = new Servicio()
        Object.assign(servicio, servicioJson)
        return servicio
    }

    toJSON() {
        return {
            ...this,
        }
    }
}
