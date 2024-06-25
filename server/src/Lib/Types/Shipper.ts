export interface IShipperIdentity {
    idShipper: number;
    idTransportType: number;
    IdentityCard?: string;
    LicensePlates?: string;
    DriverLicenseNumber?: string;
    ImgDriveLicenseBefore: string;
    ImgDriveLicenseAfter: string;
    ImgIdentityCardAfter: string;
    ImgIdentityCardBefore: string;
    ImgVehicleRegistrationCertBefore: string;
    ImgVehicleRegistrationCertAfter: string;
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
    Phone: string;
    Email: string;
    Verify?: boolean;
    Created?: Date;
    lat?: number;
    lng?: number;
}
