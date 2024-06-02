import { CloseCircleOutlined } from "@ant-design/icons";
import style from "./styles.module.css";
export function ModalPopUp({
    open,
    children,
    onHidden,
    className,
    close = true,
}: Readonly<{
    open: boolean;
    children: React.ReactNode;
    onHidden: () => void;
    className?: string;
    close?: boolean;
}>): JSX.Element {
    return (
        <>
            {close && (
                <div
                    className={`transition-opacity fixed flex flex-row inset-0 justify-center items-center ${!open && "hidden"} bg-black/15 z-50 `}
                    onClick={onHidden}
                >
                    <div
                        className={`bg-white rounded-md shadow-xl ${style.AnimationPopUpOpen} ${className}`}
                        onClick={(e) => {
                            e.stopPropagation();
                        }}
                    >
                        <div
                            className="flex flex-row justify-end items-center hover:cursor-pointer"
                            onClick={onHidden}
                        >
                            <CloseCircleOutlined />
                        </div>

                        {children}
                    </div>
                </div>
            )}
        </>
    );
}
