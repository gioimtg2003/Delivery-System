import Link from "next/link";

export default function NavSetting(): JSX.Element {
    return (
        <nav className="w-1/4 p-4  overflow-auto md:h-nav-setting max-md:w-full">
            <ul className="w-full h-full flex flex-col justify-start border-r border-primary-2-color/80 items-start max-md:hidden">
                <Link href="/settings" className="w-full">
                    <li className="hover:cursor-pointer w-full pl-4 text-xl transition-border duration-150 ease-linear hover:border-b hover:border-blue-300 border-b border-b-blue-100 py-4 mt-3">
                        Thông tin cá nhân
                    </li>
                </Link>
                <Link href="/settings/identity" className="w-full">
                    <li className="hover:cursor-pointer w-full pl-4 text-xl transition-border duration-150 ease-linear hover:border-b hover:border-blue-300 border-b border-b-blue-100 py-4 mt-3">
                        Định danh tài khoản
                    </li>
                </Link>
            </ul>
        </nav>
    );
}
