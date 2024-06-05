import { CloseCircleOutlined } from "@ant-design/icons";
import style from "./styles.module.css";
export function ModalPopUp({
    close,
    children,
    onClose,
    className,
}: Readonly<{
    close: boolean;
    children: React.ReactNode;
    onClose: () => void;
    className?: string;
}>): JSX.Element {
    return (
        <>
            {!close && (
                <div
                    className={`transition-opacity fixed flex flex-row inset-0 justify-center items-center bg-black/15 z-50 `}
                >
                    <div
                        className={`bg-white rounded-md shadow-xl ${style.AnimationPopUpOpen} ${className}`}
                        onClick={(e) => {
                            e.stopPropagation();
                        }}
                    >
                        <div className="flex flex-row justify-end items-center">
                            <CloseCircleOutlined onClick={onClose} />
                        </div>

                        {children}
                    </div>
                </div>
            )}
        </>
    );
}
