import { MySQLService } from "../../Database/connect";
import { ICallback } from "../../Lib/Types/Callback";
import { IShipper, IShipperIdentity } from "../../Lib/Types/Shipper";
import { Log } from "../../Lib/Utils/Log";
import { HashPassword } from "../Hash";

export class CURDShipper extends MySQLService {
    private _hashPassword: HashPassword;
    constructor() {
        super();
        this._hashPassword = new HashPassword();
    }

    public async createShipper(
        shipper: IShipper & IShipperIdentity,
        callback: ICallback<boolean>
    ): Promise<void> {
        this.conn.query(
            "INSERT INTO Shipper (Name, Province, District, Ward, DetailsAddress, Phone, Email, Password, Verify) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?) ",
            [
                shipper.Name,
                shipper.Province,
                shipper.District,
                shipper.Ward,
                shipper.DetailsAddress,
                shipper.Phone,
                shipper.Email,
                await this._hashPassword.hashPassword(shipper.Password),
                true,
            ],
            (err, result) => {
                if (err) {
                    Log.Error(
                        new Date(),
                        err.message,
                        "Create Shipper Service"
                    );
                    console.error(err);
                    return callback(err, null);
                }
                let idShipper = result.insertId;
                this.conn.query(
                    "INSERT INTO ShipperIdentity (idShipper, idTransportType, IdentityCard, LicensePlates, DriverLicenseNumber, ImgDriveLicenseBefore, ImgDriveLicenseAfter, ImgIdentityCardAfter, ImgIdentityCardBefore, ImgVehicleRegistrationCertBefore, ImgVehicleRegistrationCertAfter, Created) VALUES (?,? ,?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
                    [
                        idShipper,
                        shipper.idTransportType,
                        shipper.IdentityCard,
                        shipper.LicensePlates,
                        shipper.DriverLicenseNumber,
                        shipper.ImgDriveLicenseBefore,
                        shipper.ImgDriveLicenseAfter,
                        shipper.ImgIdentityCardAfter,
                        shipper.ImgIdentityCardBefore,
                        shipper.ImgVehicleRegistrationCertBefore,
                        shipper.ImgVehicleRegistrationCertAfter,
                        new Date(),
                    ],
                    (err, result) => {
                        if (err) {
                            console.error(err);
                            callback(err, null);
                            return;
                        }
                        return callback(null, true);
                    }
                );
            }
        );

        throw new Error("Method not implemented.");
    }
}
