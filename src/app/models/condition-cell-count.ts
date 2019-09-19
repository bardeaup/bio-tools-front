import { CellCount } from './cell-count';

/**
 * Object used to save & treat data 
 */
export class ConditionCellCount {

    conditionId: number;
    
    replicatQuantity: number;

    /**
     * Seeded cells for a particular conditionId (list of n CellCount with n = replicatQuantity + period treated)
     */
    seededCounts?: CellCount[];

    /**
     * Final cell count for a particular conditionId (list of n CellCount with n = replicatQuantity + period treated)
     */
    finalCounts?: CellCount[];
    
    constructor(conditionId: number, replicatQuantity: number, 
        seededCount?: CellCount[], finalCount?: CellCount[]){
            this.conditionId = conditionId;
            this.replicatQuantity = replicatQuantity;
            this.seededCounts = seededCount;
            this.finalCounts = finalCount;
        }
}