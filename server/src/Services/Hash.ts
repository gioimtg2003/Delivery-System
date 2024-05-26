import { genSaltSync, hashSync } from "bcryptjs";
export class HashPassword {
    private saltRounds: number;
    constructor() {
        this.saltRounds = 10;
    }
    public hashPassword(password: string): string {
        return hashSync(password, genSaltSync(this.saltRounds));
    }
    public comparePassword(password: string, hash: string): boolean {
        return this.safeStringCompare(
            hashSync(password, hash.substring(0, 29)),
            hash
        );
    }
    private safeStringCompare(known: string, unknown: string): boolean {
        let right = 0,
            wrong = 0;
        for (let i = 0, k = known.length; i < k; ++i) {
            if (known.charCodeAt(i) === unknown.charCodeAt(i)) ++right;
            else ++wrong;
        }
        if (right < 0) return false;
        return wrong === 0;
    }
}
