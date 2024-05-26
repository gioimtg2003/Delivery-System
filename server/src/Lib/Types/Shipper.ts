export interface IShipperIdentity {
    idShipper: number;
    idTransportType: number;
    IdentityCard: string;
    LicensePlates: string;
    DriverLicenseNumber: string;
    ImgDriveLicenseBefore: string;
    ImgDriveLicenseAfter: string;
    ImgIdentityCardAfter: string;
    ImgIdentityCardBefore: string;
    ImgVehicleRegistrationCertBefore: string;
    ImgVehicleRegistrationCertAfter: string;
    Created: Date;
}

export interface IShipper {
    id: number;
    Name: string;
    Password: string;
    Re_password?: string;
    Province: string;
    District: string;
    Ward: string;
    DetailsAddress: string;
    Phone: string;
    Email: string;
    Verify: boolean;
    Created?: Date;
}
