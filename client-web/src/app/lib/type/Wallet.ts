export interface IWallet {
    id?: string;
    key?: React.Key;
    idEmployee?: number;
    idShipper?: number;
    NameShipper?: string;
    NameEmployee?: string;
    Status: "pending" | "reject" | "accept";
    Action: "deposit" | "withdraw";
    TimeSubmit: Date;
    TimeUpdate?: Date;
    Amount: number;
    ImgUrl: string;
    Created: Date;
}
