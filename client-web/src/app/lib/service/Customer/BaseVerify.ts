import { AxiosInstance } from "axios";
import { Axios } from "../../util/axios";

export abstract class BaseVerify {
    protected axios: AxiosInstance;
    constructor() {
        this.axios = new Axios().getInstance();
    }
    abstract verify(): Promise<any>;
    protected setAxios(axios: AxiosInstance) {
        this.axios = axios;
    }
    protected getAxios() {
        return this.axios;
    }
}
