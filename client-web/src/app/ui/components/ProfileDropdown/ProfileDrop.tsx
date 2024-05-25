"use client";
import { cloneElement, useCallback, useEffect, useRef, useState } from "react";
import { motion, Variants } from "framer-motion";
import { FaRegUser } from "react-icons/fa6";
import { IoLogOutOutline, IoPricetagsOutline } from "react-icons/io5";
import { useAuth } from "@/app/lib/context/auth/authContext";
import { AuthActionType } from "@/app/lib/context/auth/type";

const itemVariants: Variants = {
    open: {
        opacity: 1,
        x: 0,
        transition: { type: "spring", bounce: 0.5, damping: 10, duration: 2 },
    },
    hidden: {
        opacity: 0,
        x: -50,
    },
};
export function ProfileDrop({
    children,
}: {
    readonly children: React.ReactNode;
}): JSX.Element {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const dropRef = useRef<HTMLDivElement>(null);
    const { dispatch } = useAuth();
    const handleClickOutside = useCallback(
        (e: MouseEvent) => {
            if (
                dropRef.current &&
                !dropRef.current.contains(e.target as Node)
            ) {
                setIsOpen(false);
            }
        },
        [setIsOpen]
    );

    useEffect(() => {
        if (isOpen) {
            document.addEventListener("click", handleClickOutside);
        }

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [isOpen, handleClickOutside]);

    return (
        <div className={`relative`}>
            {cloneElement(children as React.ReactElement, {
                onClick: () => setIsOpen(!isOpen),
            })}
            <motion.div
                ref={dropRef}
                className={` ${isOpen ? "absolute" : "hidden"} w-52 lg:w-48  bg-white rounded-lg shadow-lg shadow-primary-2-color/35 z-[51] top-10 -right-10 lg:-right-8 md:-right-4 border border-gray-300 py-4 `}
                initial={"hidden"}
                animate={isOpen ? "open" : "hidden"}
                variants={{
                    open: {
                        opacity: 1,
                        transition: {
                            type: "spring",
                            stiffness: 20,
                            restDelta: 2,
                            duration: 1,
                            staggerChildren: 0.1,
                        },
                    },
                    hidden: {
                        opacity: 0,
                        transition: {
                            delay: 0.5,
                            type: "spring",
                            stiffness: 400,
                            damping: 40,
                        },
                    },
                }}
            >
                <motion.div
                    className="w-full flex flex-row justify-between items-center border-b border-b-primary-1-color px-4 hover:cursor-pointer"
                    variants={itemVariants}
                    onClick={() => {
                        window.location.href = "/settings";
                    }}
                >
                    <FaRegUser size={20} className="text-gray-600" />
                    <p className="text-gray-700 font-normal text-lg pl-2 lg:text-[16px]">
                        Quản lý tài khoản
                    </p>
                </motion.div>
                <motion.div
                    className="w-full flex flex-row justify-between items-center border-b border-b-primary-1-color px-4 mt-4 hover:cursor-pointer"
                    variants={itemVariants}
                >
                    <IoPricetagsOutline size={20} className="text-gray-600" />
                    <p className="text-gray-700 font-normal text-lg pl-2 lg:text-[16px]">
                        Giá dịch vụ
                    </p>
                </motion.div>
                <motion.div
                    className="w-full flex flex-row justify-between items-center  px-4 mt-4 hover:cursor-pointer"
                    variants={itemVariants}
                    onClick={() => {
                        dispatch({ type: AuthActionType.LOGOUT });
                    }}
                >
                    <IoLogOutOutline size={22} className="text-gray-600" />
                    <p className="text-gray-700 font-normal text-lg pl-2 lg:text-[16px]">
                        Đăng xuất
                    </p>
                </motion.div>
            </motion.div>
        </div>
    );
}
