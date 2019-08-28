export class ErrorCustom {
    msg: string;
    severity: string;

    constructor(msg: string, severity: string){
        this.msg = msg;
        this.severity = severity;
    }
}
