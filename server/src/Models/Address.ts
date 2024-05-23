import { Schema, model } from "mongoose";
import { IAddress } from "../Lib/Types/IAddress";

let AddressSchema = new Schema<IAddress>({
    id: {
        type: Number,
        required: true,
        unique: true,
    },
    alias: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    pid: {
        type: Number,
    },
    region: {
        type: Number,
    },
    lat: {
        type: Number,
    },
    lng: {
        type: Number,
    },
});

export default model<IAddress>("addresses", AddressSchema);
