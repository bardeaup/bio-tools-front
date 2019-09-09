
export class CellCount {
    conditionId: number;
    quantity: number;
    date: Date;
    populationDoubling?: number;
    doublingTime?: number;
    finalPopulationDoubling?: number;

    constructor(conditionId: number, q: number, date: Date, pd?: number, dt?: number, finalpd?: number){
        this.conditionId = conditionId;
        this.quantity = q;
        this.date = date;
        this.populationDoubling = pd;
        this.doublingTime = dt;
        this.finalPopulationDoubling = finalpd;
    }
}
