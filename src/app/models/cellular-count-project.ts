import { Condition } from './condition';

export class CellularCountProject {
    projectName: string;
    conditionList: Condition[];
    
    constructor(projectName: string, conditions: Condition[]) {
        this.projectName = projectName;
        this.conditionList = conditions;
    }
}
