import { FaRegUser } from "react-icons/fa6";
interface Props {
    Name: string;
    Phone: string;
    Address: string;
}
const AddressOrder: React.FC<Props> = ({
    Name,
    Phone,
    Address,
}): React.ReactNode => {
    return (
        <div className="w-2/5 flex flex-col items-start px-4 border-r border-blue-300 h-full">
            <p className="text-2xl font-semibold  text-[#0E1E30]">
                Thông Tin Khách Hàng
            </p>
            <p className="text-xl font-medium mt-4 text-[#4a4a4a]">{Name}</p>
            <p className="text-md font-normal mt-2 text-[#6e6e6e]">{Phone}</p>
            <p className="text-md font-normal mt-2 text-[#6e6e6e] w-4/5">
                {Address}
            </p>
        </div>
    );
};
export default AddressOrder;
