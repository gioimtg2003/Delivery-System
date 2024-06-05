import { NotificationProvider } from "../../lib/context/NotificationContext";
import { SideBar } from "../../ui/components/sidebar/SideBar";

export default function LayoutAdmin({
    children,
}: {
    readonly children: React.ReactNode;
}): React.ReactElement {
    return (
        <NotificationProvider>
            <div className="w-full h-screen min-h-[650px]  flex flex-row max-lg:flex-col justify-center">
                <div className="w-2/12 max-lg:w-full  bg-blue-400 rounded-tr-lg rounded-br-lg">
                    <SideBar />
                </div>
                <div className="w-10/12 max-lg:w-full bg-blue-50 overflow-y-auto">
                    {children}
                </div>
            </div>
        </NotificationProvider>
    );
}
