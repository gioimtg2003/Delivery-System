"use client";
import React, { useCallback, useState } from "react";
import { Steps } from "antd";
import { FormInfo } from "./FormInfo";
import FormIdentity from "./FormIdentity";

const steps = [
    {
        title: "Thông tin cá nhân",
        content: "First-content",
    },
    {
        title: "Giấy tờ tùy thân",
        content: "Second-content",
    },
];
export default function StepShipper({
    closeModal,
}: {
    readonly closeModal: (close: boolean) => void;
}): React.ReactElement {
    const [current, setCurrent] = useState(0);
    const [idUser, setIdUser] = useState<string | undefined>(undefined);
    const next = () => {
        setCurrent(current + 1);
    };
    const onCloseModal = useCallback(() => {
        closeModal(true);
    }, [closeModal]);
    const items = steps.map((item) => ({ key: item.title, title: item.title }));

    return (
        <>
            <Steps current={current} items={items} className="min-w-[600px]" />

            {current === 0 && <FormInfo next={next} setIdUser={setIdUser} />}
            {current === 1 && (
                <FormIdentity id={idUser} onClose={onCloseModal} />
            )}
        </>
    );
}
