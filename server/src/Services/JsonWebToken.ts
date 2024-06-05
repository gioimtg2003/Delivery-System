import { sign, Secret } from "jsonwebtoken";
import { Expired } from "../Lib/Constants/Expired";

export class JsonWebToken {
    private secret: Secret;
    private payload: any;
    constructor() {
        this.secret = process.env.SECRET_KEY || "secret";
    }

    public setPayload(user: any, refreshToken: boolean = false): any {
        this.payload = {
            id: user.id,
            email: user.email,
            role: user.role,
            refresh_token: refreshToken,
        };
    }
    public async signAccessToken(): Promise<string> {
        let token = sign(this.getPayload(), this.secret, {
            algorithm: "HS256",
            expiresIn: Expired.ACCESS_TOKEN,
        });
        return token;
    }

    public async signRefreshToken(): Promise<string> {
        let token = sign(this.getPayload(), this.secret, {
            algorithm: "HS256",
            expiresIn: Expired.REFRESH_TOKEN,
        });
        return token;
    }

    public signOtherToken<T>(payload: T, time: number): string {
        let token = sign(payload as any, this.secret, {
            algorithm: "HS256",
            expiresIn: time,
        });
        return token;
    }

    public getPayload(): any {
        return this.payload;
    }
}
