import { AuthProvider } from "../lib/context/auth/authContext";
import { NotificationIdentity } from "../lib/context/NotificationIdentity/NotificationIdentity";
import { Header } from "../ui/components/Header/Header";

export default function Layout({
    children,
}: {
    readonly children: React.ReactNode;
}) {
    return (
        <AuthProvider>
            <NotificationIdentity>
                <Header />
                <main className="mt-20 w-full">{children}</main>
            </NotificationIdentity>
        </AuthProvider>
    );
}
