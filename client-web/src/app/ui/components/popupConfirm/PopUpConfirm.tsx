import { props } from "./popupProps";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { BiSolidMessageRoundedError } from "react-icons/bi";
import style from "./styles.module.css";

const PopUpConfirm: React.FC<props> = ({
    title,
    children,
    message,
    data,
    cancelText = "No",
    confirmText = "Yes",
    height = "100px",
    onConfirm,
    onClose,
}) => {
    const [open, setOpen] = useState<boolean>(false);
    const popupRef = useRef<HTMLDivElement>(null);
    const [initialLoad, setInitialLoad] = useState<boolean>(true);

    /**
     * hàm này để Open popup
     */
    const onOpen = useCallback(() => {
        setInitialLoad(false);
        setOpen(true);
    }, []);

    const onConfirmAndClose = useCallback(() => {
        if (onConfirm) {
            onConfirm();
        }
        setOpen(!open);
    }, [onConfirm, open]);

    const onCloseAndClose = useCallback(() => {
        if (onClose) {
            onClose();
        }
        setOpen(!open);
    }, [onClose, open]);

    const handleClickOutside = useCallback(
        (e: MouseEvent) => {
            if (
                popupRef.current &&
                !popupRef.current.contains(e.target as Node)
            ) {
                setOpen(!open);
            }
        },
        [open]
    );

    useEffect(() => {
        // nếu popup mở thì lắng nghe sự kiện click ra ngoài
        if (open) {
            document.addEventListener("click", handleClickOutside);
        }
    }, [open, handleClickOutside]);

    return (
        <div className="">
            <div
                className={`relative w-full flex flex-col justify-center items-center `}
                ref={popupRef}
            >
                <div
                    className={` rounded-md shadow-lg border-2 border-gray-100 bg-white w-64 absolute h-[130px] -top-[130px] p-2 ${open ? style.show : initialLoad ? "hidden" : style.hide} z-40`}
                >
                    <div className="inner bg-white w-full h-full flex flex-col justify-center items-center">
                        <div className="mess w-full h-3/5 flex flex-col justify-between items-start">
                            <div className=" flex w-full items-center">
                                <BiSolidMessageRoundedError className="size-5 text-orange-300" />
                                <div className="font-semibold ml-1 text-sm">
                                    <p>{title}</p>
                                </div>
                            </div>
                            <div className="text-sm pl-4 font-light text-start">
                                <p>{message}</p>
                            </div>
                        </div>
                        <div className="btn w-full h-2/5 flex justify-end items-center mt-2">
                            <div className="pr-2 font-light text-center text-base">
                                <button
                                    className="px-2 mr-2 rounded-md border-2 bg-white border-red-400 shadow-lg text-red-500 "
                                    onClick={onCloseAndClose}
                                >
                                    <span>{cancelText}</span>
                                </button>
                                <button
                                    className="px-2 rounded-md bg-white shadow-lg text-blue-400 border-2 border-blue-400"
                                    onClick={onConfirmAndClose}
                                >
                                    <span>{confirmText}</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {React.cloneElement(children as React.ReactElement, {
                    onClick: onOpen,
                })}
            </div>
        </div>
    );
};

export default PopUpConfirm;
