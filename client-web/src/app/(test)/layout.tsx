"use client";
import React from "react";

export default function TestLayout({
    children,
}: {
    readonly children: React.ReactNode;
}): React.ReactNode {
    return <>{children}</>;
}
