export interface IOrder {
  id?: string;
  idShipper?: number;
  idCustomer: number;
  SenderName: string;
  SenderPhone: string;
  SenderAddress: string;
  SenderDetailsAddress: string;
  SenderCoordinates?: string;
  ReceiverName: string;
  ReceiverPhone: string;
  ReceiverAddress: string;
  ReceiverDetailsAddress: string;
  ReceiverCoordinates?: string;
  idTransport: number;
  isCOD: boolean;
  COD: number;
  isTakeShippingFee?: boolean;
  Note: string;
  ShippingFee: number;
  Created?: Date;
  DistanceToSender?: number;
  Charge?: number;
  CurrentStatus:
    | 'pending'
    | 'pending_pickup'
    | 'picked_up'
    | 'delivery'
    | 'release'
    | 'cancel'
    | 'success';
  TimeCurrentStatus?: string;
  TransportName?: string;
  Distance: number;
}
