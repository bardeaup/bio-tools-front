export class ProliferationExperimentDetail {

    cultureMedia: string;
    growthFactor: string;
    antibiotic: string;
    dioxygenPercentage: number;
    temperature: number;
    conditionReplicat: number;

    constructor(cultureMedia: string,
        growthFactor: string,
        antibiotic: string,
        dioxygenPercentage: number,
        temperature: number,
        conditionReplicat: number) {
            
        this.cultureMedia = cultureMedia;
        this.growthFactor = growthFactor;
        this.antibiotic = antibiotic;
        this.dioxygenPercentage = dioxygenPercentage;
        this.temperature = temperature;
        this.conditionReplicat = conditionReplicat;
    }

}
