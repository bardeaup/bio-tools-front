import { CellCount } from './cell-count';

export class CountingEvent {
    private periodId: number;
    private countList: CellCount[];

    constructor(periodId: number,
        countList: CellCount[]){
            this.periodId = periodId;
            this.countList = countList;
    }
}