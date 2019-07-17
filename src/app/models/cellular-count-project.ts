import { Condition } from './condition';

export class CellularCountProject {
    projectName: string;
    conditions: Condition[];
    
    constructor(projectName: string, conditions: Condition[]) {
        this.projectName = projectName;
        this.conditions = conditions;
    }
}
