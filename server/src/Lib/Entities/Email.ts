import { IsValidate } from "./IsValidate";

export class Email implements IsValidate<string> {
    private email: string;
    constructor(email: string) {
        this.email = email;
    }
    isValidate(): boolean {
        return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
            this.email
        );
    }
    getEmail() {
        return this.email;
    }
}
