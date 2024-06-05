import { IShipper } from "../../type/Shipper";
import { axiosInstance } from "../../util/axios";

function ListShipperService(): Promise<IShipper[]> {
    return new Promise((resolve, reject) => {
        axiosInstance()
            .get("/admin/shipper")
            .then((res) => {
                if (res.data.status === "success") resolve(res.data.data);
            })
            .catch((err) => {
                console.error(err);
                reject(err);
            });
    });
}
export default ListShipperService;
