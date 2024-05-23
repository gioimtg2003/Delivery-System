import { ICallback } from "../../Lib/Types/Callback";
import DistrictSchema from "../../Models/District";
import ProvinceSchema from "../../Models/Province";
import WardSchema from "../../Models/Ward";
import AddressSchema from "../../Models/Address";
export abstract class BaseAddress {
    protected provinceSchema = ProvinceSchema;
    protected districtSchema = DistrictSchema;
    protected wardSChema = WardSchema;
    protected addressSchema = AddressSchema;
    abstract getAddress(pid: number, callback: ICallback<any>): Promise<void>;
    abstract getProvinces(callback: ICallback<any>): Promise<void>;
    abstract getDistricts(callback: ICallback<any>): Promise<void>;
    abstract getWards(callback: ICallback<any>): Promise<void>;
    abstract getDistrictsByProvinceId(
        data: any,
        callback: ICallback<any>
    ): Promise<void>;
    abstract getWardsByDistrictId(
        data: any,
        callback: ICallback<any>
    ): Promise<void>;
}
