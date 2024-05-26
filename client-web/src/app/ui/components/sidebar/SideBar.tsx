"use client";
import React from "react";
import Image from "next/image";
import style from "./styles.module.css";
import { RiEBike2Line } from "react-icons/ri";
import Link from "next/link";
import { NavLink } from "@/app/lib/constant/navLink";

export const SideBar = (): JSX.Element => {
    return (
        <div
            className={`w-full h-full flex flex-col justify-start  px-6 py-4 `}
        >
            <div className="w-full flex flex-row justify-center items-center mb-16">
                <div className="rounded-full p-2 border-2 border-white shadow-lg shadow-black/15 bg-white">
                    <Image
                        src="/images/logo-2.png"
                        alt="logo"
                        width={80}
                        height={80}
                        objectFit="contain"
                    />
                </div>
            </div>
            <nav className="w-full flex-col justify-start items-center">
                {NavLink.map((item, index) => (
                    <Link
                        key={index}
                        href={item.url}
                        className="w-full py-2 flex flex-row justify-center items-center mb-4"
                    >
                        <item.icon size={30} className="w-1/4 text-gray-200" />
                        <div className="w-3/4 text-md text-gray-800 font-medium">
                            <p>{item.name}</p>
                        </div>
                    </Link>
                ))}
            </nav>
        </div>
    );
};
