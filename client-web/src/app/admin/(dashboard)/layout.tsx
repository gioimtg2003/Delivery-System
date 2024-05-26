import { NotificationProvider } from "../../lib/context/NotificationContext";
import { SideBar } from "../../ui/components/sidebar/SideBar";

export default function LayoutAdmin({
    children,
}: {
    readonly children: React.ReactNode;
}): React.ReactElement {
    return (
        <NotificationProvider>
            <div className="w-full flex flex-row max-md:flex-col justify-center">
                <div className="w-2/12 max-md:w-full h-screen bg-blue-400 rounded-tr-lg rounded-br-lg">
                    <SideBar />
                </div>
                <div className="w-10/12 max-md:w-full">{children}</div>
            </div>
        </NotificationProvider>
    );
}
