"use client";
import { Link as ILink, NavLink } from "@/app/lib/constant/navLink";
import { useAuth } from "@/app/lib/context/auth/authContext";
import Image from "next/image";
import Link from "next/link";
import { FaStore } from "react-icons/fa6";
import { ProfileDrop } from "../ProfileDropdown/ProfileDrop";

export function HeaderWeb() {
    const { user } = useAuth();
    return (
        <header className="max-sm:hidden fixed z-50 top-0 left-0 bg-white w-full h-20 p-0 m-0 border-b-2 border-gray-100  px-4">
            <div className="flex flex-row  justify-start items-center h-full ">
                <div
                    className="w-
                1/12 flex justify-center items-center"
                >
                    <Link href="/create-order">
                        <Image
                            src="/images/LogoIntro.png"
                            alt="logo"
                            width={80}
                            height={80}
                            className="hover:cursor-pointer hover:opacity-90 hover:-translate-y-1 hover:scale-105 hover:duration-300"
                        />
                    </Link>
                </div>
                <nav className="w-7/12 flex flex-row justify-start items-center h-full pl-4">
                    {NavLink.map((link: ILink, key) => {
                        let isBorderBottom: string = link.selected
                            ? " border-b-2 border-primary-1-color"
                            : "";
                        return (
                            <Link
                                href={link.url}
                                key={key}
                                className={
                                    isBorderBottom +
                                    " transition-border duration-150 ease-linear relative z-10 w-1/5  max-[1124px]:w-2/6 h-full hover:cursor-pointer hover:text-primary-1-color hover:border-b-2 hover:border-primary-2-color"
                                }
                            >
                                <div className="w-full h-full flex justify-center items-center">
                                    {
                                        <link.icon
                                            className={`${link.selected ? "text-primary-1-color" : "text-primary-2-color"} size-7`}
                                        />
                                    }
                                    <span
                                        className={`${link.selected ? "text-primary-1-color" : "text-gray-600"} ml-2 text-xl text-wrap font-normal  max-[1124px]:text-lg`}
                                    >
                                        {link.name}
                                    </span>
                                </div>
                            </Link>
                        );
                    })}
                </nav>
                <div className="w-4/12 flex flex-row justify-end items-center">
                    <div className="w-2/5 flex flex-row justify-center items-center">
                        <FaStore className="size-5 text-primary-1-color/60" />
                        <div className="text-lg ml-2">
                            <ProfileDrop>
                                <p className="hover:cursor-pointer">{`${user?.name}`}</p>
                            </ProfileDrop>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
