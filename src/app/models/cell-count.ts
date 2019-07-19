
export class CellCount {
    initialQuantity: number;
    beginDay: Date;
    finalQuantity: number;
    endDay: Date;

    populationDoubling?: number;
    doublingTime?: number;
    finalPopulationDoubling?: number;

    constructor(iq: number, beginDay: Date, fq: number, endDay: Date, pd?: number, dt?: number, finalpd?: number){
        this.initialQuantity = iq;
        this.beginDay = beginDay;
        this.finalQuantity = fq;
        this.endDay = endDay;
        this.populationDoubling = pd;
        this.doublingTime = dt;
        this.finalPopulationDoubling = finalpd;
    }
}
