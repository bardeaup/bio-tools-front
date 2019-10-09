export class CellCount {
  quantity: number;
  replicatId: number;
  date: Date;
  period: number;
  populationDoubling?: number;
  doublingTime?: number;
  finalPopulationDoubling?: number;

  constructor(q: number, replicatId: number, date: Date, period: number, pd?: number, dt?: number, finalpd?: number) {
    this.quantity = q;
    this.replicatId = replicatId;
    this.date = date;
    this.period = period;
    this.populationDoubling = pd;
    this.doublingTime = dt;
    this.finalPopulationDoubling = finalpd;
  }
}
