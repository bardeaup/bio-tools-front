export class User {
    id: number;
    username: string;
    password: string;
    passwordConfirm?: string;
    newUser?: boolean;
    authenticated: boolean = false; 

    constructor(username: string,
        password: string,
        passwordConfirm?: string, newUser?: boolean){
            this.username = username;
            this.password = password;
            this.passwordConfirm = passwordConfirm;
            this.newUser = newUser;
        }

}
