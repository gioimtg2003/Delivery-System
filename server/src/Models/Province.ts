import { Schema, model } from "mongoose";
import type { IProvince } from "../Lib/Types/Province";

let ProvinceSchema = new Schema<IProvince>({
    province_id: {
        type: String,
        required: true,
    },
    province_name: {
        type: String,
        required: true,
    },
    province_type: {
        type: String,
        required: true,
    },
    lat: {
        type: Number,
        required: true,
    },
    lng: {
        type: Number,
        required: true,
    },
});

ProvinceSchema.index({ province_id: 1 }, { unique: true });
export default model<IProvince>("provinces", ProvinceSchema);
