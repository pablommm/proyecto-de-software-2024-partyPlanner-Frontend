export class Evento {
    constructor() {
        this.nombreDelEvento = ""
        this.lugar = {}
        this.fechaEventoIni = ""
        this.fechaEventoFin = ""
        this.serviciosAdquiridos = []
        this.owner = 0
        this.presupuesto = 0
        this.estadoPresupuesto = 1
        this.dias=0
    }

    static fromJson(eventoJson) {
        const evento = new Evento()
        Object.assign(evento, eventoJson)
        return evento
    }

    toJSON() {
        return {
            ...this,
        }
    }
}
