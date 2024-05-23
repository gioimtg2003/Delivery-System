import { IsValidate } from "./IsValidate";

export class Phone implements IsValidate<string> {
    private phone: string;
    constructor(phone: string) {
        this.phone = phone;
    }
    isValidate(): boolean {
        return /^\d{10}$/.test(this.phone);
    }
    getPhone() {
        return this.phone;
    }
}
