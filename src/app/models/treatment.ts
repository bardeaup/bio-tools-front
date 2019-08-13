export class Treatment {
    name: string;
    concentrationValue: number;
    concentrationUnitId: string;
    concentrationUnitLabel: string;

    constructor(name: string, concentrationValue: number, concentrationUnitId: string){
        this.name = name;
        this.concentrationValue = concentrationValue;
        this.concentrationUnitId = concentrationUnitId;
    }
}
