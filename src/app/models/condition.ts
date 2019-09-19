import { CellCount } from './cell-count';
import { Treatment } from './treatment';


export class Condition {
    id: number;
    cellLine: string;
    isAdherentCell: boolean;
    firstSeeding?: boolean;
    lastPeriod?: number
    initialPopulationDoubling?: number;
    cellCountList?: CellCount[];
    treatmentList?: Treatment[];


    constructor(cellLine: string, isAdherentCell: boolean, firstSeeding: boolean,lastPeriod: number, cellCountList?: CellCount[],
        treatmentList?: Treatment[], initialPopulationDoubling?: number) {
        this.cellLine = cellLine;
        this.isAdherentCell = isAdherentCell;
        this.firstSeeding = firstSeeding;
        this.lastPeriod = lastPeriod;
        this.cellCountList = cellCountList;
        this.treatmentList = treatmentList;
        this.initialPopulationDoubling = initialPopulationDoubling;
    }
}