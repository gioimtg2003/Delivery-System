"use client";

import React, { useEffect } from "react";
import Header from "./ui/components/home/Header";
import ContentHome from "./ui/components/home/ContentHome";
import ContentAbout from "./ui/components/home/ContentAbout";
import ContentContact from "./ui/components/home/ContentContact";

export default function Page(): JSX.Element {
    useEffect(() => {
        document.title = "Trang chủ";
        console.log("Xem cái gì ở đây dị 3333");
    }, []);
    return (
        <>
            <Header />
            <main className="">
                <ContentHome />
                <ContentAbout />
                <ContentContact />
            </main>
        </>
    );
}
