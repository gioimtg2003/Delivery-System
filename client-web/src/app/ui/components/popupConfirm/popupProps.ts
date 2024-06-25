export type props = {
    title: string;
    message: string;
    children: React.ReactNode;
    data?: string;
    cancelText?: string;
    confirmText?: string;
    height?: string;
    onConfirm?: () => void;
    onClose?: () => void;
};
