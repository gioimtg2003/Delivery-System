export type props = {
  title: string;
  message: string;
  children: React.ReactNode;
  data?: string;
  onConfirm?: (e: any) => void;
  onClose?: () => void;
};
