"use client";
import React from "react";
import { ShipperProvider } from "@/app/lib/context/Shipper/Context";
import TableShipperVerify from "@/app/ui/components/TableShipperVerify";

export default function ShipperVerifyPage(): React.ReactElement {
    return (
        <ShipperProvider>
            <div className="w-full min-w-[850px] h-full px-6 py-12 flex flex-row justify-center items-start">
                <div className="rounded-sm w-full bg-white p-4 shadow-lg shadow-gray-200">
                    <TableShipperVerify />
                </div>
            </div>
        </ShipperProvider>
    );
}
