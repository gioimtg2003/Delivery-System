export interface IOrder {
  id: string;
  SenderAddress: string;
  SenderCoordinates: string;
  ReceiverAddress: string;
  ReceiverCoordinates: string;
  isCOD: boolean;
  COD: number;
  Note: string;
  ShippingFee: number;
  Distance: number;
  DistanceToSender?: string;
  Charge?: number;
  CurrentStatus:
    | 'pending'
    | 'pending_pickup'
    | 'picked_up'
    | 'delivery'
    | 'release'
    | 'cancel'
    | 'success';
  SenderName: string;
  SenderPhone: string;
  ReceiverName: string;
  ReceiverPhone: string;
  isTakeShippingFee: number;
}
