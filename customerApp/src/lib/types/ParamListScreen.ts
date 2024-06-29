import {IInfo} from './info';

export type IPramListScreen = {
  test: undefined;
  intro: undefined;
  intro_1: undefined;
  'sign-in': undefined;
  'sign-up': undefined;
  'otp-screen': {idCustomer: string; phone: string};
  home: undefined;
  transport: {
    senderAddress: string;
    receiverAddress: string;
  };
  'order-info': {
    idTransport: number;
    shippingFee: number;
    senderAddress?: string;
    receiverAddress?: string;
  };
  orderTracking: {
    idOrder: string;
  };
};

export type IListParamTabHome = {
  order: {
    receiver?: IInfo;
    sender?: IInfo;
  };
};
