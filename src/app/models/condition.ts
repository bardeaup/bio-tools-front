import {Treatment} from './treatment';
import {CellCount} from './cell-count';


export class Condition {
  id: number;
  cellLine: string;
  isAdherentCell: boolean;
  actualPeriod?: number;
  initialPopulationDoubling?: number;
  treatmentList?: Treatment[];
  cellCountList?: CellCount[];


  constructor(cellLine: string, isAdherentCell: boolean, actualPeriod: number,
              treatmentList?: Treatment[], initialPopulationDoubling?: number, cellCountList?: CellCount[]) {
    this.cellLine = cellLine;
    this.isAdherentCell = isAdherentCell;
    this.actualPeriod = actualPeriod;
    this.treatmentList = treatmentList;
    this.initialPopulationDoubling = initialPopulationDoubling;
    this.cellCountList = cellCountList;
  }
}
