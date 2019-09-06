import { CellCount } from './cell-count';
import { Treatment } from './treatment';


export class Condition {
    id: number;
    cellLine: string;
    isAdherentCell: boolean;
    initialPopulationDoubling?: number;
    cellCountList?: CellCount[];
    treatmentList?: Treatment[];


    constructor(cellLine: string, isAdherentCell: boolean, cellCountList?: CellCount[],
        treatmentList?: Treatment[], initialPopulationDoubling?: number) {
        this.cellLine = cellLine;
        this.isAdherentCell = isAdherentCell;
        this.cellCountList = cellCountList;
        this.treatmentList = treatmentList;
        this.initialPopulationDoubling = initialPopulationDoubling;
    }
}