export interface IWallet {
    id?: string;
    idEmployee?: number;
    idShipper?: number;
    Status: "pending" | "reject" | "accept";
    Action: "deposit" | "withdraw";
    TimeSubmit: string | Date;
    TimeUpdate?: string | Date;
    ImgUrl?: string;
    Amount: number;
    Created: Date;
}
