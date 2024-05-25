"use client";
import Image from "next/image";
import React from "react";
import { Variants, motion } from "framer-motion";
import Link from "next/link";
import Button from "./Button";
import { useRouter } from "next/navigation";

const listContent = [
    {
        title: "Giới thiệu",
        link: "./#home",
    },
    {
        title: "Về chúng tôi",
        link: "./#about",
    },
    {
        title: "Liên hệ",
        link: "./#contact",
    },
];
const itemVariants: Variants = {
    open: {
        opacity: 1,
        y: 0,
        transition: { type: "spring", bounce: 0.5, damping: 10, duration: 2 },
    },
    hidden: {
        opacity: 0,
        y: -50,
    },
};
const Header = (): JSX.Element => {
    const router = useRouter();
    return (
        <header className="mt-10 pb-8">
            <div className="w-full flex flex-row justify-between items-center px-16">
                <div>
                    <motion.div
                        initial={{ opacity: 0, transform: "translateY(-50%)" }}
                        animate={{
                            opacity: 1,
                            transform: "translateY(0%)",
                        }}
                        transition={{
                            duration: 0.5,
                        }}
                    >
                        <Image
                            src="/images/LogoIntro.png"
                            alt="Logo"
                            width={100}
                            height={65}
                            className="object-cover hover:cursor-pointer"
                        />
                    </motion.div>
                </div>
                <div>
                    <motion.ul
                        className="flex items-center flex-row"
                        initial="hidden"
                        variants={{
                            open: {
                                transition: { staggerChildren: 0.1 },
                            },
                        }}
                        transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 24,
                        }}
                        animate="open"
                    >
                        {listContent.map((item, index) => (
                            <motion.li
                                variants={itemVariants}
                                key={index}
                                className="px-12 font-semibold text-lg text-primary-1-color"
                            >
                                <Link
                                    href={`${item.link}`}
                                    className="drop-shadow-2xl hover:text-[#4292F3] transition duration-300 ease-in-out"
                                >
                                    {item.title}
                                </Link>
                            </motion.li>
                        ))}
                    </motion.ul>
                </div>
                <div>
                    <Button
                        text="Đăng nhập"
                        onClick={() => {
                            router.push("/login");
                        }}
                    />
                </div>
            </div>
        </header>
    );
};

export default Header;
