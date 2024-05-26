import { NotificationProvider } from "../lib/context/NotificationContext";

export default function LayoutAdmin({
    children,
}: {
    readonly children: React.ReactNode;
}): React.ReactElement {
    return <NotificationProvider>{children}</NotificationProvider>;
}
