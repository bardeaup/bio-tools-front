import { Treatment } from './treatment';


export class Condition {
    id: number;
    cellLine: string;
    isAdherentCell: boolean;
    actualPeriod?: number
    initialPopulationDoubling?: number;
    treatmentList?: Treatment[];


    constructor(cellLine: string, isAdherentCell: boolean, actualPeriod: number,
        treatmentList?: Treatment[], initialPopulationDoubling?: number) {
        this.cellLine = cellLine;
        this.isAdherentCell = isAdherentCell;
        this.actualPeriod = actualPeriod;
        this.treatmentList = treatmentList;
        this.initialPopulationDoubling = initialPopulationDoubling;
    }
}