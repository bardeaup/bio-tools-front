import { CellCount } from './cell-count';
import { Treatment } from './treatment';


export class Condition {
    cellLine: string;
    initialPopulationDoubling?: number;
    cellCountList: CellCount[];
    treatmentList?: Treatment[];


    constructor(cellLine: string, cellCountList: CellCount[],
        treatmentList?: Treatment[], initialPopulationDoubling?: number) {
        this.cellLine = cellLine;
        this.cellCountList = cellCountList;
        this.treatmentList = treatmentList;
        this.initialPopulationDoubling = initialPopulationDoubling;
    }
}