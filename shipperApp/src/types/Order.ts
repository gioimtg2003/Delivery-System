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
}
