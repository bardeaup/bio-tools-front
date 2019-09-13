import { CountingEvent } from './couting-event';

/**
 * Object used to save & treat data 
 */
export class ConditionCellCount {

    private conditionId: number;
    private replicatQuantity: number;

    /**
     * Seeded cells for a particular conditionId (list of n CellCount with n = replicatQuantity + period treated)
     */
    private seededCount?: CountingEvent;

    /**
     * Final cell count for a particular conditionId (list of n CellCount with n = replicatQuantity + period treated)
     */
    private finalCount?: CountingEvent;
    
    constructor(conditionId: number, replicatQuantity: number, 
        seededCount?: CountingEvent, finalCount?: CountingEvent){
            this.conditionId = conditionId;
            this.replicatQuantity = replicatQuantity;
            this.seededCount = seededCount;
            this.finalCount = finalCount;
        }
}