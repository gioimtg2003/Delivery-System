export interface IWallet {
  id?: string;
  idEmployee?: number;
  idShipper?: number;
  Status: 'pending' | 'reject' | 'accept';
  Action: 'deposit' | 'withdraw';
  Amount: number;
  TimeSubmit: string;
  TimeUpdate?: string;
}
