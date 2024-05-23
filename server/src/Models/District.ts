import { Schema, model } from "mongoose";
import { IDistrict } from "../Lib/Types/District";

let DistrictSchema = new Schema<IDistrict>({
    province_id: {
        type: String,
        required: true,
    },
    district_id: {
        type: String,
        required: true,
    },
    district_name: {
        type: String,
        required: true,
    },
    district_type: {
        type: String,
        required: true,
    },
    lat: {
        type: Number,
    },
    lng: {
        type: Number,
    },
});

DistrictSchema.index({ province_id: 1 }, { unique: true });
export default model<IDistrict>("districts", DistrictSchema);
