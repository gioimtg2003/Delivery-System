import { IsValidate } from "./IsValidate";

export class Password implements IsValidate<string> {
    private password: string;
    constructor(password: string) {
        this.password = password;
    }
    isValidate(): boolean {
        return /^.{6,}$/.test(this.password);
    }
    getPassword() {
        return this.password;
    }
}
