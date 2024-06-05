import { Expired } from "../../Lib/Constants/Expired";
import { IDataLogin } from "../../Lib/Types/IdataLogin";
import { HashPassword } from "../Hash";
import { JsonWebToken } from "../JsonWebToken";

export class BaseLogin {
    protected _jwtService: JsonWebToken;
    protected _hashPassword: HashPassword;
    constructor() {
        this._jwtService = new JsonWebToken();
        this._hashPassword = new HashPassword();
    }
    protected async handleToken(user: any): Promise<IDataLogin> {
        this._jwtService.setPayload({
            id: user.id,
            email: user.Email,
            role: user.Role,
        });

        let access_token = await this._jwtService.signAccessToken();
        await this._jwtService.setPayload(
            {
                id: user.id,
                email: user.Email,
                role: user.Role,
            },
            true
        );
        let refresh_token = await this._jwtService.signRefreshToken();
        return {
            access_token: access_token,
            refresh_token: refresh_token,
            exp: Math.floor(Date.now() + Expired.ACCESS_TOKEN * 1000 - 10000),
        };
    }
}
