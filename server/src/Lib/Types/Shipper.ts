export interface IShipperIdentity {
    idShipper: number;
    IdentityCard?: string;
    LicensePlates?: string;
    DriverLicenseNumber?: string;
    ImgDriveLicenseBefore: string;
    ImgDriveLicenseAfter: string;
    ImgIdentityCardAfter: string;
    ImgIdentityCardBefore: string;
    ImgVehicleRegistrationCertBefore: string;
    ImgVehicleRegistrationCertAfter: string;
    Status?: "pending" | "verified" | "cancel";
    CreatedVerify?: Date;
}

export interface IShipper {
    id?: number;
    Name: string;
    Password?: string;
    Re_password?: string;
    Province: string;
    District: string;
    Ward: string;
    Hamlet: string;
    DetailsAddress: string;
    idTransport: number;
    OnlineStatus: 1 | 0;
    Status: "Free" | "Delivering";
    idOrder?: string;
    Phone: string;
    Email: string;
    Verify?: boolean;
    Created?: Date;
    lat?: number;
    lng?: number;
}
