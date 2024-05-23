import { Schema, model } from "mongoose";
import { IWard } from "../Lib/Types/Ward";

let WardSchema = new Schema<IWard>({
    ward_id: {
        type: String,
        required: true,
    },
    district_id: {
        type: String,
        required: true,
    },
    ward_name: {
        type: String,
        required: true,
    },
    ward_type: {
        type: String,
        required: true,
    },
});

WardSchema.index({ district_id: 1 }, { unique: true });
export default model<IWard>("wards", WardSchema);
