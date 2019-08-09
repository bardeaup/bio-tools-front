
export class CellCount {
    initialQuantity: number;
    beginDate: Date;
    finalQuantity: number;
    endDate: Date;

    populationDoubling?: number;
    doublingTime?: number;
    finalPopulationDoubling?: number;

    constructor(iq: number, beginDate: Date, fq: number, endDate: Date, pd?: number, dt?: number, finalpd?: number){
        this.initialQuantity = iq;
        this.beginDate = beginDate;
        this.finalQuantity = fq;
        this.endDate = endDate;
        this.populationDoubling = pd;
        this.doublingTime = dt;
        this.finalPopulationDoubling = finalpd;
    }
}
