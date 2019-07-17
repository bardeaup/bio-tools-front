export class Treatment {
    name: string;
    concentrationValue: number;
    concentrationUnit: string;

    constructor(name: string, concentrationValue: number, concentrationUnit: string){
        this.name = name;
        this.concentrationValue = concentrationValue;
        this.concentrationUnit = concentrationUnit;
    }
}