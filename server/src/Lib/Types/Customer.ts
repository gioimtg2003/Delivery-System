import { ObjectId } from "mongoose";

interface VerifyAccount {
    code: number;
    uri: string;
    expired: number;
}

interface Identity {
    identityCard: string;
    imgIdentityCardFront: string;
    imgIdentityCardBack: string;
    verifyDate: Date;
}
type CredentialsType = "password" | "facebook" | "google";

export interface ICustomer {
    id?: string;
    Name?: string;
    Email?: string;
    Password: string;
    re_password?: string;
    Phone: string;
    Province?: string;
    District?: string;
    Hamlet?: string;
    Ward?: string;
    Street?: string;
    address_detail?: string;
    Verify: boolean;
    OTP?: string;
    role?: string;
}
