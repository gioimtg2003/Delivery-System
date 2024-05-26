import { BaseVerify } from "./BaseVerify";

export class VerifyRegister extends BaseVerify {
    private user: string;
    private token: string;
    private id: string;
    constructor(user: string, token: string, id: string) {
        super();
        this.user = user;
        this.token = token;
        this.id = id;
    }
    async verify(): Promise<any> {
        try {
            let verify = await this.axios.post("/verify/customer/register", {
                user: this.user,
                token: this.token,
                id: this.id,
            });
            return new Promise((resolve, reject) => {
                if (verify.data.code === 200) {
                    resolve(verify.data);
                } else {
                    reject(verify.data);
                }
            });
        } catch {
            return Promise.reject();
        }
    }
}
