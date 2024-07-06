export type IdentityScreenParamList = {
  identity: {
    idShipper: number;
  };
  imgDriveLicense: {
    identityAfter: string;
    identityBefore: string;
  };
  imgVehicleRegistrationCert: {
    imgDriveLicenseBefore: string;
    imgDriverLicenseAfter: string;
  };
};

export type AppScreenParamList = {
  intro: undefined;
  login: undefined;
  signup: undefined;
  home: undefined;
  orderDetails: {
    id: string;
  };
  orderDelivery: {
    id: string;
  };
  pickupScreen: undefined;
  deliveryScreen: undefined;
  mapScreen: {
    origin?: number[];
    destination: number[];
    type: 'pickup' | 'delivery';
  };
  Wallet: undefined;
  AddWalletScreen: undefined;
  identity: {
    idShipper: number;
  };
  imgDriveLicense: {
    identityAfter: string;
    identityBefore: string;
  };
  imgVehicleRegistrationCert: {
    imgDriveLicenseBefore: string;
    imgDriverLicenseAfter: string;
  };
};
