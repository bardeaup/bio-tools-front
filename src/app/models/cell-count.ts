
export class CellCount {
    quantity: number;
    replicatId: number;
    date: Date;
    populationDoubling?: number;
    doublingTime?: number;
    finalPopulationDoubling?: number;

    constructor(q: number,replicatId: number, date: Date, pd?: number, dt?: number, finalpd?: number){
        this.quantity = q;
        this.replicatId = replicatId;
        this.date = date;
        this.populationDoubling = pd;
        this.doublingTime = dt;
        this.finalPopulationDoubling = finalpd;
    }
}
