import { ICallback } from "../../Lib/Types/Callback";
import { BaseAddress } from "./BaseAddress";

export class Address extends BaseAddress {
    constructor() {
        super();
    }

    async getAddress(
        pid: number | null,
        callback: ICallback<any>
    ): Promise<void> {
        try {
            const address = await this.addressSchema.find({ pid: pid });
            console.log(address.length);
            callback(null, address);
        } catch (error) {
            callback(error, null);
        }
    }
    public async getProvinces(callback: ICallback<any>): Promise<void> {
        try {
            const provinces = await this.provinceSchema.find();
            callback(null, provinces);
        } catch (error) {
            callback(error, null);
        }
    }
    async getDistricts(callback: ICallback<any>): Promise<void> {
        try {
            const provinces = await this.districtSchema.find();
            callback(null, provinces);
        } catch (error) {
            callback(error, null);
        }
    }

    async getWards(callback: ICallback<any>): Promise<void> {
        try {
            const provinces = await this.wardSChema.find();
            callback(null, provinces);
        } catch (error) {
            callback(error, null);
        }
    }

    async getDistrictsByProvinceId(
        data: any,
        callback: ICallback<any>
    ): Promise<void> {
        let { province_id } = data;
        try {
            const districts = await this.districtSchema.find({
                province_id: province_id,
            });
            callback(null, districts);
        } catch (error) {
            callback(error, null);
        }
    }

    async getWardsByDistrictId(
        data: any,
        callback: ICallback<any>
    ): Promise<void> {
        let { district_id } = data;

        try {
            const wards = await this.wardSChema.find({
                district_id: district_id,
            });
            callback(null, wards);
        } catch (error) {
            callback(error, null);
        }
    }
}
