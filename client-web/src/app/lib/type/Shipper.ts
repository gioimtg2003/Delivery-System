export interface IShipperIdentity {
    idShipper?: number;
    IdentityCard: string;
    LicensePlates: string;
    DriverLicenseNumber: string;
    ImgDriveLicenseBefore: string;
    ImgDriveLicenseAfter: string;
    ImgIdentityCardAfter: string;
    ImgIdentityCardBefore: string;
    ImgVehicleRegistrationCertBefore: string;
    ImgVehicleRegistrationCertAfter: string;
    Created?: Date;
}

export interface IShipper {
    id?: number;
    Name: string;
    Password?: string;
    Re_password?: string;
    Province: string;
    District: string;
    Ward: string;
    Hamlet?: string;
    DetailsAddress?: string;
    Phone: string;
    Email: string;
    Verify: boolean;
    Created?: Date;
    Province_id?: number;
    District_id?: number;
    Ward_id?: number;
    Hamlet_id?: number;
}

export interface ShipperDataType {
    id?: number;
    key?: React.Key;
    Name?: string;
    Contact?: {
        Phone: string;
        Email: string;
    };
    Address?: string;
    Active?: boolean;
    CreatedAt?: string;
}
