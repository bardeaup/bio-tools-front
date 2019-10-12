import {Condition} from './condition';
import {ProliferationExperimentDetail} from './proliferation-experiment-detail';

export class CellularCountProject {
    id: number;
    projectName: string;
    detail: ProliferationExperimentDetail;
    conditionList: Condition[];

    constructor(projectName: string, detail: ProliferationExperimentDetail, conditions: Condition[]) {
        this.projectName = projectName;
        this.detail = detail;
        this.conditionList = conditions;
    }
}
